'use client'

import { useState, useEffect, useCallback } from 'react'
import Victory from './victory'
import Defeat from './defeat'

export default function KnowledgeKing() {
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)
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
      } else {
        setPlayer2Score((prev) => prev + 20)
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
    <div className="flex items-center justify-between min-h-screen text-white p-4">
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
        <>
          {/* 玩家1 */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-bold">Player 1</h2>
            <div className="w-12 bg-gray-800 rounded-lg h-64 relative">
              <div
                className="bg-blue-500 w-full rounded-lg absolute bottom-0"
                style={{
                  height: `${(player1Score / (questions.length * 20)) * 100}%`
                }}
              ></div>
            </div>
            <span className="text-lg font-medium">{player1Score} points</span>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={`p1-${index}`}
                onClick={() => handleAnswer(1, index)}
                className={`py-2 px-4 rounded-lg text-sm transition-colors ${
                  clickedButtons[`player1-${index}`]
                    ? 'bg-blue-700 text-gray-200'
                    : 'bg-gray-700 hover:bg-blue-500'
                }`}
                disabled={answeredFirst}
              >
                {option}
              </button>
            ))}
          </div>

          {/* 問題區塊 */}
          <div className="flex-1 flex flex-col items-center gap-6 mx-8">
            <h2 className="text-lg font-semibold text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <h1 className="text-md md:text-2xl font-bold text-center break-words w-full max-w-[90%] mx-auto">
              {questions[currentQuestion].question}
            </h1>
            <p className="text-gray-300 text-sm">Time left: {timeLeft}s</p>
          </div>

          {/* 玩家2 */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-bold">Player 2</h2>
            <div className="w-12 bg-gray-800 rounded-lg h-64 relative">
              <div
                className="bg-yellow-500 w-full rounded-lg absolute bottom-0"
                style={{
                  height: `${(player2Score / (questions.length * 20)) * 100}%`
                }}
              ></div>
            </div>
            <span className="text-lg font-medium">{player2Score} points</span>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={`p2-${index}`}
                onClick={() => handleAnswer(2, index)}
                className={`py-2 px-4 rounded-lg text-sm transition-colors ${
                  clickedButtons[`player2-${index}`]
                    ? 'bg-yellow-700 text-gray-200'
                    : 'bg-gray-700 hover:bg-yellow-500'
                }`}
                disabled={answeredFirst}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
