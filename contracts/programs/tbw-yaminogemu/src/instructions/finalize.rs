use anchor_lang::prelude::*;
// use bonsol_interface::anchor::{Bonsol, DeployV1Account, ExecutionRequestV1Account};
// use bonsol_interface::instructions::{execute_v1, CallbackConfig, ExecutionConfig};
use crate::Escrow;
use crate::error::ErrorCode;
// use bonsol_interface::callback::handle_callback;
// use bonsol_interface::instructions::InputRef;

// const CAMPARE_IMAGE_ID: &str = "ec8b92b02509d174a1a07dbe228d40ea13ff4b4b71b84bdc690064dfea2b6f86";

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
    // pub bonsol_program: Program<'info, Bonsol>,
    // pub execution_request: Account<'info, ExecutionRequestV1Account<'info>>,
    // pub deployment_account: Account<'info, DeployV1Account<'info>>,
    pub system_program: Program<'info, System>,
}

impl Finalize<'_> {
    // pub fn play(&mut self) -> Result<()> {
    //     execute_v1(
    //         ctx.accounts.miner.key,
    //         CAMPARE_IMAGE_ID,
    //         &args.current_req_id,
    //         vec![
    //             Input::public(pkbytes.to_vec()),
    //             Input::public(args.num.to_vec()),
    //         ],
    //         args.tip,
    //         slot + 100,
    //         ExecutionConfig {
    //             verify_input_hash: true,
    //             input_hash: Some(input_hash.to_bytes().to_vec()),
    //             forward_output: true,
    //         },
    //         Some(CallbackConfig {
    //             program_id: crate::id(),
    //             instruction_prefix: vec![0],
    //             extra_accounts: vec![
    //                 AccountMeta::new_readonly(ctx.accounts.pow_config.key(), false),
    //                 AccountMeta::new(ctx.accounts.pow_mint_log.key(), false),
    //                 AccountMeta::new(ctx.accounts.mint.key(), false),
    //                 AccountMeta::new(ctx.accounts.token_account.key(), false),
    //                 AccountMeta::new_readonly(ctx.accounts.token_program.key(), false),
    //             ],
    //         }),
    //     )
    //     .map_err(|_| PowError::MineRequestFailed)?;
    //     Ok(())
    // }
    pub fn finalize(&mut self) -> Result<()> {
        // let output = handle_callback(CAMPARE_IMAGE_ID, &epub, &ainfos.as_slice(), &data)?;
        require!(self.escrow.filled, ErrorCode::NotFilledError);
        self.escrow.winner = self.maker.key();
        Ok(())
    }
}