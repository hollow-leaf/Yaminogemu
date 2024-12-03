use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Escrow {
    pub task_id: u64,
    pub maker: Pubkey,
    pub mint_m: Pubkey,
    pub mint_t: Pubkey,
    pub winner: Pubkey,
    pub bonk_amount: u64,
    pub filled: bool,
    pub bump: u8,
}
#[account]
#[derive(InitSpace)]
pub struct MemeRatio {
    pub mint_meme: Pubkey,
    pub claim_ratio: u64,
    pub meme_ratio: u64, 
}

#[account]
#[derive(InitSpace)]
pub struct ProviderVault {
    pub bonk_amount: u64,
}

#[account]
#[derive(InitSpace)]
pub struct OwnerCap {
    pub owner: Pubkey,
    pub mint_bonk: Pubkey,
    pub total_bonk: u64,
    pub actual_bonk: u64,
    pub bump: u8,
}