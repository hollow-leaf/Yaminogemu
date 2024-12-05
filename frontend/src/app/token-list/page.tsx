'use client'
import Link from 'next/link'
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import TokenRankings from './token-list'

export default function Home() {
  const isLoggedIn = useIsLoggedIn()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-white via-offwhite to-yellow-100">
      {isLoggedIn ? (
        <TokenRankings />
      ) : (
        <Link href="/">Back to login or signup</Link>
      )}
    </div>
  )
}
