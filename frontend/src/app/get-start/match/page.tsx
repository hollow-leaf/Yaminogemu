'use client'
import Link from 'next/link'
import Match from './match'
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core'

export default function Home() {
  const isLoggedIn = useIsLoggedIn()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-skyblue1 via-skyblue2 to-skyblue3">
      {isLoggedIn ? <Match /> : <Link href="/">Back to login or signup</Link>}
    </div>
  )
}
