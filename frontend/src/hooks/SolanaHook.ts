import * as anchor from '@coral-xyz/anchor'
import { Program, BN } from '@coral-xyz/anchor'
import TbwYaminogemuJson from '@/idl/tbw_yaminogemu.json'
import { type TbwYaminogemu } from '@/idl/tbw_yaminogemu'
import { Wallet } from '@dynamic-labs/sdk-react-core'
import { ISolana, isSolanaWallet } from '@dynamic-labs/solana-core'
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction
} from '@solana/web3.js'
import {
  ExtensionType,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  MINT_SIZE,
  MetadataPointerInstruction,
  TOKEN_2022_PROGRAM_ID,
  getMintLen,
  createAssociatedTokenAccountIdempotentInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  TYPE_SIZE,
  LENGTH_SIZE
} from '@solana/spl-token'
const mintOPOZ = new PublicKey('7isYYx9nfsgW1xxDmDyhjw7jY7PS6jEr89y4G5iAPzNa')
const mintOPOS = new PublicKey('C1tkdFaP7HjKevK28V1hPR2Rf6B2qMmgrt7LasAun8id')
const mintPepe = new PublicKey('GLmfMYRAw5HEY4rS4DAxeyir8iUTqVcakmtgPvzwaDTd')
const mintBabyDoge = new PublicKey(
  '2gcSMoNpcVNrFdJJ9CqiMcP8HeszxisYiWsNdkDuMdDc'
)
const mintBonk = new PublicKey('Aqk2sTGwLuojdYSHDLCXgidGNUQeskWS2JbKXPksHdaG')

// send 0.01 sol to destination address
export async function SendTransaction(
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

export async function DepositTransaction(
  primaryWallet: Wallet | null,
  amount: number
) {
  if (!primaryWallet || !isSolanaWallet(primaryWallet)) {
    console.error('Primary wallet is not a Solana wallet')
    return
  }
  const tokenProgram = TOKEN_2022_PROGRAM_ID

  const connection: Connection = await primaryWallet.getConnection()
  const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
    TbwYaminogemuJson as TbwYaminogemu,
    { connection }
  )
  const signer: ISolana = await primaryWallet.getSigner()

  const ownerkey = new PublicKey(primaryWallet.address)
  const ownership = PublicKey.findProgramAddressSync(
    [Buffer.from('tbw_yaminogemu')],
    tbwYaminogemuProgram.programId
  )[0]
  const ownershipBonk = getAssociatedTokenAddressSync(
    mintBonk,
    ownership,
    true,
    tokenProgram
  )
  const providervault = PublicKey.findProgramAddressSync(
    [Buffer.from('vault'), ownerkey.toBuffer()],
    tbwYaminogemuProgram.programId
  )[0]
  const ownerAtaBonk = getAssociatedTokenAddressSync(
    mintBonk,
    ownerkey,
    false,
    tokenProgram
  )
  // For a legacy transaction:
  const instructions = await tbwYaminogemuProgram.methods
    .deposit(new BN(amount * 1e6))
    .accountsStrict({
      provider: ownerkey,
      providervault,
      ownership,
      mintBonk: mintBonk,
      providerAtaBonk: ownerAtaBonk,
      ownershipBonk,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenProgram,
      systemProgram: SystemProgram.programId
    })
    .instruction()
  const transaction = new Transaction().add(instructions)
  const blockhash = await connection.getLatestBlockhash()
  transaction.recentBlockhash = blockhash.blockhash
  transaction.feePayer = ownerkey
  try {
    const { signature } = await signer.signAndSendTransaction(transaction)
    console.log(
      `Transaction successful: https://solscan.io/tx/${signature}?cluster=devnet`
    )
  } catch (error) {
    console.error('Transaction failed:', error)
  }
}

export async function useWriteContract() {}

export async function useReadContract() {}
