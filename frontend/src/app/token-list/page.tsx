'use client'
import TokenRankings from './token-list'
import { useWallet } from '@solana/wallet-adapter-react'

export default function Home() {
  const wallet = useWallet()
  const isLoggedIn = wallet.connected
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoggedIn && <TokenRankings />}
    </div>
  )
}
