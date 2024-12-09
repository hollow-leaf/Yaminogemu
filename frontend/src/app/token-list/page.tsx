'use client'
import { DynamicWidget, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import TokenRankings from './token-list'

export default function Home() {
  const isLoggedIn = useIsLoggedIn()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoggedIn ? <TokenRankings /> : <DynamicWidget />}
    </div>
  )
}
