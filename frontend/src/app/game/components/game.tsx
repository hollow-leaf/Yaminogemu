'use client'
import { useState, useEffect } from 'react'
import Victory from './victory'
import Defeat from './defeat'

export default function Game() {
  const [isGameOver, setIsGameOver] = useState(false)
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null)

  useEffect(() => {
    // mock end game
    const timeout = setTimeout(
      () => {
        const randomResult = Math.random() > 0.5 ? 'win' : 'lose'
        setGameResult(randomResult)
        setIsGameOver(true)
      },
      Math.random() * 3000 + 2000
    )

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* game windows */}
      {!isGameOver && (
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold">Game in Progress...</h1>
          <p className="mt-2">Wait for the game to finish...</p>
        </div>
      )}

      {/* end game windows */}
      {isGameOver && gameResult === 'win' && <Victory />}
      {isGameOver && gameResult === 'lose' && <Defeat />}
    </div>
  )
}
