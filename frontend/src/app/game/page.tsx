'use client'
import { useLayoutEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import Game from './components/game'

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-skyblue1 via-skyblue2 to-skyblue3">
      {isLogin ? <Game /> : <Link href="/">Back to login or signup</Link>}
    </div>
  )
}
