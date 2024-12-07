'use client'
import React, { useState } from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { SolanaTransactionService } from '@/hooks/solanahook'
import { SolanaWallet } from '@dynamic-labs/solana-core'
import Link from 'next/link'
import { X } from 'lucide-react'

export default function DeFiStakingPage() {
  const [amount, setAmount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [withdrawToken, setWithdrawToken] = useState('')

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value)) // Update the amount state with the input value
  }
  const handleWithdrawWindows = (itemName: string) => {
    toggleOpen()
    setWithdrawToken(itemName)
  }

  const { primaryWallet } = useDynamicContext()

  const handleDeposit = async () => {
    if (!primaryWallet) {
      console.error('Wallet not available')
      return
    }

    const transaction = new SolanaTransactionService(
      primaryWallet as SolanaWallet
    )
    try {
      await transaction.depositTransaction(amount)
      console.log('Deposit sent')
    } catch (error) {
      console.error('Error sending transaction:', error)
    }
  }

  const handleWithdraw = async () => {
    if (!primaryWallet) {
      console.error('Wallet not available')
      return
    }

    const transaction = new SolanaTransactionService(
      primaryWallet as SolanaWallet
    )
    switch (withdrawToken) {
      case 'BONK':
        try {
          await transaction.withdrawBonk(amount)
          console.log('Deposit sent')
        } catch (error) {
          console.error('Error sending transaction:', error)
        }
        break
      case 'MEMEDOGE':
        try {
          await transaction.withdrawMemeDoge(amount)
          console.log('Deposit sent')
        } catch (error) {
          console.error('Error sending transaction:', error)
        }
        break
      case 'OPOS':
        try {
          await transaction.withdrawOPOS(amount)
          console.log('Deposit sent')
        } catch (error) {
          console.error('Error sending transaction:', error)
        }
        break
      case 'OPOZ':
        try {
          await transaction.withdrawOPOZ(amount)
          console.log('Deposit sent')
        } catch (error) {
          console.error('Error sending transaction:', error)
        }
        break
      case 'PEPE':
        try {
          await transaction.withdrawPepe(amount)
          console.log('Deposit sent')
        } catch (error) {
          console.error('Error sending transaction:', error)
        }
        break
      default:
        console.log('Your token is not exist!')
    }
  }
  const tokens = [
    { symbol: 'BONK' },
    { symbol: 'MEMEDOGE' },
    { symbol: 'OPOS' },
    { symbol: 'OPOZ' },
    { symbol: 'PEPE' }
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
              <button
                onClick={() => handleWithdrawWindows(token.symbol)}
                className="mt-2 bg-cyan-500 text-white py-1 px-4 rounded-full text-sm md:text-base hover:bg-cyan-600 transition-colors"
              >
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
          min={0}
          onChange={handleInputChange}
          className="mb-4 w-full text-black py-2 md:py-3 rounded-xl border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter amount to stake"
        />
        <button
          onClick={handleDeposit}
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

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={toggleOpen}
        >
          <section
            className="bg-white text-black border-4 border-cyan-400 p-3 rounded-xl shadow-lg w-2/3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <X
                onClick={toggleOpen}
                className="hover:rotate-90 duration-300"
              />
            </div>
            <h2 className="text-lg font-bold">Withdraw</h2>
            <p className="mt-2">Enter the amount you wish to withdraw.</p>
            <input
              type="number"
              className="mt-4 w-full py-2 px-3 border rounded-md"
              placeholder="Amount"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleWithdraw}
                className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600"
              >
                Confirm
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
