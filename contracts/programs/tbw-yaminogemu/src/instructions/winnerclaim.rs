use anchor_lang::prelude::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{close_account, transfer_checked, Mint, TokenAccount, TokenInterface, CloseAccount, TransferChecked},
};

use crate::Escrow;
use crate::error::ErrorCode;
use crate::OwnerCap;
use crate::MemeRatio;

#[derive(Accounts)]
pub struct WinnerClaim<'info> {
    #[account(mut)]
    pub winner: Signer<'info>,
    #[account(mut)]
    pub maker: SystemAccount<'info>,
    #[account(mut)]
    pub owner: SystemAccount<'info>,
    pub mint_bonk: InterfaceAccount<'info, Mint>,
    pub mint_meme: InterfaceAccount<'info, Mint>,
    pub mint_win: InterfaceAccount<'info, Mint>,

    #[account(
        has_one = owner,
        seeds = [b"tbw_yaminogemu"],
        bump
    )]
    pub ownership: Box<Account<'info, OwnerCap>>,
    #[account(
        has_one = mint_meme,
        seeds = [b"meme", mint_meme.key().as_ref()],
        bump
    )]
    pub meme_ratio: Box<Account<'info, MemeRatio>>,
    #[account(
        mut,
        has_one = maker,
        has_one = winner,
        seeds = [b"escrow", maker.key().as_ref(), escrow.task_id.to_le_bytes().as_ref()],
        bump = escrow.bump
    )]
    pub escrow: Box<Account<'info, Escrow>>,

    #[account(
        mut,
        associated_token::mint = mint_win,
        associated_token::authority = winner,
        associated_token::token_program = token_program,
    )]
    pub winner_ata_win: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(
        init_if_needed,
        payer = winner,
        associated_token::mint = mint_bonk,
        associated_token::authority = winner,
        associated_token::token_program = token_program,
    )]
    pub winner_ata_bonk: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(
        mut,
        associated_token::mint = mint_win,
        associated_token::authority = escrow,
        associated_token::token_program = token_program,
    )]
    pub vault_win: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(
        mut,
        associated_token::mint = mint_bonk,
        associated_token::authority = ownership,
        associated_token::token_program = token_program,
    )]
    pub ownership_bonk: Box<InterfaceAccount<'info, TokenAccount>>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl WinnerClaim<'_> {
    pub fn winner_claim(&mut self) -> Result<()> {
        require!(self.escrow.filled, ErrorCode::NotFilledError);
        let vault_seeds: [&[&[u8]]; 1] = [&[
            b"escrow",
            self.maker.to_account_info().key.as_ref(),
            &self.escrow.task_id.to_le_bytes()[..],
            &[self.escrow.bump],
        ]];

        let accounts_a = TransferChecked {
            from: self.vault_win.to_account_info(),
            mint: self.mint_win.to_account_info(),
            to: self.winner_ata_win.to_account_info(),
            authority: self.escrow.to_account_info(),
        };

        let ctx_a = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            accounts_a,
            &vault_seeds,
        );

        transfer_checked(ctx_a, self.vault_win.amount, self.mint_win.decimals)?;
        
        let ownership_seeds: [&[&[u8]]; 1] = [&[
            b"tbw_yaminogemu",
            &[self.ownership.bump],
        ]];

        let accounts_bonk = TransferChecked {
            from: self.ownership_bonk.to_account_info(),
            mint: self.mint_bonk.to_account_info(),
            to: self.winner_ata_bonk.to_account_info(),
            authority: self.ownership.to_account_info(),
        };

        let ctx_bonk = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            accounts_bonk,
            &ownership_seeds,
        );

        let bonk_amount = self.escrow.bonk_amount * self.meme_ratio.claim_ratio / 100;
        // let bonk_amount = self.escrow.bonk_amount;

        transfer_checked(ctx_bonk, bonk_amount, self.mint_bonk.decimals)?;

        let accounts_win = CloseAccount {
            account: self.vault_win.to_account_info(),
            destination: self.winner.to_account_info(),
            authority: self.escrow.to_account_info(),
        };

        let ctx_win = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            accounts_win,
            &vault_seeds,
        );

        close_account(ctx_win)
    }
}