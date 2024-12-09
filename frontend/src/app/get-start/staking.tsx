'use client'
import { formatAddress } from '@/utils/strignfy'
import { useRouter } from 'next/navigation'
import { useUserWallets } from '@dynamic-labs/sdk-react-core'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { SolanaWallet } from '@dynamic-labs/solana-core'
import { SolanaTransactionService } from '@/hooks/solanahook'
import Swal from 'sweetalert2'

export default function Staking() {
  const userWallets = useUserWallets()
  const { primaryWallet } = useDynamicContext()
  const [balance, setBalance] = useState<string | undefined | null>(null)
  const [chain, setChain] = useState<string | undefined | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [amount, setAmount] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState<string>('Bonk')

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    setChain(userWallets[0]?.chain)
  }, [userWallets])

  useEffect(() => {
    const fetchBalance = async () => {
      if (primaryWallet) {
        const value = await primaryWallet.getBalance()
        setBalance(value as string | undefined)
      }
    }
    fetchBalance()
  }, [primaryWallet])

  const router = useRouter()
  const handleStaking = async () => {
    if (!primaryWallet) {
      console.error('Wallet not available')
      return
    }

    const transaction = new SolanaTransactionService(
      primaryWallet as SolanaWallet
    )
    switch (selectedOption) {
      case 'Bonk':
        try {
          const signature = await transaction.createBonk(Number(amount))
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
          router.push('/get-start/match')
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
          const explorerTx = await transaction.createMemeDoge(Number(amount))
          Swal.fire({
            icon: 'success',
            title: 'Transaction success',
            html: `Your transaction is successful. <br> 
           <a href="${explorerTx}" target="_blank" style="color: #3085d6; text-decoration: underline;">
           View on Explorer
           </a>`,
            confirmButtonText: 'Confirm'
          })
          router.push('/get-start/match')
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
          const explorerTx = await transaction.createOPOZ(Number(amount))
          Swal.fire({
            icon: 'success',
            title: 'Transaction success',
            html: `Your transaction is successful. <br> 
             <a href="${explorerTx}" target="_blank" style="color: #3085d6; text-decoration: underline;">
             View on Explorer
             </a>`,
            confirmButtonText: 'Confirm'
          })
          router.push('/get-start/match')
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
          const explorerTx = await transaction.createOPOS(Number(amount))
          Swal.fire({
            icon: 'success',
            title: 'Transaction success',
            html: `Your transaction is successful. <br> 
               <a href="${explorerTx}" target="_blank" style="color: #3085d6; text-decoration: underline;">
               View on Explorer
               </a>`,
            confirmButtonText: 'Confirm'
          })
          router.push('/get-start/match')
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
          const explorerTx = await transaction.createPepe(Number(amount))
          Swal.fire({
            icon: 'success',
            title: 'Transaction success',
            html: `Your transaction is successful. <br> 
                 <a href="${explorerTx}" target="_blank" style="color: #3085d6; text-decoration: underline;">
                 View on Explorer
                 </a>`,
            confirmButtonText: 'Confirm'
          })
          router.push('/get-start/match')
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Transaction error',
            text: `${error}`,
            confirmButtonText: 'Confirm'
          })
        }
        break
    }
  }

  return (
    <div className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] p-6 md:p-8 lg:p-10 mb-16 bg-white shadow-lg rounded-2xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm md:text-base text-gray-500">
          Hi <br />
          {primaryWallet?.address ? formatAddress(primaryWallet.address) : ''}
        </span>
        <span className="text-2xl md:text-3xl lg:text-4xl">👋</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
        Let&apos;s Play
      </h1>

      {/* Info Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm border">
          <span className="text-yellow-400 text-2xl">🕹️</span>
          <div>
            <p className="font-bold text-lg text-gray-800">{chain}</p>
            <p className="text-sm text-gray-500">Current chain</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm border">
          <span className="text-yellow-400 text-2xl">🪙</span>
          <div>
            <p className="font-bold text-lg text-gray-800">{balance}</p>
            <p className="text-sm text-gray-500">Balance</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-8">
        <p className="text-xl md:text-2xl font-bold mb-4">How to play?</p>
        <ul className="space-y-3 text-gray-700">
          <li>1. Click Start!</li>
          <li>2. Select your token that you would like to stake.</li>
          <li>3. Enjoy your game.</li>
        </ul>
      </div>

      {/* Start Button */}
      <button
        onClick={toggleOpen}
        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-full font-medium text-lg hover:from-cyan-500 hover:to-blue-600 transition-transform transform hover:scale-105"
      >
        Start
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={toggleOpen}
        >
          <section
            className="bg-white text-gray-800 border-2 border-cyan-400 p-6 rounded-xl shadow-lg w-[90%] max-w-md transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <X
                onClick={toggleOpen}
                className="text-gray-400 hover:text-gray-600 cursor-pointer transition-transform transform hover:rotate-90 duration-300"
              />
            </div>
            <h2 className="text-lg font-bold mb-4">Let&rsquo;s start</h2>
            <p className="mb-4">
              Select staking token & Enter the amount you wish to stake.
            </p>

            {/* Token Select */}
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.currentTarget.value)}
              className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="Bonk">Bonk</option>
              <option value="MemeDoge">MemeDoge</option>
              <option value="OPOZ">OPOZ</option>
              <option value="OPOS">OPOS</option>
              <option value="Pepe">Pepe</option>
            </select>

            {/* Amount Input */}
            <input
              type="number"
              min={0}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-4 w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Amount"
            />

            {/* Confirm Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleStaking}
                className="bg-cyan-500 text-white py-2 px-6 rounded-md hover:bg-cyan-600 transition-transform transform hover:scale-105"
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
