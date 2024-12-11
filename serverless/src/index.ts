import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  yaminogemuKVM: KVNamespace
  yaminogemuDB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

app.options('*', async (c) => {
  return c.text('', 204)
})

app.get('/', async (c) => {
  const res0 = await c.env.yaminogemuDB
  .prepare("SELECT * FROM user")
  .all()

  return c.json({"result": res0})
})

app.post('/import_quiz', async (c) => {
  const reqData = await c.req.json()
  const quizs: { "Question": string, "C1": string, "C2": string, "C3": string, "C4": string, "Answer": string }[] = reqData['quizs']

  const prepares = quizs.map((q) => {
    const answer: number = q["Answer"] == q["C1"] ? 0 : q["Answer"] == q["C2"] ? 1 : q["Answer"] == q["C3"] ? 2 : 3
    return c.env.yaminogemuDB.prepare("INSERT INTO problem (q0, q1, q2, q3, q4, answer) VALUES (?, ?, ?, ?, ?, ?)").bind(q["C1"], q["C2"], q["C3"], q["C4"], q["Question"], answer)
  })

  const res0 = await c.env.yaminogemuDB.batch(prepares)

  return c.json({ "result": res0[0].success, "error": res0[0].error })
})

app.get('/quizs', async (c) => {
  const res0 = await c.env.yaminogemuDB.prepare("SELECT * FROM problem").all()

  return c.json({ "result": res0.success, "error": res0.error, "quizs": res0.results })
})

app.post('/user', async (c) => {
  const reqData = await c.req.json()
  const userAddr = reqData['address']

  const res0 = await c.env.yaminogemuDB
  .prepare("SELECT * FROM user WHERE address = ?1")
  .bind(userAddr)
  .all()

  if(res0.results.length == 0) {
    const res1 = await c.env.yaminogemuDB
    .prepare("INSERT INTO user (address, match_id) VALUES (?, NULL)")
    .bind(userAddr)
    .run()
  }

  return c.json({"result": "good good"})
})

app.post('/match', async (c) => {
  const reqData = await c.req.json()
  const userAddr = reqData['address']
  const token = reqData['token']

  const waitingList = await c.env.yaminogemuDB.batch([
    c.env.yaminogemuDB.prepare('SELECT * FROM match WHERE game_id IS NULL'),
  ])

  if(waitingList[0].results.length == 0) {
    const res0 = await c.env.yaminogemuDB
    .prepare('INSERT INTO match (user1_addr, user1_token) VALUES (?, ?)')
    .bind(userAddr, token)
    .run()
    return c.json({ "result": res0.success, "error": res0.error, "match_id": res0.meta.last_row_id })
  } else {
    const match = waitingList[0].results[0] as any

    const new_game = await c.env.yaminogemuDB
    .prepare('INSERT INTO game (problem0_id, problem1_id, problem2_id, start_time, round, user1_score, user2_score) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .bind(1, 2, 3, new Date().toISOString(), -1, 0, 0)
    .run()
    const game_id = new_game.meta.last_row_id

    const update_match = await c.env.yaminogemuDB
    .prepare('UPDATE match SET user2_addr = ?, user2_token = ?, game_id = ? WHERE match_id = ?')
    .bind(userAddr, token, game_id, match['match_id'])
    .run()

    return c.json({ "result": update_match.success, "error": update_match.error, "match_id": match['match_id'] })
  }
})

app.post('/match/queue', async (c) => {
  const reqData = await c.req.json()
  const match_id = reqData['match_id']

  const res0 = await c.env.yaminogemuDB
  .prepare('SELECT * FROM match WHERE match_id = ?1')
  .bind(match_id)
  .all()

  const match = res0.results[0] as any
  if(match['game_id'] == null) {
    return c.json({ "result": res0.success, "error": res0.error, "game_id": -1 })
  } else {
    return c.json({ "result": res0.success, "error": res0.error, "game_id": match['game_id']})
  }
})

app.post('/game/prepare', async (c) => {
  const reqData = await c.req.json()
  const game_id = reqData['game_id']
  const user_addr = reqData['address']

  const waitingList = await c.env.yaminogemuDB.batch([
    c.env.yaminogemuDB.prepare('SELECT * FROM game WHERE game_id = ?').bind(game_id),
  ])

  const game = (waitingList[0].results[0] as any)

  if(game['user1_state'] == null) {
    const update_match = await c.env.yaminogemuDB
    .prepare('UPDATE game SET user1_state = ?, user1_addr = ? WHERE game_id = ?')
    .bind(0, user_addr, game_id)
    .run()
    return c.json({ "result": update_match.success, "error": update_match.error, "game_id": game_id, "user": 0 })
  }else {
    const update_match = await c.env.yaminogemuDB
    .prepare('UPDATE game SET user2_state = ?, user2_addr = ?, round = ?, start_time = ? WHERE game_id = ?')
    .bind(0, user_addr, 0, new Date().toISOString(), game_id)
    .run()
    return c.json({ "result": update_match.success, "error": update_match.error, "game_id": game_id, "user": 1 })
  }
})

//return next quiz and result
app.post('/game/quiz', async (c) => {
  const reqData = await c.req.json()
  const game_id = reqData['game_id']

  const rounds = ['problem0_id', 'problem1_id', 'problem2_id']

  const res0 = await c.env.yaminogemuDB.prepare('SELECT * FROM game WHERE game_id = ?').bind(game_id).all()
  const game = res0.results[0] as any

  const round = game['round']
  if(round >= 0 && round < 3) {
    const quiz = await c.env.yaminogemuDB.prepare('SELECT * FROM problem WHERE problems_id = ?').bind(game[rounds[round]]).all()
    return c.json({ "result": quiz.success, "error": quiz.error, "game_id": game_id, "quiz": quiz.results[0], "round": round })
  } else if(round == 3) {
    return c.json({ "result": res0.success, "error": res0.error, "game_id": game_id, "quiz": null, "round": -2 })
  } else {
    return c.json({ "result": res0.success, "error": res0.error, "game_id": game_id, "quiz": null, "round": -1 })
  } 
})

//return next quiz and result
app.post('/game/answer', async (c) => {
  const reqData = await c.req.json()
  const user = reqData['user']
  const game_id = reqData['game_id']
  const problems_id = reqData['problems_id']
  const round = reqData['round']
  const answer = reqData['answer']

  const waitingList = await c.env.yaminogemuDB.batch([
    c.env.yaminogemuDB.prepare('SELECT * FROM problem WHERE problems_id = ?').bind(problems_id),
    c.env.yaminogemuDB.prepare('SELECT * FROM game WHERE game_id = ?').bind(game_id)
  ])

  const game = waitingList[1].results[0] as any
  const problem = waitingList[0].results[0] as any

  console.log(game, problem)

  const isCorrect: boolean = answer == problem['answer']
  if(user == 0) {
    if(round != game['user1_state']) {
      return c.json({ "result": false, "error": "wrong round"})
    }
    const update_game = await c.env.yaminogemuDB
    .prepare('UPDATE game SET user1_state = ?, user1_score = ?, round = ?')
    .bind(round + 1, isCorrect ? game['user1_score'] + 10 : game['user1_score'], game['user2_state'])
    .run()
    return c.json({ "result": update_game.success, "error": update_game.error, "game_id": game_id, "score": isCorrect ? game['user1_state'] + 10 : game['user1_state'], isCorrect: isCorrect })
  } else {
    if(round != game['user2_state']) {
      return c.json({ "result": false, "error": "wrong round"})
    }
    const update_game = await c.env.yaminogemuDB
    .prepare('UPDATE game SET user2_state = ?, user2_score = ?, round = ?')
    .bind(round + 1, isCorrect ? game['user2_score'] + 10 : game['user2_score'], game['user1_state'])
    .run()
    return c.json({ "result": update_game.success, "error": update_game.error, "game_id": game_id, "score": isCorrect ? game['user2_state'] + 10 : game['user2_state'], isCorrect: isCorrect })
  }
})

app.post('/game/result', async (c) => {
  const reqData = await c.req.json()
  const game_id = reqData['game_id']

  const res0 = await c.env.yaminogemuDB.prepare('SELECT * FROM game WHERE game_id = ?').bind(game_id).all()
  const game = res0.results[0] as any

  if(game['user1_state'] == 3 && game['user2_state'] == 3) {
    if(game['user1_score'] > game['user2_score']) {
      const res1 = await c.env.yaminogemuDB.prepare('SELECT * FROM match WHERE game_id = ?').bind(game_id).first()
      return c.json({ "result": { res1, "winner": game['user1_addr']}, "user1_score": game["user1_score"], "user2_score": game["user2_score"] })
    } else {
      const res1 = await c.env.yaminogemuDB.prepare('SELECT * FROM match WHERE game_id = ?').bind(game_id).first()
      return c.json({ "result": { res1, "winner": game['user2_addr']}, "user1_score": game["user1_score"], "user2_score": game["user2_score"] })
    }
  } else {
    return c.json({ "result": null, "user1_score": game["user1_score"], "user2_score": game["user2_score"] })
  }
})

export default app
