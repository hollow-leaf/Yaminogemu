'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { gameAnswer, gamePrepare, gameQuiz } from '@/services/api/game'
import { sleep } from '@/utils/strignfy'

function Gaming() {
  const router = useRouter()
  const params = useSearchParams()
  const game_id = params.get('game_id')
  const [userAddr, setUserAddr] = useState<string | null>(
    '0x6F744A5737507F035c42872f6869203829F78E36'
  )
  const [quiz, setQuiz] = useState<unknown>()
  const [isPreparing, setIsPreparing] = useState<boolean>(false)
  const [round, setRound] = useState<number>(-1)
  const [user, setUser] = useState<number>(-1)
  const [problemId, setProblemId] = useState<number>(-1)
  const [isEnd, setIsEnd] = useState<boolean>(false)

  useEffect(() => {
    if (!game_id) {
      router.push('/watingroom')
    }
  }, [game_id, router])

  async function prepare() {
    if (!userAddr || !game_id) return
    const res0 = await gamePrepare(Number(game_id), userAddr)
    if (!res0.result) return
    setIsPreparing(true)
    setUser(res0.user)
  }

  async function startGame() {
    setIsPreparing(true)
    await quizWaiting()
    setIsPreparing(false)
  }

  async function quizWaiting() {
    while (true) {
      const res1 = await gameQuiz(Number(game_id))
      if (res1.round === -2) {
        setIsEnd(true)
        return
      }
      if (res1.round > round) {
        setRound(res1.round)
        setQuiz(res1.quiz)
        setProblemId((res1.quiz as any).problems_id)
        return
      }
      await sleep(1500)
    }
  }

  async function submitAnswer(answer: number, user: number) {
    setIsPreparing(true)
    const res3 = await gameAnswer(
      Number(game_id),
      user,
      problemId,
      round,
      answer
    )
    console.log(res3)
  }

  useEffect(() => {
    if (isPreparing) {
      startGame()
    }
  }, [isPreparing])

  return (
    <div className="text-black">
      {round < 0 && (
        <button
          className="rounded w-full shadow px-4 py-2 text-black"
          onClick={prepare}
          disabled={isPreparing}
        >
          Start
        </button>
      )}
      {round >= 0 && !isPreparing && !isEnd && (
        <div>
          <div className="text-xl">{`Round: ${round}`}</div>
          <button
            className="rounded w-full shadow px-4 py-2 text-black"
            onClick={() => submitAnswer(1, 0)}
            disabled={isPreparing}
          >
            Answer 1
          </button>
          <button
            className="rounded w-full shadow px-4 py-2 text-black"
            onClick={() => submitAnswer(1, 1)}
            disabled={isPreparing}
          >
            Answer 2
          </button>
        </div>
      )}
      {isEnd && (
        <div>
          <div className="text-xl">{`GGWP`}</div>
        </div>
      )}
    </div>
  )
}

export default function GamingWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Gaming />
    </Suspense>
  )
}