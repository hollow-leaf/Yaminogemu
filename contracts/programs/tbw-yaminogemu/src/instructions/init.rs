use anchor_lang::prelude::*;

use anchor_spl::token_interface::{ Mint, TokenInterface};

use crate::OwnerCap;
use crate::MemeRatio;
#[derive(Accounts)]
pub struct Init<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        init,
        payer = owner,
        space = 8 + OwnerCap::INIT_SPACE,
        seeds = [b"tbw_yaminogemu"],
        bump
    )]
    pub ownership: Account<'info, OwnerCap>,
    #[account(
        mint::token_program = token_program
    )]
    pub mint_bonk: InterfaceAccount<'info, Mint>,
    #[account(
        init,
        payer = owner,
        space = 8 + MemeRatio::INIT_SPACE,
        seeds = [b"meme", mint_bonk.key().as_ref()],
        bump
    )]
    pub meme_ratio: Account<'info, MemeRatio>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl Init<'_> {
    pub fn init(&mut self, bumps: &InitBumps) -> Result<()> {
        self.ownership.set_inner( OwnerCap {
            owner: self.owner.key(),
            mint_bonk: self.mint_bonk.key(),
            total_bonk: 0,
            actual_bonk: 0,
            bump: bumps.ownership,
        });
        self.meme_ratio.set_inner( MemeRatio {
            mint_meme: self.mint_bonk.key(),
            meme_ratio: 1,
            claim_ratio: 100,
        });
        Ok(())
    }
}