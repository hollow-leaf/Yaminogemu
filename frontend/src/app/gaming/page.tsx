'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { gameAnswer, gamePrepare, gameQuiz, gameResult } from '@/services/api/game'
import { cn, sleep } from '@/utils/strignfy'
import Image from 'next/image'
import { useWallet } from '@solana/wallet-adapter-react'
import { Quiz } from '../type'

function Gaming() {
  const router = useRouter()
  const params = useSearchParams()
  const game_id = params.get('game_id')

  const wallet = useWallet()
  const isLoggedIn = wallet.connected

  const [userAddr, setUserAddr] = useState<string | null>(null)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [isPreparing, setIsPreparing] = useState<boolean>(false)
  const [round, setRound] = useState<number>(-1)
  const [user, setUser] = useState<number>(-1)
  const [problemId, setProblemId] = useState<number>(-1)
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [scores, setScores] = useState<{s0: number, s1: number}>({s0: 0, s1: 0})

  useEffect(() => {
    if(!isLoggedIn || wallet.publicKey == null) {
      router.replace('/')
    } else {
      setUserAddr(wallet.publicKey.toString())
    }
  }, [])

  useEffect(() => {
    if (!game_id) {
      router.push('/watingroom')
    }
  }, [game_id, router])

  async function prepare() {
    console.log(userAddr)
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
        await scoreUpdate()
        setIsEnd(true)
        return
      }
      if (res1.round > round) {
        setRound(res1.round)
        if(res1.quiz) setQuiz(res1.quiz)
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

  async function scoreUpdate() {
    const res = await gameResult(Number(game_id))
    setScores({s0: res.user1_score, s1: res.user2_score})
  }

  useEffect(() => {
    if (isPreparing) {
      startGame()
    }
  }, [isPreparing])

  useEffect(() => {
    if(round > 0) {
      scoreUpdate()
    }
  }, [round])

  return (
    <div className="flex justify-center min-h-screen items-center p-4">
      {round < 0 && (
        <div className='w-full flex flex-col items-center'>
           <div className="text-[36px] mb-[12px]">Match found</div>
          <Image
            src="/memebattle.png"
            width={350}
            height={350}
            alt="Picture of the author"
            className="rounded-[20px] shadow-2xl my-10"
          />
          <button
            className={cn("rounded-xl w-full text-2xl shadow px-4 py-2 text-white", isPreparing ? "bg-[#2C2D32]/50" : "bg-[#2C2D32]")}
            onClick={prepare}
            disabled={isPreparing}
          >
            {isPreparing ? "loading" : "Battle!"}
          </button>
        </div>
      )}
      {round >= 0 && !isEnd && (
        <div className=''>
          <div 
            className='bg-[#2C2D32] drop-shadow-2xl	text-[24px] rounded-[20px] p-4 w-full grid grid-cols-2 grid-flow-col mb-[36px]'
          >
            <div>
              <div>You</div>
              <div>{user == 0 ? scores.s0 : scores.s1}</div>
            </div>
            <div>
              <div>Opponent</div>
              <div>{user == 1 ? scores.s0 : scores.s1}</div>
            </div>
          </div>
          <div className="text-xl">{`Round: ${round}`}</div>
          {
            quiz && 
            <div>
              <div className='text-[32px] mb-[36px]'>
                {quiz.q4}
              </div>
              <div className='flex flex-col gap-y-[16px] text-[24px]'>
                <button
                  className={cn(
                    "rounded-[20px] w-full px-4 py-4",
                    isPreparing ? quiz.answer == 0 ? "bg-[#33cc99]/60" : "bg-[#fa5c4f]/80" : "")
                  }
                  style={{
                    "boxShadow": "rgba(0, 0, 0, .1) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0"
                  }}
                  onClick={() => submitAnswer(0, user)}
                  disabled={isPreparing}
                >
                  {quiz.q0}
                </button>
                <button
                  className={cn(
                    "rounded-[20px] w-full px-4 py-4",
                    isPreparing ? quiz.answer == 1 ? "bg-[#33cc99]/60" : "bg-[#fa5c4f]/80" : "")
                  }
                  style={{
                    "boxShadow": "rgba(0, 0, 0, .1) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0"
                  }}                  
                  onClick={() => submitAnswer(1, user)}
                  disabled={isPreparing}
                >
                  {quiz.q1}
                </button>
                <button
                  className={cn(
                    "rounded-[20px] w-full px-4 py-4",
                    isPreparing ? quiz.answer == 2 ? "bg-[#33cc99]/60" : "bg-[#fa5c4f]/80" : "")
                  }
                  style={{
                    "boxShadow": "rgba(0, 0, 0, .1) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0"
                  }}
                  onClick={() => submitAnswer(2, user)}
                  disabled={isPreparing}
                >
                  {quiz.q2}
                </button>
              </div>
            </div>
          }
        </div>
      )}
      {isEnd && (
        <div>
          <div className='w-full text-center text-[72px] mb-[36px]'>
            {user == 0 && scores.s0 > scores.s1 ? "Win!!" : "Lose QQ"}
          </div>
          <Image
            src={user == 0 && scores.s0 > scores.s1 ? "/winner.png" : "/loser.png"}
            width={350}
            height={350}
            alt="Picture of the author"
            className="rounded-[20px] my-10"
          />
          {user == 0 && scores.s0 > scores.s1 ? 
            <button
              className={cn("rounded-xl w-full text-2xl shadow px-4 py-2 text-white", isPreparing ? "bg-[#2C2D32]/50" : "bg-[#2C2D32]")}
              onClick={() => {
                router.replace("/")
              }}
            >
              Claim prize
            </button>
            :
            <button
              className={cn("rounded-xl w-full text-2xl shadow px-4 py-2 text-white", isPreparing ? "bg-[#2C2D32]/50" : "bg-[#2C2D32]")}
              onClick={() => {
                router.replace("/")
              }}
            >
              Leave
            </button>
          }
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