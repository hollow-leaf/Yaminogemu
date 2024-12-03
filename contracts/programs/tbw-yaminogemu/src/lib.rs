pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("AeS3SmHTHfD7YMLjeiEXfggxeafeqoVxuxZD9bJh9Y8e");

#[program]
pub mod tbw_yaminogemu {

    use super::*;

    pub fn init(ctx: Context<Init>) -> Result<()> {
        ctx.accounts.init(&ctx.bumps)
    }

    pub fn set_ratio(ctx: Context<Init>, ratio: u64) -> Result<()> {
        ctx.accounts.set_ratio(ratio)
    }

    pub fn deposit(ctx: Context<Init>, bonk_amount: u64) -> Result<()> {
        ctx.accounts.deposit(bonk_amount)
    }

    pub fn withdraw(ctx: Context<Init>, bonk_amount: u64) -> Result<()> {
        ctx.accounts.withdraw(bonk_amount)
    }

    pub fn add(ctx: Context<Add>, amount: u64) -> Result<()> {
        ctx.accounts.set_amount(amount)
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

    pub fn owner_claim(ctx: Context<OwnerClaim>) -> Result<()> {
        ctx.accounts.owner_claim()
    }
}
