'use client'
import React from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { SolanaTransactionService } from '@/hooks/solanahook'
import { SolanaWallet } from '@dynamic-labs/solana-core'
import Swal from 'sweetalert2'

export default function FaucetPage() {
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



  return (
    <button
      onClick={handleAirdrop}
      className="mt-2 bg-cyan-500 text-white py-1 px-4 rounded-full text-sm md:text-base hover:bg-cyan-600 transition-colors"
    >
      Claim
    </button>
  )
}