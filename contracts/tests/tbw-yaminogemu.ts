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
  LENGTH_SIZE,
} from "@solana/spl-token";
import {
  createInitializeInstruction,
  createUpdateFieldInstruction,
  createRemoveKeyInstruction,
  pack,
  TokenMetadata,
} from "@solana/spl-token-metadata";
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

  const task_id = new BN(89);
  const owner = provider
  // const [maker, taker, mintM, mintT, mintBonk] = Array.from({ length: 5 }, () =>
  //   Keypair.generate()
  // );
  const [maker, taker] = Array.from({ length: 2 }, () =>
    Keypair.generate()
  );

  const mintOPOZ = new PublicKey("7isYYx9nfsgW1xxDmDyhjw7jY7PS6jEr89y4G5iAPzNa")
  const mintOPOS = new PublicKey("C1tkdFaP7HjKevK28V1hPR2Rf6B2qMmgrt7LasAun8id")
  const mintPepe = new PublicKey("GLmfMYRAw5HEY4rS4DAxeyir8iUTqVcakmtgPvzwaDTd")
  const mintBabyDoge = new PublicKey("2gcSMoNpcVNrFdJJ9CqiMcP8HeszxisYiWsNdkDuMdDc")
  const mintBonk = new PublicKey("Aqk2sTGwLuojdYSHDLCXgidGNUQeskWS2JbKXPksHdaG")

  const mintM = mintBabyDoge
  const mintT = mintBabyDoge

  // // Metadata to store in Mint Account
  // const metaDataBonk: TokenMetadata = {
  //   updateAuthority: provider.publicKey,
  //   mint: mintBonk,
  //   name: "BONK",
  //   symbol: "bonk",
  //   uri: "https://gateway.pinata.cloud/ipfs/Qmd3FfsyaGfR2yrnNNCxreMKkvn9ByjsL3Te2CG2ozVM89",
  //   additionalMetadata: [["description", "Only Possible On Bonk"]],
  // };

  const [makerAtaM, makerAtaT, makerAtaBonk, takerAtaM, takerAtaT, takerAtaBonk, ownerAtaM, ownerAtaT, ownerAtaBonk] = [maker, taker, owner]
    .map((a) =>
      [mintM, mintT, mintBonk].map((m) =>
        getAssociatedTokenAddressSync(m, a.publicKey, false, tokenProgram)
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

  const [memeRatioBonk, memeRatioM, memeRatioT] = [mintBonk, mintM, mintT]
    .map((a) =>
      PublicKey.findProgramAddressSync(
        [Buffer.from("meme"), a.toBuffer()],
        program.programId
      )[0]
    )

  const providervault = PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), owner.publicKey.toBuffer()],
    program.programId
  )[0];
  const vaultM = getAssociatedTokenAddressSync(mintM, escrow, true, tokenProgram);
  const vaultT = getAssociatedTokenAddressSync(mintT, escrow, true, tokenProgram);
  const ownershipM = getAssociatedTokenAddressSync(mintM, ownership, true, tokenProgram);
  const ownershipT = getAssociatedTokenAddressSync(mintT, ownership, true, tokenProgram);
  const ownershipBonk = getAssociatedTokenAddressSync(mintBonk, ownership, true, tokenProgram);


  it("Airdrop", async () => {
    // Airdrop lamports to accounts
    const airdropTx = new Transaction();
    airdropTx.add(
      ...[maker, taker].map((account) =>
        SystemProgram.transfer({
          fromPubkey: provider.publicKey,
          toPubkey: account.publicKey,
          lamports: 0.04 * LAMPORTS_PER_SOL,
        })
      )
    );
    await provider.sendAndConfirm(airdropTx, []).then(log);
  });
  xit("create mints", async () => {
  // // let lamports = await getMinimumBalanceForRentExemptMint(connection);
  // let tx = new Transaction();
  // // Size of MetadataExtension 2 bytes for type, 2 bytes for length
  // const metadataExtension = TYPE_SIZE + LENGTH_SIZE;
  // // Size of metadata
  // const metadataZeusLen = pack(metaDataZeus).length;

  // // Size of Mint Account with extension
  // const mintLen = getMintLen([ExtensionType.MetadataPointer]);

  // // Minimum lamports required for Mint Account
  // const lamports = await connection.getMinimumBalanceForRentExemption(
  //   mintLen + metadataExtension + metadataZeusLen,
  // );

  // // Transaction 1: Create Mint Accounts
  // const createMintsTx = new Transaction();
  // createMintsTx.add(
  //   ...[mintM, mintT, mintBonk].map((mint) =>
  //     SystemProgram.createAccount({
  //       fromPubkey: provider.publicKey,
  //       newAccountPubkey: mint.publicKey,
  //       lamports,
  //       space: mintLen,
  //       programId: tokenProgram,
  //     })
  //   )
  // );
  // await provider.sendAndConfirm(createMintsTx, [mintM, mintT, mintBonk]).then(log);

  // // Transaction 2: Initialize Metadata and Mint Instructions
  // const initializeMintsTx = new Transaction();
  // initializeMintsTx.add(
  //   ...[
  //     { mint: mintM, metadata: metaDataZeus },
  //     { mint: mintT, metadata: metaDataSol },
  //     { mint: mintBonk, metadata: metaDataBonk },
  //   ].flatMap((x) => [
  //     createInitializeMetadataPointerInstruction(x.mint, provider.publicKey, x.mint, tokenProgram),
  //     createInitializeMint2Instruction(x.mint, 6, provider.publicKey, null, tokenProgram),
  //     createInitializeInstruction({
  //       programId: tokenProgram,
  //       metadata: x.mint,
  //       updateAuthority: provider.publicKey,
  //       mint: x.mint,
  //       mintAuthority: provider.publicKey,
  //       name: x.metadata.name,
  //       symbol: x.metadata.symbol,
  //       uri: x.metadata.uri,
  //     }),
  //   ])
  // );
  // await provider.sendAndConfirm(initializeMintsTx, []).then(log);
  });

  it("Airdrop All Token", async () => {
    let lamports = await getMinimumBalanceForRentExemptMint(connection);
    let tx = new Transaction();
    tx.instructions = [
      ...[
        { mint: mintM, ata: makerAtaM, receiver: maker.publicKey },
        { mint: mintT, ata: takerAtaT, receiver: taker.publicKey },
        // { mint: mintBonk, ata: ownerAtaBonk, receiver: provider.publicKey },
      ].flatMap((x) => [
        createAssociatedTokenAccountIdempotentInstruction(x.receiver, x.ata, x.receiver, x.mint, tokenProgram),
        createMintToInstruction(x.mint, x.ata, provider.publicKey, 1e11, undefined, tokenProgram),
      ]),
      ...[
        { mint: mintM, ata: ownerAtaM, receiver: provider.publicKey },
        { mint: mintT, ata: ownerAtaT, receiver: provider.publicKey },
        { mint: mintBonk, ata: ownerAtaBonk, receiver: provider.publicKey },
      ].flatMap((x) => [
        createMintToInstruction(x.mint, x.ata, provider.publicKey, 1e11, undefined, tokenProgram),
      ]),
    ];
    await provider.sendAndConfirm(tx, [maker, taker]).then(log);
  });

  xit("Init", async () => {
    await program.methods
      .init()
      .accountsStrict({
        owner: owner.publicKey,
        ownership,
        memeRatio: memeRatioBonk,
        mintBonk: mintBonk,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  xit("Add", async () => {
    await program.methods
      .add(new BN(4), new BN(85))
      .accountsStrict({
        owner: owner.publicKey,
        mintMeme: mintM,
        ownership,
        memeRatio: memeRatioM,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  xit("Add", async () => {
    await program.methods
      .add(new BN(2), new BN(95))
      .accountsStrict({
        owner: owner.publicKey,
        mintMeme: mintT,
        ownership,
        memeRatio: memeRatioT,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  xit("Set Ratio", async () => {
    await program.methods
      .setRatio(new BN(2), new BN(85))
      .accountsStrict({
        owner: owner.publicKey,
        mintMeme: mintM,
        ownership,
        memeRatio: memeRatioM,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("Deposit", async () => {
    await program.methods
      .deposit(new BN(1e10))
      .accountsStrict({
        provider: owner.publicKey,
        providervault,
        ownership,
        mintBonk: mintBonk,
        providerAtaBonk: ownerAtaBonk,
        ownershipBonk,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  xit("Withdraw", async () => {
    await program.methods
      .withdraw(new BN(1e8))
      .accountsStrict({
        provider: owner.publicKey,
        providervault,
        ownership,
        memeRatio: memeRatioBonk,
        mintMeme: mintBonk,
        providerAtaMeme: ownerAtaBonk,
        ownershipMeme: ownershipBonk,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("Create", async () => {
    await program.methods
      .create(task_id, new BN(1e6))
      .accountsStrict({
        maker: maker.publicKey,
        mintM: mintM,
        makerAtaM,
        memeRatio: memeRatioM,
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
        mintM: mintM,
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
          mintMeme: mintT,
          takerAtaT,
          memeRatio: memeRatioT,
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
    } catch (e) {
      console.log(e);
      throw (e)
    }
  });

  xit("Finalize", async () => {
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
    } catch (e) {
      console.log(e);
      throw (e)
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
          mintBonk: mintBonk,
          mintMeme: mintT,
          mintWin: mintM,
          ownership,
          memeRatio: memeRatioT,
          escrow,
          winnerAtaWin: makerAtaM,
          winnerAtaBonk: makerAtaBonk,
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
    } catch (e) {
      console.log(e);
      throw (e)
    }
  });

  xit("Owner Claim", async () => {
    try {
      await program.methods
        .vaultClaim()
        .accountsStrict({
          owner: owner.publicKey,
          maker: maker.publicKey,
          mintMeme: mintT,
          ownership,
          memeRatio: memeRatioT,
          ownershipMeme: ownershipT,
          escrow,
          vaultMeme: vaultT,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram,
          systemProgram: SystemProgram.programId,
        })
        .rpc()
        .then(confirm)
        .then(log);
    } catch (e) {
      console.log(e);
      throw (e)
    }
  });

  xit("Withdraw", async () => {
    await program.methods
      .withdraw(new BN(1e6))
      .accountsStrict({
        provider: owner.publicKey,
        providervault,
        ownership,
        memeRatio: memeRatioT,
        mintMeme: mintT,
        providerAtaMeme: ownerAtaT,
        ownershipMeme: ownershipT,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .then(confirm)
      .then(log);
  });
});
