'use client'
import Link from 'next/link'

export default function Defeat() {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 via-red-700 to-red-900 text-white p-8 rounded-xl">
      {/* Defeat Banner */}
      <div className="text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-500 animate-pulse">
          Defeat!
        </h2>
        <p className="text-xl md:text-2xl font-light opacity-80">
          The battle is lost. Do not give up!
        </p>
      </div>

      {/* Animated Broken Shield */}
      <div className="mt-8 mb-12">
        <div className="w-24 h-24 md:w-32 md:h-32 text-7xl rounded-full flex items-center justify-center shadow-lg animate-bounce">
          😢
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          href="/get-start"
          className="px-8 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transform transition-transform text-center"
        >
          Try Again
        </Link>
        <Link
          href="/"
          className="px-8 py-3 bg-transparent border-2 border-red-400 text-red-400 font-bold text-lg rounded-full hover:bg-red-400 hover:text-white transition-all text-center"
        >
          Exit Game
        </Link>
      </div>
    </div>
  )
}
