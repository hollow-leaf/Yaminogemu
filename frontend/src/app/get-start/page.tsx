'use client'
import Staking from '@/app/get-start/staking'
import Link from 'next/link'
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core'

export default function Home() {
  const isLoggedIn = useIsLoggedIn()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-white via-offwhite to-yellow-100">
      {isLoggedIn ? <Staking /> : <Link href="/">Back to login or signup</Link>}
    </div>
  )
}
