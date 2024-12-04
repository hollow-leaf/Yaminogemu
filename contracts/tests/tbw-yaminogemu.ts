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

  const task_id = new BN(randomBytes(8));
  const owner = provider
  const [maker, taker, mintM, mintT, mintBonk] = Array.from({ length: 5 }, () =>
    Keypair.generate()
  );

  // Metadata to store in Mint Account
  const metaDataBonk: TokenMetadata = {
    updateAuthority: provider.publicKey,
    mint: mintBonk.publicKey,
    name: "BONK",
    symbol: "bonk",
    uri: "https://gateway.pinata.cloud/ipfs/Qmd3FfsyaGfR2yrnNNCxreMKkvn9ByjsL3Te2CG2ozVM89",
    additionalMetadata: [["description", "Only Possible On Bonk"]],
  };

  // Metadata to store in Mint Account
  const metaDataSol: TokenMetadata = {
    updateAuthority: provider.publicKey,
    mint: mintM.publicKey,
    name: "OPOS",
    symbol: "OPOS",
    uri: "https://gateway.pinata.cloud/ipfs/QmWwzuHwYvpahsN3jQuvS7yPT3zMrdE4iw8ucStjEAAYFo",
    additionalMetadata: [["description", "Only Possible On Solana"]],
  };

  // Metadata to store in Mint Account
  const metaDataZeus: TokenMetadata = {
    updateAuthority: provider.publicKey,
    mint: mintT.publicKey,
    name: "OPOZ",
    symbol: "OPOZ",
    uri: "https://gateway.pinata.cloud/ipfs/QmSF4qYjNJ6VgR4wBq5Ej6aMFZSy19JHQLXQSXu2MMRwec",
    additionalMetadata: [["description", "Only Possible On Zeus"]],
  };

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

  const [memeRatioBonk, memeRatioM, memeRatioT] = [mintBonk, mintM, mintT]
    .map((a) =>
      PublicKey.findProgramAddressSync(
        [Buffer.from("meme"), a.publicKey.toBuffer()],
        program.programId
      )[0]
    )

  const providervault = PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), owner.publicKey.toBuffer()],
    program.programId
  )[0];
  const vaultM = getAssociatedTokenAddressSync(mintM.publicKey, escrow, true, tokenProgram);
  const vaultT = getAssociatedTokenAddressSync(mintT.publicKey, escrow, true, tokenProgram);
  const ownershipM = getAssociatedTokenAddressSync(mintM.publicKey, ownership, true, tokenProgram);
  const ownershipT = getAssociatedTokenAddressSync(mintT.publicKey, ownership, true, tokenProgram);
  const ownershipBonk = getAssociatedTokenAddressSync(mintBonk.publicKey, ownership, true, tokenProgram);


  it("Airdrop and create mints", async () => {
    // let lamports = await getMinimumBalanceForRentExemptMint(connection);
    let tx = new Transaction();
    // Size of MetadataExtension 2 bytes for type, 2 bytes for length
    const metadataExtension = TYPE_SIZE + LENGTH_SIZE;
    // Size of metadata
    const metadataZeusLen = pack(metaDataZeus).length;

    // Size of Mint Account with extension
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);

    // Minimum lamports required for Mint Account
    const lamports = await connection.getMinimumBalanceForRentExemption(
      mintLen + metadataExtension + metadataZeusLen,
    );

    // Transaction 1: Airdrop lamports to accounts
    const airdropTx = new Transaction();
    airdropTx.add(
      ...[maker, taker, owner].map((account) =>
        SystemProgram.transfer({
          fromPubkey: provider.publicKey,
          toPubkey: account.publicKey,
          lamports: 0.04 * LAMPORTS_PER_SOL,
        })
      )
    );
    await provider.sendAndConfirm(airdropTx, []).then(log);

    // Transaction 2: Create Mint Accounts
    const createMintsTx = new Transaction();
    createMintsTx.add(
      ...[mintM, mintT, mintBonk].map((mint) =>
        SystemProgram.createAccount({
          fromPubkey: provider.publicKey,
          newAccountPubkey: mint.publicKey,
          lamports,
          space: mintLen,
          programId: tokenProgram,
        })
      )
    );
    await provider.sendAndConfirm(createMintsTx, [mintM, mintT, mintBonk]).then(log);

    // Transaction 3: Initialize Metadata and Mint Instructions
    const initializeMintsTx = new Transaction();
    initializeMintsTx.add(
      ...[
        { mint: mintM.publicKey, metadata: metaDataZeus },
        { mint: mintT.publicKey, metadata: metaDataSol },
        { mint: mintBonk.publicKey, metadata: metaDataBonk },
      ].flatMap((x) => [
        createInitializeMetadataPointerInstruction(x.mint, provider.publicKey, x.mint, tokenProgram),
        createInitializeMint2Instruction(x.mint, 6, provider.publicKey, null, tokenProgram),
        createInitializeInstruction({
          programId: tokenProgram,
          metadata: x.mint,
          updateAuthority: provider.publicKey,
          mint: x.mint,
          mintAuthority: provider.publicKey,
          name: x.metadata.name,
          symbol: x.metadata.symbol,
          uri: x.metadata.uri,
        }),
      ])
    );
    await provider.sendAndConfirm(initializeMintsTx, []).then(log);
  });


  it("Airdrop Bonk", async () => {
    let lamports = await getMinimumBalanceForRentExemptMint(connection);
    let tx = new Transaction();
    tx.instructions = [
      ...[
        { mint: mintM.publicKey, ata: makerAtaM, receiver: maker.publicKey },
        { mint: mintT.publicKey, ata: takerAtaT, receiver: taker.publicKey },
        { mint: mintBonk.publicKey, ata: ownerAtaBonk, receiver: provider.publicKey },
      ].flatMap((x) => [
        createAssociatedTokenAccountIdempotentInstruction(x.receiver, x.ata, x.receiver, x.mint, tokenProgram),
        createMintToInstruction(x.mint, x.ata, provider.publicKey, 10e9, undefined, tokenProgram),
      ]),
    ];
    console.log("mintM",mintM.publicKey)
    console.log("mintT", mintT.publicKey)
    console.log("mintBonk", mintBonk.publicKey)
    console.log("maker",maker.publicKey)
    console.log("taker",taker.publicKey)
    await provider.sendAndConfirm(tx, [maker, taker]).then(log);
  });

  it("Init", async () => {
    await program.methods
      .init()
      .accountsStrict({
        owner: owner.publicKey,
        ownership,
        memeRatio: memeRatioBonk,
        mintBonk: mintBonk.publicKey,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("Add", async () => {
    await program.methods
      .add(new BN(4), new BN(85))
      .accountsStrict({
        owner: owner.publicKey,
        mintMeme: mintM.publicKey,
        ownership,
        memeRatio: memeRatioM,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("Add", async () => {
    await program.methods
      .add(new BN(2), new BN(95))
      .accountsStrict({
        owner: owner.publicKey,
        mintMeme: mintT.publicKey,
        ownership,
        memeRatio: memeRatioT,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("Set Ratio", async () => {
    await program.methods
      .setRatio(new BN(2), new BN(85))
      .accountsStrict({
        owner: owner.publicKey,
        mintMeme: mintM.publicKey,
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
        mintBonk: mintBonk.publicKey,
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

  it("Withdraw", async () => {
    await program.methods
      .withdraw(new BN(1e8))
      .accountsStrict({
        provider: owner.publicKey,
        providervault,
        ownership,
        memeRatio: memeRatioBonk,
        mintMeme: mintBonk.publicKey,
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
        mintM: mintM.publicKey,
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

  it("Refund", async () => {
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
          mintBonk: mintBonk.publicKey,
          mintMeme: mintT.publicKey,
          mintWin: mintM.publicKey,
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

  it("Owner Claim", async () => {
    try {
      await program.methods
        .vaultClaim()
        .accountsStrict({
          owner: owner.publicKey,
          maker: maker.publicKey,
          mintMeme: mintT.publicKey,
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

  it("Withdraw", async () => {
    await program.methods
      .withdraw(new BN(1e6))
      .accountsStrict({
        provider: owner.publicKey,
        providervault,
        ownership,
        memeRatio: memeRatioT,
        mintMeme: mintT.publicKey,
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
