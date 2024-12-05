'use client'
import Link from 'next/link'
import Game from './components/game'
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core'

export default function Home() {
  const isLoggedIn = useIsLoggedIn()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900">
      {isLoggedIn ? <Game /> : <Link href="/">Back to login or signup</Link>}
    </div>
  )
}
