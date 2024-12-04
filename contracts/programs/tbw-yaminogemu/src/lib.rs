pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("26i5kWTyQqLnqJk85yPWqMaBbaAVVBaK7X2NYoSZmNCN");

#[program]
pub mod tbw_yaminogemu {

    use super::*;

    pub fn init(ctx: Context<Init>) -> Result<()> {
        ctx.accounts.init(&ctx.bumps)
    }

    pub fn deposit(ctx: Context<AddLiquidity>, bonk_amount: u64) -> Result<()> {
        ctx.accounts.add_liquidity(bonk_amount)
    }

    pub fn withdraw(ctx: Context<RemoveLiquidity>, remove_amount: u64) -> Result<()> {
        ctx.accounts.remove_liquidity(remove_amount)
    }

    pub fn add(ctx: Context<Add>, meme_ratio: u64, claim_ratio: u64) -> Result<()> {
        ctx.accounts.set_ratio(meme_ratio, claim_ratio)
    }

    pub fn set_ratio(ctx: Context<Add>, meme_ratio: u64, claim_ratio: u64) -> Result<()> {
        ctx.accounts.change_ratio(meme_ratio, claim_ratio)
    }

    pub fn create(ctx: Context<Create>, task_id: u64, bonk_amount: u64) -> Result<()> {
        ctx.accounts.create_task(task_id, bonk_amount, &ctx.bumps)
    }

    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        ctx.accounts.refund_and_close_vault()
    }

    pub fn take(ctx: Context<Take>) -> Result<()> {
        ctx.accounts.deposit()
    }

    pub fn finalize(ctx: Context<Finalize>) -> Result<()> {
        ctx.accounts.finalize()
    }

    pub fn winner_claim(ctx: Context<WinnerClaim>) -> Result<()> {
        ctx.accounts.winner_claim()
    }

    pub fn vault_claim(ctx: Context<VaultClaim>) -> Result<()> {
        ctx.accounts.vault_claim()
    }
}
