import { Wallet } from '@dynamic-labs/sdk-react-core'
import { ISolana, isSolanaWallet } from '@dynamic-labs/solana-core'
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction
} from '@solana/web3.js'

// send 0.01 sol to destination address
export async function handleSendTransaction(
  primaryWallet: Wallet | null,
  DestinationAddress: string
) {
  if (!primaryWallet || !isSolanaWallet(primaryWallet)) {
    console.error('Primary wallet is not a Solana wallet')
    return
  }
  const connection: Connection = await primaryWallet.getConnection()
  const signer: ISolana = await primaryWallet.getSigner()

  const fromKey = new PublicKey(primaryWallet.address)
  const toKey = new PublicKey(DestinationAddress) // Destination wallet address
  const amountInLamports = 0.01 * 1000000000 // 0.01 SOL

  // For a legacy transaction:
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKey,
      lamports: amountInLamports,
      toPubkey: toKey
    })
  )
  const blockhash = await connection.getLatestBlockhash()
  transaction.recentBlockhash = blockhash.blockhash
  transaction.feePayer = fromKey

  // For a versioned transaction:
  // const instructions = [
  //   SystemProgram.transfer({
  //     fromPubkey: fromKey,
  //     lamports: amountInLamports,
  //     toPubkey: toKey,
  //   }),
  // ];
  // const messageV0 = new TransactionMessage({
  //   instructions,
  //   payerKey: fromKey,
  //   recentBlockhash: blockhash.blockhash,
  // }).compileToV0Message();
  // const transaction = new VersionedTransaction(messageV0);

  try {
    const { signature } = await signer.signAndSendTransaction(transaction)
    console.log(
      `Transaction successful: https://solscan.io/tx/${signature}?cluster=devnet`
    )
  } catch (error) {
    console.error('Transaction failed:', error)
  }
}
