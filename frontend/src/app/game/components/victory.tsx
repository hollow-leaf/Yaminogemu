'use client'
import { useRouter } from 'next/navigation'

export default function Victory() {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-green-600 to-green-800 text-white p-8 rounded-lg shadow-2xl">
      <div className="mb-8 text-center">
        <h2 className="text-6xl font-bold mb-4 animate-bounce">Victory!</h2>
        <p className="text-xl opacity-80">You won the game. Congratulations!</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-semibold">Want to try again?</p>
        <div className="flex gap-4">
          <button
            className="px-6 py-3 bg-white text-green-600 rounded-full font-bold hover:bg-gray-100 transition-colors"
            onClick={() => router.push('/get-start')}
          >
            Play Again
          </button>
          <button
            className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors"
            onClick={() => router.push('/')}
          >
            Exit Game
          </button>
        </div>
      </div>
    </div>
  )
}
