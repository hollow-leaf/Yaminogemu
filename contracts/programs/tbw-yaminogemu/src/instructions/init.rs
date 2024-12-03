use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{transfer_checked, Mint, TokenAccount, TokenInterface, TransferChecked},
};
use crate::OwnerCap;

#[derive(Accounts)]
pub struct Init<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        init_if_needed,
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
        mut,
        associated_token::mint = mint_bonk,
        associated_token::authority = owner,
        associated_token::token_program = token_program
    )]
    pub owner_ata_bonk: InterfaceAccount<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = owner,
        associated_token::mint = mint_bonk,
        associated_token::authority = ownership,
        associated_token::token_program = token_program
    )]
    pub ownership_bonk: InterfaceAccount<'info, TokenAccount>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl Init<'_> {
    pub fn init(&mut self, bumps: &InitBumps) -> Result<()> {
        self.ownership.set_inner( OwnerCap {
            owner: self.owner.key(),
            mint_bonk: self.mint_bonk.key(),
            claim_ratio: 100,
            bump: bumps.ownership,
        });
        Ok(())
    }
    pub fn set_ratio(&mut self, ratio: u64) -> Result<()> {
        self.ownership.claim_ratio = ratio;
        Ok(())
    }
    pub fn deposit(&mut self, bonk_amount: u64) -> Result<()> {
        let transfer_accounts = TransferChecked {
            from: self.owner_ata_bonk.to_account_info(),
            mint: self.mint_bonk.to_account_info(),
            to: self.ownership_bonk.to_account_info(),
            authority: self.owner.to_account_info(),
        };

        let cpi_ctx = CpiContext::new(self.token_program.to_account_info(), transfer_accounts);

        transfer_checked(cpi_ctx, bonk_amount, self.mint_bonk.decimals)
    }
    pub fn withdraw(&mut self, bonk_amount: u64) -> Result<()> {
        let signer_seeds: [&[&[u8]]; 1] = [&[
            b"tbw_yaminogemu",
            &[self.ownership.bump],
        ]];
        let transfer_accounts = TransferChecked {
            from: self.ownership_bonk.to_account_info(),
            mint: self.mint_bonk.to_account_info(),
            to: self.owner_ata_bonk.to_account_info(),
            authority: self.ownership.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            transfer_accounts,
            &signer_seeds,
        );

        transfer_checked(cpi_ctx, bonk_amount, self.mint_bonk.decimals)
    }
}