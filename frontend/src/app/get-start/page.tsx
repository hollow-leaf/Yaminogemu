'use client'
import { useLayoutEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import Staking from '@/app/get-start/components/staking'
import Link from 'next/link'

export default function Home() {
  const account = useAccount()
  const [isLogin, setIsLogin] = useState(false)
  useLayoutEffect(() => {
    if (account.status === 'connected') {
      setIsLogin(true)
    } else if (account.status === 'disconnected') {
      setIsLogin(false)
    }
  }, [account.status])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-white via-offwhite to-yellow-100">
      {isLogin ? <Staking /> : <Link href="/">Back to login or signup</Link>}
    </div>
  )
}
