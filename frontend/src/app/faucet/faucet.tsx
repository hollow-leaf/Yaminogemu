'use client'
import React, { useState } from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { SolanaTransactionService } from '@/hooks/solanahook'
import { SolanaWallet } from '@dynamic-labs/solana-core'
import Swal from 'sweetalert2'

export default function FaucetPage() {
  const [AirdropToken, setAirdropToken] = useState('BONK')

  const { primaryWallet } = useDynamicContext()

  const handleAirdrop = async () => {
    if (!primaryWallet) {
      console.error('Wallet not available')
      return
    }

    const transaction = new SolanaTransactionService(
      primaryWallet as SolanaWallet
    )
    try {
      const signature = await transaction.airdropToken()
      const explorerTx = `https://explorer.solana.com/tx/${signature}?cluster=devnet`
      Swal.fire({
        icon: 'success',
        title: 'Transaction success',
        html: `Your transaction is successful. <br> 
       <a href="${explorerTx}" target="_blank" style="color: #3085d6; text-decoration: underline;">
       View on Explorer
       </a>`,
        confirmButtonText: 'Confirm'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Transaction error',
        text: `${error}`,
        confirmButtonText: 'Confirm'
      })
    }
  }


  const tokens = [
    { symbol: 'Bonk'},
    { symbol: 'MemeDoge'},
    { symbol: 'OPOZ'},
    { symbol: 'OPOS'},
    { symbol: 'Pepe'}
  ]

  return (
    <div className="w-full min-h-screen text-white p-6 md:p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          💎 Meme Liquidity Pool
        </h1>
        <p className="text-sm md:text-base mt-2">
          Stake your BONKs and earn rewards effortlessly.
        </p>
      </header>

      {/* Token Staking List */}
      <section className="space-y-6">
        {tokens.map((token) => (
          <div
            key={token.symbol}
            className="flex items-center justify-between p-4 rounded-lg shadow-md bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg md:text-xl font-bold text-cyan-400">
                {token.symbol}
              </span>
            </div>
            <div className="text-right">
              <button
                onClick={() => handleAirdrop()}
                className="mt-2 bg-cyan-500 text-white py-1 px-4 rounded-full text-sm md:text-base hover:bg-cyan-600 transition-colors"
              >
                Claim
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
