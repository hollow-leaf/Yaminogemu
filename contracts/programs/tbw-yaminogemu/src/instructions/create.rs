use anchor_lang::prelude::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{transfer_checked, Mint, TokenAccount, TokenInterface, TransferChecked},
};

use crate::Escrow;
use crate::MemeRatio;

#[derive(Accounts)]
#[instruction(task_id: u64)]
pub struct Create<'info> {
    #[account(mut)]
    pub maker: Signer<'info>,
    #[account(
        mint::token_program = token_program
    )]
    pub mint_m: InterfaceAccount<'info, Mint>,
    #[account(
        mut,
        associated_token::mint = mint_m,
        associated_token::authority = maker,
        associated_token::token_program = token_program
    )]
    pub maker_ata_m: InterfaceAccount<'info, TokenAccount>,
    #[account(
        seeds = [b"meme", mint_m.key().as_ref()],
        bump
    )]
    pub meme_ratio: Account<'info, MemeRatio>,
    #[account(
        init,
        payer = maker,
        space = 8 + Escrow::INIT_SPACE,
        seeds = [b"escrow", maker.key().as_ref(), task_id.to_le_bytes().as_ref()],
        bump
    )]
    pub escrow: Account<'info, Escrow>,
    #[account(
        init,
        payer = maker,
        associated_token::mint = mint_m,
        associated_token::authority = escrow,
        associated_token::token_program = token_program
    )]
    pub vault_m: InterfaceAccount<'info, TokenAccount>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl Create<'_> {
    pub fn create_task(&mut self, task_id: u64, bonk_amount: u64, bumps: &CreateBumps) -> Result<()> {
        // self.escrow.set_inner(Escrow {
        //     task_id,
        //     maker: self.maker.key(),
        //     mint_m: self.mint_m.key(),
        //     bonk_amount,
        //     filled: false,
        //     bump: bumps.escrow,
        // });
        self.escrow.task_id = task_id;
        self.escrow.maker =  self.maker.key();
        self.escrow.mint_m = self.mint_m.key();
        self.escrow.bonk_amount = bonk_amount;
        self.escrow.filled = false;
        self.escrow.bump = bumps.escrow;
        let amount = bonk_amount * self.meme_ratio.meme_ratio;
        let transfer_accounts = TransferChecked {
            from: self.maker_ata_m.to_account_info(),
            mint: self.mint_m.to_account_info(),
            to: self.vault_m.to_account_info(),
            authority: self.maker.to_account_info(),
        };

        let cpi_ctx = CpiContext::new(self.token_program.to_account_info(), transfer_accounts);

        transfer_checked(cpi_ctx, amount, self.mint_m.decimals)
    }
}