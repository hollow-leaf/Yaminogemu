use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{
        close_account, transfer_checked, CloseAccount, Mint, TokenAccount, TokenInterface,
        TransferChecked,
    },
};

use crate::Escrow;
use crate::error::ErrorCode;

#[derive(Accounts)]
pub struct Refund<'info> {
    #[account(mut)]
    maker: Signer<'info>,
    mint_m: InterfaceAccount<'info, Mint>,
    #[account(
        mut,
        associated_token::mint = mint_m,
        associated_token::authority = maker,
        associated_token::token_program = token_program
    )]
    maker_ata_m: InterfaceAccount<'info, TokenAccount>,
    #[account(
        mut,
        close = maker,
        has_one = mint_m,
        has_one = maker,
        seeds = [b"escrow", maker.key().as_ref(), escrow.task_id.to_le_bytes().as_ref()],
        bump = escrow.bump
    )]
    escrow: Account<'info, Escrow>,
    #[account(
        mut,
        associated_token::mint = mint_m,
        associated_token::authority = escrow,
        associated_token::token_program = token_program
    )]
    pub vault_m: InterfaceAccount<'info, TokenAccount>,
    associated_token_program: Program<'info, AssociatedToken>,
    token_program: Interface<'info, TokenInterface>,
    system_program: Program<'info, System>,
}

impl Refund<'_> {
    pub fn refund_and_close_vault(&mut self) -> Result<()> {
        require!(!self.escrow.filled, ErrorCode::AlreadyFilledError);
        let signer_seeds: [&[&[u8]]; 1] = [&[
            b"escrow",
            self.maker.to_account_info().key.as_ref(),
            &self.escrow.task_id.to_le_bytes()[..],
            &[self.escrow.bump],
        ]];

        let xfer_accounts = TransferChecked {
            from: self.vault_m.to_account_info(),
            mint: self.mint_m.to_account_info(),
            to: self.maker_ata_m.to_account_info(),
            authority: self.escrow.to_account_info(),
        };

        let ctx = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            xfer_accounts,
            &signer_seeds,
        );

        transfer_checked(ctx, self.vault_m.amount, self.mint_m.decimals)?;

        let close_accounts = CloseAccount {
            account: self.vault_m.to_account_info(),
            destination: self.maker.to_account_info(),
            authority: self.escrow.to_account_info(),
        };

        let ctx = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            close_accounts,
            &signer_seeds,
        );

        close_account(ctx)
    }
}