'use client'
import React, { useEffect, useState } from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { SolanaTransactionService } from '@/hooks/solanahook'
import { SolanaWallet } from '@dynamic-labs/solana-core'
import { X } from 'lucide-react'
import Swal from 'sweetalert2'

export default function DeFiStakingPage() {
  const [amount, setAmount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [withdrawToken, setWithdrawToken] = useState('BONK')
  const [bonkBalance, setBonkBalance] = useState<string>('0')
  const [memeDogeBalance, setMemeDogeBalance] = useState<string>('0')
  const [OPOZBalance, setOPOZBalance] = useState<string>('0')
  const [OPOSBalance, setOPOSBalance] = useState<string>('0')
  const [pepeBalance, setPepeBalance] = useState<string>('0')
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
      const signature = await transaction.depositTransaction(Number(amount))
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

  const handleWithdraw = async () => {
    if (!primaryWallet) {
      console.error('Wallet not available')
      return
    }

    const transaction = new SolanaTransactionService(
      primaryWallet as SolanaWallet
    )
    switch (withdrawToken) {
      case 'Bonk':
        try {
          const signature = await transaction.withdrawBonk(Number(amount))
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
        break
      case 'MemeDoge':
        try {
          const signature = await transaction.withdrawMemeDoge(Number(amount))
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
        break
      case 'OPOZ':
        try {
          const signature = await transaction.withdrawOPOZ(Number(amount))
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
        break
      case 'OPOS':
        try {
          const signature = await transaction.withdrawOPOS(Number(amount))
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
        break
      case 'Pepe':
        try {
          const signature = await transaction.withdrawPepe(Number(amount))
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
        break
      default:
        console.log('Your token is not exist!')
    }
  }

  const fetchTokenBalance = async () => {
    if (!primaryWallet) {
      console.error('Wallet not available')
      return
    }

    const transaction = new SolanaTransactionService(
      primaryWallet as SolanaWallet
    )

    const tokenNames = ['Bonk', 'MemeDoge', 'OPOZ', 'OPOS', 'Pepe']
    const balances: Record<string, string> = {}
    try {
      await Promise.all(
        tokenNames.map(async (token) => {
          try {
            balances[token] = await transaction.Balance(token)
          } catch (e) {
            balances[token] = '0'
          }
        })
      )

      // Batch state updates to avoid excessive re-renders
      setBonkBalance(balances['Bonk'] || '0')
      setMemeDogeBalance(balances['MemeDoge'] || '0')
      setOPOZBalance(balances['OPOZ'] || '0')
      setOPOSBalance(balances['OPOS'] || '0')
      setPepeBalance(balances['Pepe'] || '0')
    } catch (error) {
      console.error('Error fetching balances:', error)
    }
  }

  useEffect(() => {
    fetchTokenBalance()

    const intervalId = setInterval(() => {
      fetchTokenBalance()
    }, 5000) // 5 sec
    return () => clearInterval(intervalId)
  }, [fetchTokenBalance])
  const tokens = [
    { symbol: 'Bonk', balance: `${bonkBalance}`, ratio: 1 },
    { symbol: 'MemeDoge', balance: `${memeDogeBalance}`, ratio: 2 },
    { symbol: 'OPOZ', balance: `${OPOZBalance}`, ratio: 2 },
    { symbol: 'OPOS', balance: `${OPOSBalance}`, ratio: 2 },
    { symbol: 'Pepe', balance: `${pepeBalance}`, ratio: 2 }
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
              <span className="text-sm md:text-xl font-bold text-white">
                ratio : {token.ratio}
              </span>
            </div>
            <div className="text-right">
              <span className="block text-white text-sm md:text-base">
                Balance: {token.balance}
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
