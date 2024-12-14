'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LoginModal } from './loginModal'
import {
  DynamicContextProvider,
  DynamicWidget,
  useIsLoggedIn,
  Wallet,
  useDynamicContext
} from '@dynamic-labs/sdk-react-core'
import { isSolanaWallet } from '@dynamic-labs/solana'

export default function Hall() {
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [showBox, setShowBox] = useState<boolean>(false)

  const isLoggedIn = useIsLoggedIn()
  const { primaryWallet } = useDynamicContext()

  const router = useRouter()

  function playHandler() {
    setIsPlay(true)
    if (isLoggedIn) {
      if (primaryWallet != null) {
        if (!isSolanaWallet(primaryWallet)) {
          return
        }
      } else {
        return
      }
      router.replace('/waitingroom')
    } else {
      setShowBox(true)
    }
  }

  useEffect(() => {
    console.log(isLoggedIn)
    if (isLoggedIn && isPlay) {
      setIsPlay(false)
      if (primaryWallet != null) {
        if (!isSolanaWallet(primaryWallet)) {
          return
        }
      } else {
        return
      }
      router.replace('/waitingroom')
    }
  }, [isLoggedIn])

  return (
    <div
      className="absolute top-0 z-20 w-full flex items-center justify-center min-h-screen"
      style={{
        backgroundImage:
          'linear-gradient(-225deg, #80DEEA 0%, #57E9F2 48%, #45D4FB 100%)'
      }}
    >
      <div className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] rounded-xl p-4">
        {/* Title Section */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            <Image src={'./logo.png'} alt="logo" width={300} height={300} />
          </div>
          <p className="mt-4 text-gray-200 text-base md:text-lg lg:text-xl font-medium">
            Challenge other players to see who has more blockchain knowledge &
            Win bonk tokens
          </p>
        </div>

        {/* Button Section */}
        <div className="text-center mt-12 w-full">
          <button
            className="rounded-xl w-full text-2xl shadow px-4 py-2 bg-[#2C2D32] text-white"
            onClick={playHandler}
          >
            Enter
          </button>
        </div>
      </div>
      <LoginModal
        showBox={showBox}
        closed={() => {
          setShowBox(false)
        }}
        isLoading={false}
      />
    </div>
  )
}
