'use client'

import { useState, useEffect, useCallback } from 'react'
import Victory from './victory'
import Defeat from './defeat'
import Link from 'next/link'

export default function KnowledgeKing() {
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)
  const [player1CorrectAnswers, setPlayer1CorrectAnswers] = useState(0) // 玩家1答對題數
  const [player2CorrectAnswers, setPlayer2CorrectAnswers] = useState(0) // 玩家2答對題數
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10) // 每題10秒
  const [isGameOver, setIsGameOver] = useState(false)
  const [answeredFirst, setAnsweredFirst] = useState(false)
  const [clickedButtons, setClickedButtons] = useState<{
    [key: string]: boolean
  }>({})
  const [isTie, setIsTie] = useState(false)

  // 題目數據
  const questions = [
    {
      question: 'Which blockchain introduced smart contracts?',
      options: ['Bitcoin', 'Ethereum', 'Polkadot', 'Cardano'],
      correct: 1
    },
    {
      question: 'What is the smallest unit of Bitcoin?',
      options: ['Satoshi', 'Wei', 'Gwei', 'NanoBTC'],
      correct: 0
    },
    {
      question: 'What is the purpose of a DAO in Web3?',
      options: [
        'Centralized finance',
        'Decentralized finance',
        'Decentralized governance',
        'Blockchain mining'
      ],
      correct: 2
    },
    {
      question: 'Which consensus mechanism does Ethereum use after The Merge?',
      options: ['PoW', 'PoS', 'DPoS', 'BFT'],
      correct: 1
    },
    {
      question: 'What is a common use case of NFTs?',
      options: [
        'Physical currency',
        'Digital collectibles',
        'Blockchain consensus',
        'Data encryption'
      ],
      correct: 1
    }
  ]

  // 判斷最終結果
  const checkGameResult = useCallback(() => {
    setIsGameOver(true)
    if (player1Score === player2Score) {
      setIsTie(true)
    }
  }, [player1Score, player2Score])

  // 處理答案選擇
  const handleAnswer = (player: 1 | 2, optionIndex: number) => {
    if (answeredFirst) return

    setAnsweredFirst(true)
    setClickedButtons((prev) => ({
      ...prev,
      [`player${player}-${optionIndex}`]: true
    }))

    const isCorrect = optionIndex === questions[currentQuestion].correct
    if (isCorrect) {
      if (player === 1) {
        setPlayer1Score((prev) => prev + 20)
        setPlayer1CorrectAnswers((prev) => prev + 1)
      } else {
        setPlayer2Score((prev) => prev + 20)
        setPlayer2CorrectAnswers((prev) => prev + 1)
      }
    }

    setTimeout(handleNextQuestion, 1000)
  }

  // 切換到下一題
  const handleNextQuestion = useCallback(() => {
    setAnsweredFirst(false)
    setClickedButtons({})
    setTimeLeft(10)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      checkGameResult()
    }
  }, [checkGameResult, currentQuestion, questions.length])

  // 倒計時
  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion()
      return
    }

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, handleNextQuestion])

  return (
    <div className="flex flex-col items-center justify-between min-h-screen text-white p-4">
      {isGameOver ? (
        <div className="text-center w-full">
          {isTie ? (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-4">It&apos;s a Tie!</h2>
              <p className="mb-6">Do you want to play another game?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="py-2 px-4 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Restart Game
                </button>
                <button
                  onClick={() => (window.location.href = '/')}
                  className="py-2 px-4 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Exit
                </button>
              </div>
            </div>
          ) : player1Score > player2Score ? (
            <Victory />
          ) : (
            <Defeat />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          {/* 問題區塊 */}
          <div className="mt-8 text-center">
            <h2 className="text-lg font-semibold text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <h1 className="text-2xl md:text-3xl font-bold text-center break-words mt-2">
              {questions[currentQuestion].question}
            </h1>
            <p className="text-gray-300 text-sm mt-2">Time left: {timeLeft}s</p>
          </div>

          {/* 玩家1進度條 */}
          <div className="w-full max-w-lg">
            <div className="text-center text-sm font-medium">
              Player 1 Progress
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{
                  width: `${(player1CorrectAnswers / questions.length) * 100}%`
                }}
              ></div>
            </div>
          </div>

          {/* 玩家2進度條 */}
          <div className="w-full max-w-lg mt-4">
            <div className="text-center text-sm font-medium">
              Player 2 Progress
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
              <div
                className="bg-yellow-500 h-full rounded-full"
                style={{
                  width: `${(player2CorrectAnswers / questions.length) * 100}%`
                }}
              ></div>
            </div>
          </div>

          {/* 選項 */}
          <div className="grid grid-cols-1 gap-4 w-full max-w-md mt-8">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={`option-${index}`}
                onClick={() => handleAnswer(1, index)}
                className={`py-2 px-4 rounded-lg text-sm font-medium text-center bg-gray-700 hover:bg-cyan-500 transition-colors ${
                  clickedButtons[`player1-${index}`]
                    ? 'bg-blue-700 text-gray-200'
                    : ''
                }`}
                disabled={answeredFirst}
              >
                {option}
              </button>
            ))}
          </div>
          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 py-3">
            <div className="flex justify-around items-center max-w-screen-xl mx-auto">
              <Link href="/" className="flex flex-col items-center">
                <span className="text-2xl text-cyan-400">🏠</span>
                <span className="text-xs text-gray-400">Home</span>
              </Link>
              <Link href="/token-list" className="flex flex-col items-center">
                <span className="text-2xl text-cyan-400">📊</span>
                <span className="text-xs text-gray-400">Token List</span>
              </Link>
              <Link href="/defi" className="flex flex-col items-center">
                <span className="text-2xl text-cyan-400">💎</span>
                <span className="text-xs text-gray-400">DeFi</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
