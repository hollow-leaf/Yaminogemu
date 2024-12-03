use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{transfer_checked, Mint, TokenAccount, TokenInterface, TransferChecked},
};

use crate::MemeRatio;
use crate::OwnerCap;
use crate::ProviderVault;
use crate::error::ErrorCode;

#[derive(Accounts)]
pub struct RemoveLiquidity<'info> {
    #[account(mut)]
    pub provider: Signer<'info>,
    #[account(
        mut,
        seeds = [b"vault", provider.key().as_ref()],
        bump
    )]
    pub providervault: Account<'info, ProviderVault>,
    #[account(
        mut,
        seeds = [b"tbw_yaminogemu"],
        bump
    )]
    pub ownership: Account<'info, OwnerCap>,
    #[account(
        mut,
        seeds = [b"meme", mint_meme.key().as_ref()],
        bump
    )]
    pub meme_ratio: Account<'info, MemeRatio>,
    #[account(
        mint::token_program = token_program
    )]
    pub mint_meme: InterfaceAccount<'info, Mint>,
    #[account(
        init_if_needed,
        payer = provider,
        associated_token::mint = mint_meme,
        associated_token::authority = provider,
        associated_token::token_program = token_program
    )]
    pub provider_ata_meme: InterfaceAccount<'info, TokenAccount>,
    #[account(
        mut,
        associated_token::mint = mint_meme,
        associated_token::authority = ownership,
        associated_token::token_program = token_program
    )]
    pub ownership_meme: InterfaceAccount<'info, TokenAccount>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl RemoveLiquidity<'_> {
    pub fn remove_liquidity(&mut self, remove_amount: u64) -> Result<()> {
        let bonk_amount = remove_amount / self.meme_ratio.meme_ratio;
        require!(self.providervault.bonk_amount >= bonk_amount , ErrorCode::OutOfClaimAmountError);
        let signer_seeds: [&[&[u8]]; 1] = [&[
            b"tbw_yaminogemu",
            &[self.ownership.bump],
        ]];
    
        let transfer_accounts = TransferChecked {
            from: self.ownership_meme.to_account_info(),
            mint: self.mint_meme.to_account_info(),
            to: self.provider_ata_meme.to_account_info(),
            authority: self.ownership.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            transfer_accounts,
            &signer_seeds,
        );
        let modified_bonk_amount = bonk_amount * self.ownership.actual_bonk / self.ownership.total_bonk;
        self.ownership.total_bonk -= bonk_amount;
        self.ownership.actual_bonk -= modified_bonk_amount;
        self.providervault.bonk_amount -= bonk_amount;
        transfer_checked(cpi_ctx, modified_bonk_amount, self.mint_meme.decimals)
    }
}