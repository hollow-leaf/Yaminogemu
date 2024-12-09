'use client'
import { DynamicWidget, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import DeFiStakingPage from './DeFiStaking'

export default function Home() {
  const isLoggedIn = useIsLoggedIn()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoggedIn ? <DeFiStakingPage /> : <DynamicWidget />}
    </div>
  )
}
