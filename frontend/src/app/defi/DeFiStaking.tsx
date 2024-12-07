'use client'
import React, { useState } from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { DepositTransaction } from '@/hooks/SolanaHook'
import Link from 'next/link'

export default function DeFiStakingPage() {
  const [amount, setAmount] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value)) // Update the amount state with the input value
  }

  const { primaryWallet } = useDynamicContext()
  const tokens = [
    { symbol: 'BTC' },
    { symbol: 'ETH' },
    { symbol: 'SOL' },
    { symbol: 'BNB' },
    { symbol: 'ADA' }
  ]

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-6 md:p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
          💎 Meme Liquidity Pool
        </h1>
        <p className="text-gray-400 text-sm md:text-base mt-2">
          Stake your BONKs and earn rewards effortlessly.
        </p>
      </header>

      {/* Token Staking List */}
      <section className="space-y-6">
        {tokens.map((token) => (
          <div
            key={token.symbol}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg md:text-xl font-bold text-cyan-400">
                {token.symbol}
              </span>
              <span className="text-sm md:text-xl font-bold text-white">
                ratio : 2
              </span>
            </div>
            <div className="text-right">
              <span className="block text-cyan-400  text-sm md:text-base">
                Balance: 0.00
              </span>
              <button className="mt-2 bg-cyan-500 text-white py-1 px-4 rounded-full text-sm md:text-base hover:bg-cyan-600 transition-colors">
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <input
          type="number"
          value={amount}
          onChange={handleInputChange}
          className="mb-4 w-full text-black py-2 md:py-3 rounded-md border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter amount to stake"
        />
        <button
          onClick={() => DepositTransaction(primaryWallet || null, amount)}
          className="mb-4 w-full bg-cyan-500 py-3 md:py-4 rounded-full font-medium text-sm md:text-base hover:bg-cyan-600 transition-colors"
        >
          Stake Bonk
        </button>
        Staking Amount : 14.00
      </footer>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 py-3">
        <div className="flex justify-around items-center max-w-screen-xl mx-auto">
          <Link href="/" className="flex flex-col items-center">
            <span className="text-2xl text-cyan-400">🏠</span>
            <span className="text-xs text-gray-400">Home</span>
          </Link>
          <Link href="/token-list" className="flex flex-col items-center">
            <span className="text-2xl text-cyan-400">📊</span>
            <span className="text-xs text-gray-400">Token List</span>
          </Link>
          <Link href="/defi" className="flex flex-col items-center">
            <span className="text-2xl text-cyan-400">💎</span>
            <span className="text-xs text-gray-400">DeFi</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
