'use client'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import Hall from '@/components/hall'
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { useEffect, useState } from 'react'

export default function Home() {
  const isLoggedIn = useIsLoggedIn()
  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    if (isLoggedIn) setIsLogged(true)
    else {
      setIsLogged(false)
    }
  }, [isLoggedIn])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-skyblue1 via-skyblue2 to-skyblue3">
      {isLogged ? <Hall /> : <DynamicWidget />}
    </div>
  )
}
