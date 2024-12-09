'use client'
import Staking from '@/app/get-start/staking'
import { DynamicWidget, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'

export default function Home() {
  const isLoggedIn = useIsLoggedIn()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoggedIn ? <Staking /> : <DynamicWidget />}
    </div>
  )
}
