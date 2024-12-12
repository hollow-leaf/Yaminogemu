'use client'
import { useRouter } from 'next/navigation'
import TokenRankings from './token-list'
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { useEffect, useState } from 'react'
import { isSolanaWallet } from '@dynamic-labs/solana-core'
import { PublicKey } from '@solana/web3.js'

export default function Home() {
  const router = useRouter()
  const isLoggedIn = useIsLoggedIn()
  const { primaryWallet } = useDynamicContext();
  const [userAddr, setUserAddr] = useState<string | null>(null)

  useEffect(() => {
    if(isLoggedIn) {
      if(primaryWallet != null) {
        if(!isSolanaWallet(primaryWallet)) {
          router.replace('/')
        }
        const fromKey = new PublicKey(primaryWallet.address); 
        setUserAddr(fromKey.toBase58())
      } else {
        router.replace('/')
      }
      router.replace('/token-list')
    } else {
      router.replace('/')
    }
  }, [])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoggedIn && <TokenRankings />}
    </div>
  )
}
