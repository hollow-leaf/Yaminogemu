use anchor_lang::prelude::*;

use crate::Escrow;
use crate::error::ErrorCode;

#[derive(Accounts)]
pub struct Finalize<'info> {
    #[account(mut)]
    pub prover: Signer<'info>,
    #[account(mut)]
    pub maker: SystemAccount<'info>,
    #[account(
        mut,
        seeds = [b"escrow", maker.key().as_ref(), escrow.task_id.to_le_bytes().as_ref()],
        bump = escrow.bump
    )]
    pub escrow: Box<Account<'info, Escrow>>,
    pub system_program: Program<'info, System>,
}

impl Finalize<'_> {
    pub fn finalize(&mut self) -> Result<()> {
        require!(self.escrow.filled, ErrorCode::NotFilledError);
        self.escrow.winner = self.maker.key();
        Ok(())
    }
}