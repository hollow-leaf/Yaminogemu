'use client'
import Link from 'next/link'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { SolanaTransactionService } from '@/hooks/solanahook'
import { SolanaWallet } from '@dynamic-labs/solana-core'

const hall_data = [
  [
    { char: 'B', color: 'bg-orange-400 text-white' },
    { char: 'L', color: 'bg-white text-gray-300' },
    { char: 'O', color: 'bg-white text-gray-300' },
    { char: 'C', color: 'bg-white text-gray-300' },
    { char: 'K', color: 'bg-orange-400 text-white' }
  ],
  [
    { char: 'C', color: 'bg-orange-400 text-white' },
    { char: 'H', color: 'bg-white text-gray-300' },
    { char: 'A', color: 'bg-orange-400 text-white' },
    { char: 'I', color: 'bg-white text-gray-300' },
    { char: 'N', color: 'bg-orange-400 text-white' }
  ],
  [
    { char: 'B', color: 'bg-white text-gray-300' },
    { char: 'R', color: 'bg-orange-400 text-white' },
    { char: 'A', color: 'bg-white text-gray-300' },
    { char: 'I', color: 'bg-orange-400 text-white' },
    { char: 'N', color: 'bg-white text-gray-300' }
  ]
]

export default function Hall() {
  const { primaryWallet } = useDynamicContext()
  const handleSend = async () => {
    if (!primaryWallet) {
      console.error('Wallet not available')
      return
    }

    const transaction = new SolanaTransactionService(
      primaryWallet as SolanaWallet
    )
    try {
      await transaction.sendTransaction(
        'ApWyxz5L6WRCGXxQ8uwThz8ppxvdFrQDQDp9sHF4qWGC',
        0.01
      )
      console.log('Transaction sent')
    } catch (error) {
      console.error('Error sending transaction:', error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[90%] max-w-[400px] md:max-w-[600px] lg:max-w-[800px] aspect-[9/16] md:aspect-[12/16] lg:aspect-[14/16] rounded-xl p-6">
        {/* Title Section */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            <span role="img" aria-label="Crown">
              👑
            </span>
            <span>Yaminogemu</span>
          </div>
          <p className="mt-4 text-gray-200 text-base md:text-lg lg:text-xl font-medium">
            Challenge other players to see who has more blockchain knowledge &
            Win bonk tokens
          </p>
        </div>

        {/* Puzzle Section */}
        <div className="grid gap-y-3">
          {hall_data.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex justify-center ${
                rowIndex % 2 !== 0 ? 'ml-[5%]' : ''
              }`}
            >
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`hex ${cell.color} text-lg md:text-2xl w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center font-bold`}
                >
                  {cell.char}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Button Section */}
        <div className="space-y-4 text-center mt-12">
          <Link href="/get-start">
            <button className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold py-3 md:py-4 lg:py-5 rounded-2xl shadow-md hover:opacity-90">
              Play
            </button>
          </Link>
          <button
            onClick={handleSend}
            className="w-full bg-white text-blue-500 font-bold py-3 md:py-4 lg:py-5 rounded-2xl shadow-md hover:opacity-90"
          >
            Test Send 10 sol
          </button>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
          <div className="flex justify-around items-center max-w-screen-xl mx-auto">
            <Link href="/" className="flex flex-col items-center">
              <span className="text-2xl">🏠</span>
              <span className="text-xs text-gray-600">Home</span>
            </Link>
            <Link href="/token-list" className="flex flex-col items-center">
              <span className="text-2xl">📊</span>
              <span className="text-xs text-gray-600">Token list</span>
            </Link>
            {/* open windows and do something with dynamic wallet */}
            <Link href="/defi" className="flex flex-col items-center">
              <span className="text-2xl">💎</span>
              <span className="text-xs text-gray-600">DeFi</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
