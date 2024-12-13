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
import { randomBytes } from 'crypto'
import { AnchorAirdropEscrow } from '@/idl/anchor_airdrop_escrow'
import AnchorAirdropEscrowJSON from '@/idl/anchor_airdrop_escrow.json'

export class SolanaTransactionService {
  private mintBonk = new PublicKey(
    'Aqk2sTGwLuojdYSHDLCXgidGNUQeskWS2JbKXPksHdaG'
  )
  private mintMemeDoge = new PublicKey(
    'GLmfMYRAw5HEY4rS4DAxeyir8iUTqVcakmtgPvzwaDTd'
  )
  private mintPepe = new PublicKey(
    '2gcSMoNpcVNrFdJJ9CqiMcP8HeszxisYiWsNdkDuMdDc'
  )
  private mintOPOZ = new PublicKey(
    '7isYYx9nfsgW1xxDmDyhjw7jY7PS6jEr89y4G5iAPzNa'
  )
  private mintOPOS = new PublicKey(
    'C1tkdFaP7HjKevK28V1hPR2Rf6B2qMmgrt7LasAun8id'
  )
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
  ): Promise<string> {
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
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  // Deposit BONK tokens
  public async depositTransaction(amount: number): Promise<string> {
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
      return signature
    } catch (error) {
      throw error
    }
  }

  // Withdraw BONK tokens
  public async withdrawBonk(amount: number): Promise<string> {
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
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  // Withdraw MEMEDOGE tokens
  public async withdrawMemeDoge(amount: number): Promise<string> {
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
    const ownershipMemeDoge = getAssociatedTokenAddressSync(
      this.mintMemeDoge,
      ownership,
      true,
      this.tokenProgram
    )
    const providerVault = PublicKey.findProgramAddressSync(
      [Buffer.from('vault'), ownerKey.toBuffer()],
      tbwYaminogemuProgram.programId
    )[0]
    const [memeRatioMemeDoge] = [this.mintMemeDoge].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const ownerAtaM = getAssociatedTokenAddressSync(
      this.mintMemeDoge,
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
        memeRatio: memeRatioMemeDoge,
        mintMeme: this.mintMemeDoge,
        providerAtaMeme: ownerAtaM,
        ownershipMeme: ownershipMemeDoge,
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
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  // Withdraw OPOZ tokens
  public async withdrawOPOZ(amount: number): Promise<string> {
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
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  // Withdraw OPOZ tokens
  public async withdrawOPOS(amount: number): Promise<string> {
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
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  // Withdraw OPOZ tokens
  public async withdrawPepe(amount: number): Promise<string> {
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
    const [memeRatioPepe] = [this.mintPepe].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const ownerAtaPepe = getAssociatedTokenAddressSync(
      this.mintPepe,
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
        memeRatio: memeRatioPepe,
        mintMeme: this.mintPepe,
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
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  // create function (user staking token then can play game.)
  public async createBonk(amount: number): Promise<string> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )
    const task_id = new BN(randomBytes(8))
    const ownerKey = new PublicKey(this.primaryWallet!.address)

    const [makerAtaBonk] = [ownerKey]
      .map((a) =>
        [this.mintBonk].map((m) =>
          getAssociatedTokenAddressSync(m, a, false, this.tokenProgram)
        )
      )
      .flat()
    const [memeRatioBonk] = [this.mintBonk].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const escrow = PublicKey.findProgramAddressSync(
      [
        Buffer.from('escrow'),
        ownerKey.toBuffer(),
        task_id.toArrayLike(Buffer, 'le', 8)
      ],
      tbwYaminogemuProgram.programId
    )[0]
    const vaultBonk = getAssociatedTokenAddressSync(
      this.mintBonk,
      escrow,
      true,
      this.tokenProgram
    )

    const instructions = await tbwYaminogemuProgram.methods
      .create(task_id, new BN(amount * 1e6))
      .accountsStrict({
        maker: ownerKey,
        mintM: this.mintBonk,
        makerAtaM: makerAtaBonk,
        memeRatio: memeRatioBonk,
        escrow,
        vaultM: vaultBonk,
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
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  // create function (user staking token then can play game.)
  public async createMemeDoge(amount: number): Promise<string> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )
    const task_id = new BN(randomBytes(8))
    const ownerKey = new PublicKey(this.primaryWallet!.address)

    const [makerAtaMemeDoge] = [ownerKey]
      .map((a) =>
        [this.mintMemeDoge].map((m) =>
          getAssociatedTokenAddressSync(m, a, false, this.tokenProgram)
        )
      )
      .flat()
    const [memeRatioMemeDoge] = [this.mintMemeDoge].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const escrow = PublicKey.findProgramAddressSync(
      [
        Buffer.from('escrow'),
        ownerKey.toBuffer(),
        task_id.toArrayLike(Buffer, 'le', 8)
      ],
      tbwYaminogemuProgram.programId
    )[0]
    const vaultMemeDoge = getAssociatedTokenAddressSync(
      this.mintMemeDoge,
      escrow,
      true,
      this.tokenProgram
    )

    const instructions = await tbwYaminogemuProgram.methods
      .create(task_id, new BN(amount * 1e6))
      .accountsStrict({
        maker: ownerKey,
        mintM: this.mintMemeDoge,
        makerAtaM: makerAtaMemeDoge,
        memeRatio: memeRatioMemeDoge,
        escrow,
        vaultM: vaultMemeDoge,
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
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  // create function (user staking token then can play game.)
  public async createOPOZ(amount: number): Promise<string> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )
    const task_id = new BN(randomBytes(8))
    const ownerKey = new PublicKey(this.primaryWallet!.address)

    const [makerAtaOPOZ] = [ownerKey]
      .map((a) =>
        [this.mintOPOZ].map((m) =>
          getAssociatedTokenAddressSync(m, a, false, this.tokenProgram)
        )
      )
      .flat()
    const [memeRatioOPOZ] = [this.mintOPOZ].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const escrow = PublicKey.findProgramAddressSync(
      [
        Buffer.from('escrow'),
        ownerKey.toBuffer(),
        task_id.toArrayLike(Buffer, 'le', 8)
      ],
      tbwYaminogemuProgram.programId
    )[0]
    const vaultOPOZ = getAssociatedTokenAddressSync(
      this.mintOPOZ,
      escrow,
      true,
      this.tokenProgram
    )

    const instructions = await tbwYaminogemuProgram.methods
      .create(task_id, new BN(amount * 1e6))
      .accountsStrict({
        maker: ownerKey,
        mintM: this.mintOPOZ,
        makerAtaM: makerAtaOPOZ,
        memeRatio: memeRatioOPOZ,
        escrow,
        vaultM: vaultOPOZ,
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
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  // create function (user staking token then can play game.)
  public async createOPOS(amount: number): Promise<string> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )
    const task_id = new BN(randomBytes(8))
    const ownerKey = new PublicKey(this.primaryWallet!.address)

    const [makerAtaOPOS] = [ownerKey]
      .map((a) =>
        [this.mintOPOS].map((m) =>
          getAssociatedTokenAddressSync(m, a, false, this.tokenProgram)
        )
      )
      .flat()
    const [memeRatioOPOS] = [this.mintOPOS].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const escrow = PublicKey.findProgramAddressSync(
      [
        Buffer.from('escrow'),
        ownerKey.toBuffer(),
        task_id.toArrayLike(Buffer, 'le', 8)
      ],
      tbwYaminogemuProgram.programId
    )[0]
    const vaultOPOS = getAssociatedTokenAddressSync(
      this.mintOPOS,
      escrow,
      true,
      this.tokenProgram
    )

    const instructions = await tbwYaminogemuProgram.methods
      .create(task_id, new BN(amount * 1e6))
      .accountsStrict({
        maker: ownerKey,
        mintM: this.mintOPOS,
        makerAtaM: makerAtaOPOS,
        memeRatio: memeRatioOPOS,
        escrow,
        vaultM: vaultOPOS,
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
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  // create function (user staking token then can play game.)
  public async createPepe(amount: number): Promise<string> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )
    const task_id = new BN(randomBytes(8))
    const ownerKey = new PublicKey(this.primaryWallet!.address)

    const [makerAtaPepe] = [ownerKey]
      .map((a) =>
        [this.mintPepe].map((m) =>
          getAssociatedTokenAddressSync(m, a, false, this.tokenProgram)
        )
      )
      .flat()
    const [memeRatioPepe] = [this.mintPepe].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const escrow = PublicKey.findProgramAddressSync(
      [
        Buffer.from('escrow'),
        ownerKey.toBuffer(),
        task_id.toArrayLike(Buffer, 'le', 8)
      ],
      tbwYaminogemuProgram.programId
    )[0]
    const vaultPepe = getAssociatedTokenAddressSync(
      this.mintPepe,
      escrow,
      true,
      this.tokenProgram
    )

    const instructions = await tbwYaminogemuProgram.methods
      .create(task_id, new BN(amount * 1e6))
      .accountsStrict({
        maker: ownerKey,
        mintM: this.mintPepe,
        makerAtaM: makerAtaPepe,
        memeRatio: memeRatioPepe,
        escrow,
        vaultM: vaultPepe,
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
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  // match found and connect two player
  public async Take(): Promise<string> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )
    const task_id = new BN(randomBytes(8))
    const ownerKey = new PublicKey(this.primaryWallet!.address)

    const [makerAtaBonk] = [ownerKey]
      .map((a) =>
        [this.mintBonk].map((m) =>
          getAssociatedTokenAddressSync(m, a, false, this.tokenProgram)
        )
      )
      .flat()
    const [memeRatioBonk] = [this.mintBonk].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const escrow = PublicKey.findProgramAddressSync(
      [
        Buffer.from('escrow'),
        ownerKey.toBuffer(),
        task_id.toArrayLike(Buffer, 'le', 8)
      ],
      tbwYaminogemuProgram.programId
    )[0]
    const vaultBonk = getAssociatedTokenAddressSync(
      this.mintBonk,
      escrow,
      true,
      this.tokenProgram
    )
    const instructions = await tbwYaminogemuProgram.methods
      .take()
      .accountsStrict({
        taker: 'new PublicKey(solana address)', // 對手address
        maker: ownerKey, // owner address
        mintMeme: this.mintBonk,
        takerAtaT: makerAtaBonk,
        memeRatio: memeRatioBonk,
        escrow,
        vaultT: vaultBonk,
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
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  // game winner claim rewards
  public async CliamRewards(): Promise<string> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()

    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )
    const task_id = new BN(randomBytes(8))
    const ownerKey = new PublicKey(this.primaryWallet!.address)

    const [makerAtaBonk] = [ownerKey]
      .map((a) =>
        [this.mintBonk].map((m) =>
          getAssociatedTokenAddressSync(m, a, false, this.tokenProgram)
        )
      )
      .flat()
    const [memeRatioBonk] = [this.mintBonk].map(
      (a) =>
        PublicKey.findProgramAddressSync(
          [Buffer.from('meme'), a.toBuffer()],
          tbwYaminogemuProgram.programId
        )[0]
    )
    const escrow = PublicKey.findProgramAddressSync(
      [
        Buffer.from('escrow'),
        ownerKey.toBuffer(),
        task_id.toArrayLike(Buffer, 'le', 8)
      ],
      tbwYaminogemuProgram.programId
    )[0]
    const ownership = PublicKey.findProgramAddressSync(
      [Buffer.from('tbw_yaminogemu')],
      tbwYaminogemuProgram.programId
    )[0]
    const vaultBonk = getAssociatedTokenAddressSync(
      this.mintBonk,
      escrow,
      true,
      this.tokenProgram
    )
    const ownershipBonk = getAssociatedTokenAddressSync(
      this.mintBonk,
      ownership,
      true,
      this.tokenProgram
    )

    const instructions = await tbwYaminogemuProgram.methods
      .winnerClaim()
      .accountsStrict({
        winner: 'winner publicKey',
        maker: ownerKey,
        owner: ownerKey,
        mintBonk: this.mintBonk,
        mintMeme: this.mintBonk,
        mintWin: this.mintBonk,
        ownership,
        memeRatio: memeRatioBonk,
        escrow,
        winnerAtaWin: makerAtaBonk,
        winnerAtaBonk: makerAtaBonk,
        vaultWin: vaultBonk,
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
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  public async Balance(tokenName: string): Promise<string> {
    const connection = await this.getConnection()
    const tbwYaminogemuProgram = new anchor.Program<TbwYaminogemu>(
      TbwYaminogemuJson as TbwYaminogemu,
      { connection }
    )
    const ownership = PublicKey.findProgramAddressSync(
      [Buffer.from('tbw_yaminogemu')],
      tbwYaminogemuProgram.programId
    )[0]
    switch (tokenName) {
      case 'Bonk':
        const ownershipBonk = getAssociatedTokenAddressSync(
          this.mintBonk,
          ownership,
          true,
          this.tokenProgram,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
        const info = await connection.getTokenAccountBalance(ownershipBonk)
        if (info.value.uiAmount == null) return '0'
        // console.log(`${tokenName} Balance (using Solana-Web3.js): `, info.value.uiAmount)
        return info.value.uiAmount.toString()
      case 'MemeDoge':
        const ownershipMemeDoge = getAssociatedTokenAddressSync(
          this.mintMemeDoge,
          ownership,
          true,
          this.tokenProgram
        )
        const info2 = await connection.getTokenAccountBalance(ownershipMemeDoge)
        if (info2.value.uiAmount == null) return '0'
        // console.log(`${tokenName} Balance (using Solana-Web3.js): `, info2.value.uiAmount)
        return info2.value.uiAmount.toString()
      case 'OPOZ':
        const ownershipOPOZ = getAssociatedTokenAddressSync(
          this.mintOPOZ,
          ownership,
          true,
          this.tokenProgram
        )
        const info3 = await connection.getTokenAccountBalance(ownershipOPOZ)
        if (info3.value.uiAmount == null) return '0'
        // console.log(`${tokenName} Balance (using Solana-Web3.js): `, info3.value.uiAmount)
        return info3.value.uiAmount.toString()
      case 'OPOS':
        const ownershipOPOS = getAssociatedTokenAddressSync(
          this.mintOPOS,
          ownership,
          true,
          this.tokenProgram
        )
        const info4 = await connection.getTokenAccountBalance(ownershipOPOS)
        if (info4.value.uiAmount == null) return '0'
        // console.log(`${tokenName} Balance (using Solana-Web3.js): `, info4.value.uiAmount)
        return info4.value.uiAmount.toString()
      case 'Pepe':
        const ownershipPepe = getAssociatedTokenAddressSync(
          this.mintPepe,
          ownership,
          true,
          this.tokenProgram
        )
        const info5 = await connection.getTokenAccountBalance(ownershipPepe)
        if (info5.value.uiAmount == null) return '0'
        // console.log(`${tokenName} Balance (using Solana-Web3.js): `, info5.value.uiAmount)
        return info5.value.uiAmount.toString()
      default:
        return '0'
    }
  }

   // Airdrop tokens
   public async airdropToken(): Promise<string> {
    const connection = await this.getConnection()
    const signer = await this.getSigner()
    const tokens = [
      {
        mintPublicKey: 'Aqk2sTGwLuojdYSHDLCXgidGNUQeskWS2JbKXPksHdaG',
        escrowPublicKey: 'GSpuFKexnLiDoU5J29ZK5NK9TDtBiMwHSV33U4fb2Lza'
      },
      {
        mintPublicKey: 'GLmfMYRAw5HEY4rS4DAxeyir8iUTqVcakmtgPvzwaDTd',
        escrowPublicKey: '3YBD6r9jSRQR4gWjxQK8KmvCrcqFQ9cf9pqd1yuc8JBE'
      },
      {
        mintPublicKey: '2gcSMoNpcVNrFdJJ9CqiMcP8HeszxisYiWsNdkDuMdDc',
        escrowPublicKey: '5rkChpTZr38AQ2N4mQkwLDo2hKWAErH4g4z1yudLeFsx'
      },
      {
        mintPublicKey: '7isYYx9nfsgW1xxDmDyhjw7jY7PS6jEr89y4G5iAPzNa',
        escrowPublicKey: '4xs2GfdrXE4Qfh7ZZ8HbHX7KbfTym5jsZhMnine4ZiqY'
      },
      {
        mintPublicKey: 'C1tkdFaP7HjKevK28V1hPR2Rf6B2qMmgrt7LasAun8id',
        escrowPublicKey: 'GyaScCp1Y1MrzTFU4mb49wy4S4FULPJ3z7rGQwmv8WxS'
      }
    ]
    const anchorAirdropEscrowProgram = new anchor.Program<AnchorAirdropEscrow>(
      AnchorAirdropEscrowJSON as AnchorAirdropEscrow,
      { connection }
    )
    const transaction = new Transaction()
    const ownerKey = new PublicKey(this.primaryWallet!.address)
    for (const token of tokens) {
      const mint = new PublicKey(token.mintPublicKey)
      const escrow = new PublicKey(token.escrowPublicKey)
      const claimerAta = getAssociatedTokenAddressSync(
        mint,
        ownerKey,
        false,
        TOKEN_2022_PROGRAM_ID
      )
      const vault = getAssociatedTokenAddressSync(
        mint,
        escrow,
        true,
        TOKEN_2022_PROGRAM_ID
      )
      const frens = PublicKey.findProgramAddressSync(
        [Buffer.from('frens'), ownerKey.toBuffer(), escrow.toBuffer()],
        anchorAirdropEscrowProgram.programId
      )[0]
    
      const instructions = await anchorAirdropEscrowProgram.methods
        .claim()
        .accountsStrict({
          claimer: ownerKey,
          mint,
          claimerAta,
          escrow,
          frens,
          vault,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .instruction()
    
      transaction.add(instructions)
    }

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash
    transaction.feePayer = ownerKey

    try {
      const { signature } = await signer.signAndSendTransaction(transaction)
      return signature
    } catch (error) {
      throw new Error(`Transaction failed: ${error}`)
    }
  }
}
