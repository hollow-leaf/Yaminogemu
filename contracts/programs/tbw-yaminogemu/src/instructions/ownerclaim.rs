use anchor_lang::prelude::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{close_account, transfer_checked, Mint, TokenAccount, TokenInterface, CloseAccount, TransferChecked},
};

use crate::Escrow;
use crate::error::ErrorCode;
use crate::OwnerCap;

#[derive(Accounts)]
pub struct OwnerClaim<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(mut)]
    pub maker: SystemAccount<'info>,
    pub mint_lose: InterfaceAccount<'info, Mint>,
    #[account(
        has_one = owner,
        seeds = [b"tbw_yaminogemu"],
        bump
    )]
    pub ownership: Box<Account<'info, OwnerCap>>,
    #[account(
        init_if_needed,
        payer = owner,
        associated_token::mint = mint_lose,
        associated_token::authority = owner,
        associated_token::token_program = token_program,
    )]
    pub owner_ata_lose: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(
        mut,
        close = owner,
        has_one = maker,
        seeds = [b"escrow", maker.key().as_ref(), escrow.task_id.to_le_bytes().as_ref()],
        bump = escrow.bump
    )]
    pub escrow: Box<Account<'info, Escrow>>,
    #[account(
        mut,
        associated_token::mint = mint_lose,
        associated_token::authority = escrow,
        associated_token::token_program = token_program,
    )]
    pub vault_lose: Box<InterfaceAccount<'info, TokenAccount>>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl OwnerClaim<'_> {
    pub fn owner_claim(&mut self) -> Result<()> {
        require!(self.escrow.filled, ErrorCode::NotFilledError);
        let signer_seeds: [&[&[u8]]; 1] = [&[
            b"escrow",
            self.maker.to_account_info().key.as_ref(),
            &self.escrow.task_id.to_le_bytes()[..],
            &[self.escrow.bump],
        ]];

        let accounts_b = TransferChecked {
            from: self.vault_lose.to_account_info(),
            mint: self.mint_lose.to_account_info(),
            to: self.owner_ata_lose.to_account_info(),
            authority: self.escrow.to_account_info(),
        };

        let ctx_b = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            accounts_b,
            &signer_seeds,
        );

        transfer_checked(ctx_b, self.vault_lose.amount, self.mint_lose.decimals)?;

        let accounts_lose = CloseAccount {
            account: self.vault_lose.to_account_info(),
            destination: self.owner.to_account_info(),
            authority: self.escrow.to_account_info(),
        };

        let ctx_lose = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            accounts_lose,
            &signer_seeds,
        );

        close_account(ctx_lose)
    }
}