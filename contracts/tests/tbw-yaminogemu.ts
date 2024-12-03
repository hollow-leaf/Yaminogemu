import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { TbwYaminogemu } from "../target/types/tbw_yaminogemu";

import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  MINT_SIZE,
  TOKEN_2022_PROGRAM_ID,
  createAssociatedTokenAccountIdempotentInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import { randomBytes } from "crypto";

describe("tbw_yaminogemu", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const provider = anchor.getProvider();

  const connection = provider.connection;

  const program = anchor.workspace.TbwYaminogemu as Program<TbwYaminogemu>;

  const tokenProgram = TOKEN_2022_PROGRAM_ID;

  const confirm = async (signature: string): Promise<string> => {
    const block = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      signature,
      ...block,
    });
    return signature;
  };

  const log = async (signature: string): Promise<string> => {
    console.log(
      `Your transaction signature: https://explorer.solana.com/transaction/${signature}?cluster=devnet`
    );
    return signature;
  };

  const task_id = new BN(randomBytes(8));

  const [maker, taker, owner, mintM, mintT, mintBonk] = Array.from({ length: 6 }, () =>
    Keypair.generate()
  );

  const [makerAtaM, makerAtaT, makerAtaBonk, takerAtaM, takerAtaT, takerAtaBonk, ownerAtaM, ownerAtaT, ownerAtaBonk] = [maker, taker, owner]
    .map((a) =>
      [mintM, mintT, mintBonk].map((m) =>
        getAssociatedTokenAddressSync(m.publicKey, a.publicKey, false, tokenProgram)
      )
    )
    .flat();
  
  

  const escrow = PublicKey.findProgramAddressSync(
    [Buffer.from("escrow"), maker.publicKey.toBuffer(), task_id.toArrayLike(Buffer, "le", 8)],
    program.programId
  )[0];

  const ownership = PublicKey.findProgramAddressSync(
    [Buffer.from("tbw_yaminogemu")],
    program.programId
  )[0];

  const memeRatioA = PublicKey.findProgramAddressSync(
    [Buffer.from("meme"), mintM.publicKey.toBuffer()],
    program.programId
  )[0];

  const memeRatioB = PublicKey.findProgramAddressSync(
    [Buffer.from("meme"), mintT.publicKey.toBuffer()],
    program.programId
  )[0];

  const vaultM = getAssociatedTokenAddressSync(mintM.publicKey, escrow, true, tokenProgram);
  const vaultT = getAssociatedTokenAddressSync(mintT.publicKey, escrow, true, tokenProgram);
  const ownershipBonk = getAssociatedTokenAddressSync(mintBonk.publicKey, ownership, true, tokenProgram);

  it("Airdrop and create mints", async () => {
    let lamports = await getMinimumBalanceForRentExemptMint(connection);
    let tx = new Transaction();
    tx.instructions = [
      ...[maker, taker, owner].map((account) =>
        SystemProgram.transfer({
          fromPubkey: provider.publicKey,
          toPubkey: account.publicKey,
          lamports: 0.04 * LAMPORTS_PER_SOL,
        })
      ),
      ...[mintM, mintT].map((mint) =>
        SystemProgram.createAccount({
          fromPubkey: provider.publicKey,
          newAccountPubkey: mint.publicKey,
          lamports,
          space: MINT_SIZE,
          programId: tokenProgram,
        })
      ),
      ...[
        { mint: mintM.publicKey, authority: maker.publicKey, ata: makerAtaM },
        { mint: mintT.publicKey, authority: taker.publicKey, ata: takerAtaT },
      ]
      .flatMap((x) => [
        createInitializeMint2Instruction(x.mint, 6, x.authority, null, tokenProgram),
        createAssociatedTokenAccountIdempotentInstruction(provider.publicKey, x.ata, x.authority, x.mint, tokenProgram),
        createMintToInstruction(x.mint, x.ata, x.authority, 3e9, undefined, tokenProgram),
      ])
    ];

    await provider.sendAndConfirm(tx, [mintM, mintT, maker, taker]).then(log);
  });

  it("Airdrop Bonk", async () => {
    let lamports = await getMinimumBalanceForRentExemptMint(connection);
    let tx = new Transaction();
    tx.instructions = [
      SystemProgram.createAccount({
        fromPubkey: provider.publicKey,
        newAccountPubkey: mintBonk.publicKey,
        lamports,
        space: MINT_SIZE,
        programId: tokenProgram,
      }),
      createInitializeMint2Instruction(mintBonk.publicKey, 6, owner.publicKey, null, tokenProgram),
      createAssociatedTokenAccountIdempotentInstruction(provider.publicKey,  ownerAtaBonk, owner.publicKey, mintBonk.publicKey, tokenProgram),
      createMintToInstruction(mintBonk.publicKey, ownerAtaBonk, owner.publicKey, 10e9, undefined, tokenProgram),
    ];

    await provider.sendAndConfirm(tx, [mintBonk, owner]).then(log);
  });

  it("Init", async () => {
    await program.methods
      .init()
      .accountsStrict({
        owner: owner.publicKey,
        ownership,
        mintBonk: mintBonk.publicKey,
        ownerAtaBonk: ownerAtaBonk,
        ownershipBonk,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("Set Ratio", async () => {
    await program.methods
      .setRatio(new BN(64))
      .accountsStrict({
        owner: owner.publicKey,
        ownership,
        mintBonk: mintBonk.publicKey,
        ownerAtaBonk: ownerAtaBonk,
        ownershipBonk,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("Deposit", async () => {
    await program.methods
      .deposit(new BN(1e10))
      .accountsStrict({
        owner: owner.publicKey,
        ownership,
        mintBonk: mintBonk.publicKey,
        ownerAtaBonk: ownerAtaBonk,
        ownershipBonk,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("Withdraw", async () => {
    await program.methods
      .withdraw(new BN(1e8))
      .accountsStrict({
        owner: owner.publicKey,
        ownership,
        mintBonk: mintBonk.publicKey,
        ownerAtaBonk: ownerAtaBonk,
        ownershipBonk,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("Add", async () => {
    await program.methods
      .add(new BN(3))
      .accountsStrict({
        owner: owner.publicKey,
        mintMeme: mintM.publicKey,
        ownership,
        memeRatio: memeRatioA,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("Add", async () => {
    await program.methods
      .add(new BN(2))
      .accountsStrict({
        owner: owner.publicKey,
        mintMeme: mintT.publicKey,
        ownership,
        memeRatio: memeRatioB,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("Create", async () => {
    await program.methods
      .create(task_id, new BN(1e6))
      .accountsStrict({
        maker: maker.publicKey,
        mintM: mintM.publicKey,
        makerAtaM,
        memeRatio: memeRatioA,
        escrow,
        vaultM,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .signers([maker])
      .rpc()
      .then(confirm)
      .then(log);
  });

  xit("Refund", async () => {
    await program.methods
      .refund()
      .accountsStrict({
        maker: maker.publicKey,
        mintM: mintM.publicKey,
        makerAtaM,
        escrow,
        vaultM,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .signers([maker])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("Take", async () => {
    try {
    await program.methods
      .take()
      .accountsStrict({ 
        taker: taker.publicKey,
        maker: maker.publicKey,
        mintMeme: mintT.publicKey,
        takerAtaT,
        memeRatio: memeRatioB,
        escrow,
        vaultT,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .signers([taker])
      .rpc()
      .then(confirm)
      .then(log);
    } catch(e) {
      console.log(e);
      throw(e)
    }
  });

  it("Finalize", async () => {
    try {
    await program.methods
      .finalize()
      .accountsStrict({ 
        prover: taker.publicKey,
        maker: maker.publicKey,
        escrow,
        systemProgram: SystemProgram.programId,
      })
      .signers([taker])
      .rpc()
      .then(confirm)
      .then(log);
    } catch(e) {
      console.log(e);
      throw(e)
    }
  });

  it("Winner Claim", async () => {
    try {
    await program.methods
      .winnerClaim()
      .accountsStrict({ 
        winner: maker.publicKey,
        maker: maker.publicKey,
        owner: owner.publicKey,
        mintBonk: mintBonk.publicKey,
        mintWin: mintM.publicKey,
        winnerAtaWin: makerAtaM,
        winnerAtaBonk: makerAtaBonk,
        ownership,
        escrow,
        vaultWin: vaultM,
        ownershipBonk,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .signers([maker])
      .rpc()
      .then(confirm)
      .then(log);
    } catch(e) {
      console.log(e);
      throw(e)
    }
  });

  it("Owner Claim", async () => {
    try {
    await program.methods
      .ownerClaim()
      .accountsStrict({ 
        owner: owner.publicKey,
        maker: maker.publicKey,
        mintLose: mintT.publicKey,
        ownerAtaLose: ownerAtaT,
        ownership,
        escrow,
        vaultLose: vaultT,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirm)
      .then(log);
    } catch(e) {
      console.log(e);
      throw(e)
    }
  });
});
