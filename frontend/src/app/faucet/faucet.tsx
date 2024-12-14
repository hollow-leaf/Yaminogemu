'use client'
import React from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { SolanaTransactionService } from '@/hooks/solanahook';
import { SolanaWallet } from '@dynamic-labs/solana-core';
import Swal from 'sweetalert2';

export default function FaucetPage() {
  const { primaryWallet } = useDynamicContext();

  const handleAirdrop = async () => {
    if (!primaryWallet) {
      Swal.fire({
        icon: 'error',
        title: 'No Wallet Found',
        text: 'Please connect your wallet to claim tokens.',
        confirmButtonText: 'OK',
      });
      return;
    }

    const transaction = new SolanaTransactionService(primaryWallet as SolanaWallet);

    try {
      const signature = await transaction.airdropToken();
      const explorerTx = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;

      Swal.fire({
        icon: 'success',
        title: 'Transaction Successful',
        html: `Your transaction was successful!<br>
          <a href="${explorerTx}" target="_blank" style="color: #3085d6; text-decoration: underline;">
          View on Explorer
          </a>`,
        confirmButtonText: 'Confirm',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Transaction Error',
        text: `An error occurred: ${error}`,
        confirmButtonText: 'Retry',
      });
    }
  };

  const tokenNames = ['Bonk', 'MemeDoge', 'OPOZ', 'OPOS', 'Pepe'];

  return (
    <div className="w-full min-h-screen px-6 py-10 bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">💎 Meme Faucet</h1>
        <p className="mt-2 text-lg text-gray-400">Claim your favorite meme tokens instantly!</p>
      </header>

      {/* Token List Section */}
      <section className="space-y-6">
        {tokenNames.map((token, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg shadow-md bg-gray-800 transition-transform hover:scale-105 hover:bg-gray-700"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-cyan-400">{token}</span>
            </div>
          </div>
        ))}

        {/* Claim Button */}
        <button
          onClick={handleAirdrop}
          className="w-full mt-4 py-3 text-lg font-medium text-white bg-cyan-500 rounded-full transition-transform hover:scale-105 hover:bg-cyan-600"
        >
          Claim Tokens
        </button>
      </section>
    </div>
  );
}
