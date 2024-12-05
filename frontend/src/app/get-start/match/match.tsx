'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Match() {
  const [matching, setMatching] = useState(true) // auto matching
  const [matched, setMatched] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (matching) {
      // mock match found, delay 2~5 seconds
      const timeout = setTimeout(
        () => {
          setMatching(false)
          setMatched(true)
          setShowConfirm(true)
        },
        Math.random() * 3000 + 2000
      )

      return () => clearTimeout(timeout)
    }
  }, [matching])

  const handleStartGame = () => {
    router.push('/game')
  }

  const handleCancelMatch = () => {
    setShowConfirm(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      {matching && (
        <div className="text-center animate-pulse text-xl font-bold">
          <span>Searching for an opponent...</span>
        </div>
      )}

      {/* Match found rejected */}
      {matched && !showConfirm && (
        <div className="text-center">
          <button
            onClick={() => setMatching(true)} // if user click no, display find btn.
            className="w-48 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg font-bold shadow-md hover:opacity-90"
          >
            Find Match
          </button>
        </div>
      )}

      {/* Match found windows */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-8 rounded-lg text-center w-80">
            <h2 className="text-xl font-bold mb-4">Opponent Found!</h2>
            <p className="text-lg mb-6">Do you want to start the game?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleStartGame}
                className="w-24 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={handleCancelMatch}
                className="w-24 py-2 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
