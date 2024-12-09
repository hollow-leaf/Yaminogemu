'use client'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { useEffect, useState } from 'react'
import Hall from '@/components/hall'

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLogged ? <Hall /> : <DynamicWidget />}
    </div>
  )
}
