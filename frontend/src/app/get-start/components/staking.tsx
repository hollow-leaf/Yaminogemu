'use client'
import { formatAddress } from '@/utils/strignfy'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserWallets } from '@dynamic-labs/sdk-react-core'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useEffect, useState } from 'react'

export default function Staking() {
  const userWallets = useUserWallets()
  const { primaryWallet } = useDynamicContext();
  const [balance, setBalance] = useState<string | undefined | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (primaryWallet) {
        const value = await primaryWallet.getBalance()
        setBalance(value as string | undefined);
      }
    };
    fetchBalance();
  }, [primaryWallet]);

  const router = useRouter(); 
  const handleStaking = () => {
    console.log('clicked!')
    if (true) {
      router.push('/get-start/match')
    }
  }

  return (
    <div className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] p-4 md:p-6 lg:p-8 mb-16">
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <span className="text-sm md:text-sm lg:text-base text-gray-500">
          Hi 
          {userWallets.map((wallet) => (
          <p key={wallet.id}>
            {formatAddress(wallet.address)}
          </p>
          ))}
        </span>
        <span className="text-lg md:text-xl lg:text-2xl">👋</span>
      </div>

      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
        Let&apos;s Play
      </h1>

      <div className="flex justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl lg:text-2xl text-yellow-400">
            👑
          </span>
          <div>
            <p className="font-bold text-base md:text-lg lg:text-xl">116</p>
            <p className="text-xs md:text-xs lg:text-sm text-gray-500">Rank</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl lg:text-2xl text-yellow-400">
            🪙
          </span>
          <div>
            <span className="font-bold text-base md:text-lg lg:text-xl">
              {balance}
            </span>
            <span className="font-bold text-base md:text-lg lg:text-xl">
            {userWallets.map((wallet)=>(
                <p key={wallet.id}>
                  {wallet.chain}
                </p>
              ))}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6 md:mb-8">
        <div className="flex justify-between text-sm md:text-sm lg:text-base mb-2">
          <span>Level 2</span>
          <span>40%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-cyan-400 h-2 rounded-full w-[40%]"></div>
        </div>
      </div>

      <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-3 md:mb-4">
        Yaminogemu #tokens
      </p>
      <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
        <div className="hex bg-blue-100 aspect-square flex items-center justify-center transform hover:scale-105 transition-transform">
          <span className="text-2xl md:text-3xl lg:text-4xl">💎</span>
        </div>
        <div className="hex bg-blue-100 aspect-square flex items-center justify-center transform hover:scale-105 transition-transform">
          <span className="text-2xl md:text-3xl lg:text-4xl">⭐</span>
        </div>
        <div className="hex bg-blue-100 aspect-square flex items-center justify-center transform hover:scale-105 transition-transform">
          <span className="text-2xl md:text-3xl lg:text-4xl">⚡</span>
        </div>
        <div className="hex bg-blue-100 aspect-square flex items-center justify-center transform hover:scale-105 transition-transform">
          <span className="text-2xl md:text-3xl lg:text-4xl">🏆</span>
        </div>
        <div className="hex bg-blue-100 aspect-square flex items-center justify-center transform hover:scale-105 transition-transform">
          <span className="text-2xl md:text-3xl lg:text-4xl">👑</span>
        </div>
      </div>

      <button
        onClick={handleStaking}
        className="w-full bg-cyan-400 text-white py-3 md:py-4 rounded-full font-medium text-sm md:text-base lg:text-lg hover:bg-cyan-500 transition-colors"
      >
        Staking
      </button>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
        <div className="flex justify-around items-center max-w-screen-xl mx-auto">
          <Link href="/" className="flex flex-col items-center">
            <span className="text-xl">🏠</span>
            <span className="text-xs text-gray-600">Home</span>
          </Link>
          <Link href="/get-start" className="flex flex-col items-center">
            <span className="text-xl">🎮</span>
            <span className="text-xs text-gray-600">Get Start</span>
          </Link>
          {/* open windows and do something with dynamic wallet */}
          <button className="flex flex-col items-center">
            <span className="text-xl">👛</span>
            <span className="text-xs text-gray-600">Wallet</span>
          </button>
        </div>
      </div>
    </div>
  )
}
