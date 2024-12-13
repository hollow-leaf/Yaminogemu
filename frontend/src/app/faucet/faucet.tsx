'use client'
import React, { useState } from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { SolanaTransactionService } from '@/hooks/solanahook'
import { SolanaWallet } from '@dynamic-labs/solana-core'
import Swal from 'sweetalert2'

export default function FaucetPage() {
  const [AirdropToken, setAirdropToken] = useState('BONK')

  const { primaryWallet } = useDynamicContext()

  const handleAirdrop = async (mintPublicKey: string, escrowPublicKey: string) => {
    if (!primaryWallet) {
      console.error('Wallet not available')
      return
    }

    const transaction = new SolanaTransactionService(
      primaryWallet as SolanaWallet
    )
    try {
      const signature = await transaction.airdropToken(mintPublicKey, escrowPublicKey)
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
    { symbol: 'Bonk', mintPublicKey: "Aqk2sTGwLuojdYSHDLCXgidGNUQeskWS2JbKXPksHdaG", escrowPublicKey: "GSpuFKexnLiDoU5J29ZK5NK9TDtBiMwHSV33U4fb2Lza"},
    { symbol: 'MemeDoge', mintPublicKey: "GLmfMYRAw5HEY4rS4DAxeyir8iUTqVcakmtgPvzwaDTd", escrowPublicKey: "3YBD6r9jSRQR4gWjxQK8KmvCrcqFQ9cf9pqd1yuc8JBE"},
    { symbol: 'Pepe', mintPublicKey: "2gcSMoNpcVNrFdJJ9CqiMcP8HeszxisYiWsNdkDuMdDc", escrowPublicKey: "5rkChpTZr38AQ2N4mQkwLDo2hKWAErH4g4z1yudLeFsx"},
    { symbol: 'OPOZ', mintPublicKey: "7isYYx9nfsgW1xxDmDyhjw7jY7PS6jEr89y4G5iAPzNa", escrowPublicKey: "4xs2GfdrXE4Qfh7ZZ8HbHX7KbfTym5jsZhMnine4ZiqY"},
    { symbol: 'OPOS', mintPublicKey: "C1tkdFaP7HjKevK28V1hPR2Rf6B2qMmgrt7LasAun8id", escrowPublicKey: "GyaScCp1Y1MrzTFU4mb49wy4S4FULPJ3z7rGQwmv8WxS"}
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
                onClick={() => handleAirdrop(token.mintPublicKey,token.escrowPublicKey)}
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
