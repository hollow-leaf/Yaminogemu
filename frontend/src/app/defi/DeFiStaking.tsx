'use client'

import Link from 'next/link'

export default function DeFiStakingPage() {
  // 模擬數據，可以替換為 API 獲取的數據
  const tokens = [
    { symbol: 'BTC', balance: 12.5, apr: '8.5%' },
    { symbol: 'ETH', balance: 8.3, apr: '6.0%' },
    { symbol: 'SOL', balance: 20.1, apr: '10.2%' },
    { symbol: 'BNB', balance: 5.8, apr: '7.5%' },
    { symbol: 'ADA', balance: 15.7, apr: '9.8%' }
  ]

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-6 md:p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
          💎 DeFi Staking
        </h1>
        <p className="text-gray-400 text-sm md:text-base mt-2">
          Stake your tokens and earn rewards effortlessly.
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
              <span className="text-gray-400 text-sm md:text-base">
                Balance: {token.balance}
              </span>
            </div>
            <div className="text-right">
              <span className="block text-cyan-400 text-sm md:text-base">
                APR: {token.apr}
              </span>
              <button className="mt-2 bg-cyan-500 text-white py-1 px-4 rounded-full text-sm md:text-base hover:bg-cyan-600 transition-colors">
                Stake
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <Link href="/defi">
          <button className="w-full bg-cyan-500 py-3 md:py-4 rounded-full font-medium text-sm md:text-base hover:bg-cyan-600 transition-colors">
            View Staking Rewards
          </button>
        </Link>
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
