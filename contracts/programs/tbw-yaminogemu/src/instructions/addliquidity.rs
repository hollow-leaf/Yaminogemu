use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{transfer_checked, Mint, TokenAccount, TokenInterface, TransferChecked},
};
use crate::OwnerCap;
use crate::ProviderVault;

#[derive(Accounts)]
pub struct AddLiquidity<'info> {
    #[account(mut)]
    pub provider: Signer<'info>,
    #[account(
        init_if_needed,
        payer = provider,
        space = 8 + ProviderVault::INIT_SPACE,
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
        mint::token_program = token_program
    )]
    pub mint_bonk: InterfaceAccount<'info, Mint>,
    #[account(
        mut,
        associated_token::mint = mint_bonk,
        associated_token::authority = provider,
        associated_token::token_program = token_program
    )]
    pub provider_ata_bonk: InterfaceAccount<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = provider,
        associated_token::mint = mint_bonk,
        associated_token::authority = ownership,
        associated_token::token_program = token_program
    )]
    pub ownership_bonk: InterfaceAccount<'info, TokenAccount>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl AddLiquidity<'_> {
    pub fn add_liquidity(&mut self, bonk_amount: u64) -> Result<()> {
        let transfer_accounts = TransferChecked {
            from: self.provider_ata_bonk.to_account_info(),
            mint: self.mint_bonk.to_account_info(),
            to: self.ownership_bonk.to_account_info(),
            authority: self.provider.to_account_info(),
        };

        let cpi_ctx = CpiContext::new(self.token_program.to_account_info(), transfer_accounts);
        self.ownership.total_bonk += bonk_amount;
        self.ownership.actual_bonk += bonk_amount;
        self.providervault.bonk_amount += bonk_amount;
        transfer_checked(cpi_ctx, bonk_amount, self.mint_bonk.decimals)
    }
}