import { Quiz } from '@/app/type';
import { serverlessHost } from './config'

export async function gamePrepare(
  game_id: number,
  address: string
): Promise<{ result: boolean; error: unknown; game_id: number; user: number }> {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Ensure the server knows you're sending JSON
    },
    body: JSON.stringify({
      address: address, // Or just `address` (shorthand syntax in ES6)
      game_id: game_id
    })
  }
  try {
    const res = await fetch(serverlessHost + '/game/prepare', requestOptions)
    console.log(res)
    const _res = await res.json()
    return _res
  } catch (e) {
    console.log(e)
    return {
      result: false,
      error: 'Something wrong',
      game_id: game_id,
      user: -1
    }
  }
}

export async function gameQuiz(
  game_id: number
): Promise<{
  result: boolean
  error: unknown
  game_id: number
  round: number
  quiz: Quiz | null
}> {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Ensure the server knows you're sending JSON
    },
    body: JSON.stringify({
      game_id: game_id
    })
  }
  try {
    const res = await fetch(serverlessHost + '/game/quiz', requestOptions)
    console.log(res)
    const _res = await res.json()
    return _res
  } catch (e) {
    console.log(e)
    return {
      result: false,
      error: 'Something wrong',
      game_id: game_id,
      round: -1,
      quiz: null
    }
  }
}

export async function gameAnswer(
  game_id: number,
  user: number,
  problems_id: number,
  round: number,
  answer: number
): Promise<{
  result: boolean
  error: unknown
  game_id: number
  score: number
  isCorrect: boolean
}> {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Ensure the server knows you're sending JSON
    },
    body: JSON.stringify({
      game_id: game_id,
      user: user,
      problems_id: problems_id,
      round: round,
      answer: answer
    })
  }
  try {
    const res = await fetch(serverlessHost + '/game/answer', requestOptions)
    console.log(res)
    const _res = await res.json()
    return _res
  } catch (e) {
    console.log(e)
    return {
      result: false,
      error: 'Something wrong',
      game_id: game_id,
      score: -1,
      isCorrect: false
    }
  }
}

export async function gameResult(
  game_id: number
): Promise<{
  result: null | unknown
  user1_score: number
  user2_score: number
}> {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Ensure the server knows you're sending JSON
    },
    body: JSON.stringify({
      game_id: game_id
    })
  }
  try {
    const res = await fetch(serverlessHost + '/game/result', requestOptions)
    console.log(res)
    const _res = await res.json()
    return _res
  } catch (e) {
    console.log(e)
    return { result: null, user1_score: -1, user2_score: -1 }
  }
}
