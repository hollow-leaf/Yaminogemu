'use client'

import Link from 'next/link'

export default function TokenRankings() {
  // 模擬數據，可以替換為 API 獲取的數據
  const tokens = [
    { rank: 1, symbol: 'BTC', balance: 12.5 },
    { rank: 2, symbol: 'ETH', balance: 8.3 },
    { rank: 3, symbol: 'SOL', balance: 20.1 },
    { rank: 4, symbol: 'BNB', balance: 5.8 },
    { rank: 5, symbol: 'ADA', balance: 15.7 }
  ]

  return (
    <div className="w-full max-w-[600px] p-6 md:p-8 mx-auto">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          🏆 Token Rankings
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Explore the top tokens in MEME ETF
        </p>
      </header>

      {/* Rankings List */}
      <section className="space-y-4">
        {tokens.map((token) => (
          <div
            key={token.rank}
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg md:text-xl font-bold text-cyan-500">
                #{token.rank}
              </span>
              <span className="text-base md:text-lg font-medium text-gray-800">
                {token.symbol}
              </span>
            </div>
            <span className="text-sm md:text-base font-medium text-gray-600">
              {token.balance}
            </span>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-8 text-center">
        <Link href="/defi">
          <button className="w-full bg-cyan-400 text-white py-3 md:py-4 rounded-full font-medium text-sm md:text-base hover:bg-cyan-500 transition-colors">
            Stake Tokens
          </button>
        </Link>
      </footer>

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
  )
}
