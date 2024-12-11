"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LoginModal } from './loginModal'
import { useWallet } from "@solana/wallet-adapter-react";

export default function Hall() {

  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [showBox, setShowBox] = useState<boolean>(false)

  const wallet = useWallet()
  const isLoggedIn = wallet.connected
  const router = useRouter()

  function playHandler() {
    setIsPlay(true)
    if(isLoggedIn) {
      router.replace('/waitingroom')
    } else {
      setShowBox(true)
    }
  }

  useEffect(() => {
    console.log(isLoggedIn)
    if(isLoggedIn && isPlay) {
      router.replace('/waitingroom')
    }
  }, [isLoggedIn])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] rounded-xl p-4">
        {/* Title Section */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            <Image
              src={"./logo.png"}
              alt='logo'
              width={300}
              height={300}
            />
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
            Play
          </button>
        </div>
      </div>
      <LoginModal 
        showBox={showBox}
        closed={() => {setShowBox(false)}}
        isLoading={false}
      />
    </div>
  )
}
