import * as anchor from '@coral-xyz/anchor'
import { BN } from '@coral-xyz/anchor'
import TbwYaminogemuJson from '@/idl/tbw_yaminogemu.json'
import { TbwYaminogemu } from '@/idl/tbw_yaminogemu'
import {
  ISolana,
  isSolanaWallet,
  SolanaWallet
} from '@dynamic-labs/solana-core'
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction
} from '@solana/web3.js'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddressSync
} from '@solana/spl-token'

export class SolanaTransactionService {
  private mintBonk = new PublicKey(
    'Aqk2sTGwLuojdYSHDLCXgidGNUQeskWS2JbKXPksHdaG'
  )
  private mintBabyDoge = new PublicKey(
    '2gcSMoNpcVNrFdJJ9CqiMcP8HeszxisYiWsNdkDuMdDc'
  )
  private mintPepe = new PublicKey(
    'GLmfMYRAw5HEY4rS4DAxeyir8iUTqVcakmtgPvzwaDTd'
  )
  private mintOPOZ = new PublicKey(
    '7isYYx9nfsgW1xxDmDyhjw7jY7PS6jEr89y4G5iAPzNa'
  )
  private mintOPOS = new PublicKey(
    'C1tkdFaP7HjKevK28V1hPR2Rf6B2qMmgrt7LasAun8id'
  )
  private mintM = this.mintBabyDoge
  private mintT = this.mintPepe
  private tokenProgram = TOKEN_2022_PROGRAM_ID

  constructor(private primaryWallet: SolanaWallet | null) {
    if (!this.primaryWallet || !isSolanaWallet(this.primaryWallet)) {
      throw new Error('Primary wallet is not a valid Solana wallet.')
    }
  }

  private async getConnection(): Promise<Connection> {
    return await this.primaryWallet!.getConnection()
  }

  private async getSigner(): Promise<ISolana> {
    return await this.primaryWallet!.getSigner()
  }

  // Send SOL to another wallet
  public async sendTransaction(
    destinationAddress: string,
    amountSOL: number
  ): Promise<void> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const fromKey = new PublicKey(this.primaryWallet!.address)
    const toKey = new PublicKey(destinationAddress)
    const amountInLamports = amountSOL * 1e9

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKey,
        lamports: amountInLamports,
        toPubkey: toKey
      })
    )

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash
    transaction.feePayer = fromKey

    try {
      const { signature } = await signer.signAndSendTransaction(transaction)
      console.log(
        `Transaction successful: https://explorer.solana.com/tx/${signature}?cluster=devnet`
      )
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  // Deposit BONK tokens
  public async depositTransaction(amount: number): Promise<void> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )

    const ownerKey = new PublicKey(this.primaryWallet!.address)
    const ownership = PublicKey.findProgramAddressSync(
      [Buffer.from('tbw_yaminogemu')],
      tbwYaminogemuProgram.programId
    )[0]
    const ownershipBonk = getAssociatedTokenAddressSync(
      this.mintBonk,
      ownership,
      true,
      this.tokenProgram
    )
    const providerVault = PublicKey.findProgramAddressSync(
      [Buffer.from('vault'), ownerKey.toBuffer()],
      tbwYaminogemuProgram.programId
    )[0]
    const ownerAtaBonk = getAssociatedTokenAddressSync(
      this.mintBonk,
      ownerKey,
      false,
      this.tokenProgram
    )

    const instructions = await tbwYaminogemuProgram.methods
      .deposit(new BN(amount * 1e6))
      .accountsStrict({
        provider: ownerKey,
        providervault: providerVault,
        ownership,
        mintBonk: this.mintBonk,
        providerAtaBonk: ownerAtaBonk,
        ownershipBonk,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: this.tokenProgram,
        systemProgram: SystemProgram.programId
      })
      .instruction()

    const transaction = new Transaction().add(instructions)
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash
    transaction.feePayer = ownerKey

    try {
      const { signature } = await signer.signAndSendTransaction(transaction)
      console.log(
        `Transaction successful: https://explorer.solana.com/tx/${signature}?cluster=devnet`
      )
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  // Withdraw BONK tokens
  public async withdrawBonk(amount: number): Promise<void> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )

    const ownerKey = new PublicKey(this.primaryWallet!.address)
    const ownership = PublicKey.findProgramAddressSync(
      [Buffer.from('tbw_yaminogemu')],
      tbwYaminogemuProgram.programId
    )[0]
    const ownershipBonk = getAssociatedTokenAddressSync(
      this.mintBonk,
      ownership,
      true,
      this.tokenProgram
    )
    const providerVault = PublicKey.findProgramAddressSync(
      [Buffer.from('vault'), ownerKey.toBuffer()],
      tbwYaminogemuProgram.programId
    )[0]
    const [memeRatioBonk] = [this.mintBonk].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const ownerAtaBonk = getAssociatedTokenAddressSync(
      this.mintBonk,
      ownerKey,
      false,
      this.tokenProgram
    )

    const instructions = await tbwYaminogemuProgram.methods
      .withdraw(new BN(amount * 1e6))
      .accountsStrict({
        provider: ownerKey,
        providervault: providerVault,
        ownership,
        memeRatio: memeRatioBonk,
        mintMeme: this.mintBonk,
        providerAtaMeme: ownerAtaBonk,
        ownershipMeme: ownershipBonk,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: this.tokenProgram,
        systemProgram: SystemProgram.programId
      })
      .instruction()

    const transaction = new Transaction().add(instructions)
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash
    transaction.feePayer = ownerKey

    try {
      const { signature } = await signer.signAndSendTransaction(transaction)
      console.log(
        `Transaction successful: https://explorer.solana.com/tx/${signature}?cluster=devnet`
      )
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  // Withdraw MEMEDOGE tokens
  public async withdrawMemeDoge(amount: number): Promise<void> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )

    const ownerKey = new PublicKey(this.primaryWallet!.address)
    const ownership = PublicKey.findProgramAddressSync(
      [Buffer.from('tbw_yaminogemu')],
      tbwYaminogemuProgram.programId
    )[0]
    const ownershipM = getAssociatedTokenAddressSync(
      this.mintM,
      ownership,
      true,
      this.tokenProgram
    )
    const providerVault = PublicKey.findProgramAddressSync(
      [Buffer.from('vault'), ownerKey.toBuffer()],
      tbwYaminogemuProgram.programId
    )[0]
    const [memeRatioM] = [this.mintM].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const ownerAtaM = getAssociatedTokenAddressSync(
      this.mintM,
      ownerKey,
      false,
      this.tokenProgram
    )

    const instructions = await tbwYaminogemuProgram.methods
      .withdraw(new BN(amount * 1e6))
      .accountsStrict({
        provider: ownerKey,
        providervault: providerVault,
        ownership,
        memeRatio: memeRatioM,
        mintMeme: this.mintM,
        providerAtaMeme: ownerAtaM,
        ownershipMeme: ownershipM,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: this.tokenProgram,
        systemProgram: SystemProgram.programId
      })
      .instruction()

    const transaction = new Transaction().add(instructions)
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash
    transaction.feePayer = ownerKey

    try {
      const { signature } = await signer.signAndSendTransaction(transaction)
      console.log(
        `Transaction successful: https://explorer.solana.com/tx/${signature}?cluster=devnet`
      )
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  // Withdraw OPOZ tokens
  public async withdrawOPOZ(amount: number): Promise<void> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )

    const ownerKey = new PublicKey(this.primaryWallet!.address)
    const ownership = PublicKey.findProgramAddressSync(
      [Buffer.from('tbw_yaminogemu')],
      tbwYaminogemuProgram.programId
    )[0]
    const ownershipOPOZ = getAssociatedTokenAddressSync(
      this.mintOPOZ,
      ownership,
      true,
      this.tokenProgram
    )
    const providerVault = PublicKey.findProgramAddressSync(
      [Buffer.from('vault'), ownerKey.toBuffer()],
      tbwYaminogemuProgram.programId
    )[0]
    const [memeRatioOPOZ] = [this.mintOPOZ].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const ownerAtaOPOZ = getAssociatedTokenAddressSync(
      this.mintOPOZ,
      ownerKey,
      false,
      this.tokenProgram
    )

    const instructions = await tbwYaminogemuProgram.methods
      .withdraw(new BN(amount * 1e6))
      .accountsStrict({
        provider: ownerKey,
        providervault: providerVault,
        ownership,
        memeRatio: memeRatioOPOZ,
        mintMeme: this.mintOPOZ,
        providerAtaMeme: ownerAtaOPOZ,
        ownershipMeme: ownershipOPOZ,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: this.tokenProgram,
        systemProgram: SystemProgram.programId
      })
      .instruction()

    const transaction = new Transaction().add(instructions)
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash
    transaction.feePayer = ownerKey

    try {
      const { signature } = await signer.signAndSendTransaction(transaction)
      console.log(
        `Transaction successful: https://explorer.solana.com/tx/${signature}?cluster=devnet`
      )
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  // Withdraw OPOZ tokens
  public async withdrawOPOS(amount: number): Promise<void> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )

    const ownerKey = new PublicKey(this.primaryWallet!.address)
    const ownership = PublicKey.findProgramAddressSync(
      [Buffer.from('tbw_yaminogemu')],
      tbwYaminogemuProgram.programId
    )[0]
    const ownershipOPOS = getAssociatedTokenAddressSync(
      this.mintOPOS,
      ownership,
      true,
      this.tokenProgram
    )
    const providerVault = PublicKey.findProgramAddressSync(
      [Buffer.from('vault'), ownerKey.toBuffer()],
      tbwYaminogemuProgram.programId
    )[0]
    const [memeRatioOPOS] = [this.mintOPOS].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const ownerAtaOPOS = getAssociatedTokenAddressSync(
      this.mintOPOS,
      ownerKey,
      false,
      this.tokenProgram
    )

    const instructions = await tbwYaminogemuProgram.methods
      .withdraw(new BN(amount * 1e6))
      .accountsStrict({
        provider: ownerKey,
        providervault: providerVault,
        ownership,
        memeRatio: memeRatioOPOS,
        mintMeme: this.mintOPOS,
        providerAtaMeme: ownerAtaOPOS,
        ownershipMeme: ownershipOPOS,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: this.tokenProgram,
        systemProgram: SystemProgram.programId
      })
      .instruction()

    const transaction = new Transaction().add(instructions)
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash
    transaction.feePayer = ownerKey

    try {
      const { signature } = await signer.signAndSendTransaction(transaction)
      console.log(
        `Transaction successful: https://explorer.solana.com/tx/${signature}?cluster=devnet`
      )
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  // Withdraw OPOZ tokens
  public async withdrawPepe(amount: number): Promise<void> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )

    const ownerKey = new PublicKey(this.primaryWallet!.address)
    const ownership = PublicKey.findProgramAddressSync(
      [Buffer.from('tbw_yaminogemu')],
      tbwYaminogemuProgram.programId
    )[0]
    const ownershipPepe = getAssociatedTokenAddressSync(
      this.mintPepe,
      ownership,
      true,
      this.tokenProgram
    )
    const providerVault = PublicKey.findProgramAddressSync(
      [Buffer.from('vault'), ownerKey.toBuffer()],
      tbwYaminogemuProgram.programId
    )[0]
    const [memeRatioT] = [this.mintT].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const ownerAtaPepe = getAssociatedTokenAddressSync(
      this.mintT,
      ownerKey,
      false,
      this.tokenProgram
    )

    const instructions = await tbwYaminogemuProgram.methods
      .withdraw(new BN(amount * 1e6))
      .accountsStrict({
        provider: ownerKey,
        providervault: providerVault,
        ownership,
        memeRatio: memeRatioT,
        mintMeme: this.mintT,
        providerAtaMeme: ownerAtaPepe,
        ownershipMeme: ownershipPepe,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: this.tokenProgram,
        systemProgram: SystemProgram.programId
      })
      .instruction()

    const transaction = new Transaction().add(instructions)
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash
    transaction.feePayer = ownerKey

    try {
      const { signature } = await signer.signAndSendTransaction(transaction)
      console.log(
        `Transaction successful: https://explorer.solana.com/tx/${signature}?cluster=devnet`
      )
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }
}
