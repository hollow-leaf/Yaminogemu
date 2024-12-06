/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/tbw_yaminogemu.json`.
 */
export type TbwYaminogemu = {
  address: '2YacFff9ohCN71SJQCFbhrKUKXx1BhoHTFYWFWYqieZd'
  metadata: {
    name: 'tbwYaminogemu'
    version: '0.1.0'
    spec: '0.1.0'
    description: 'Created with Anchor'
  }
  instructions: [
    {
      name: 'add'
      discriminator: [41, 249, 249, 146, 197, 111, 56, 181]
      accounts: [
        {
          name: 'owner'
          writable: true
          signer: true
          relations: ['ownership']
        },
        {
          name: 'mintMeme'
        },
        {
          name: 'ownership'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [
                  116,
                  98,
                  119,
                  95,
                  121,
                  97,
                  109,
                  105,
                  110,
                  111,
                  103,
                  101,
                  109,
                  117
                ]
              }
            ]
          }
        },
        {
          name: 'memeRatio'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 101, 109, 101]
              },
              {
                kind: 'account'
                path: 'mintMeme'
              }
            ]
          }
        },
        {
          name: 'tokenProgram'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'memeRatio'
          type: 'u64'
        },
        {
          name: 'claimRatio'
          type: 'u64'
        }
      ]
    },
    {
      name: 'create'
      discriminator: [24, 30, 200, 40, 5, 28, 7, 119]
      accounts: [
        {
          name: 'maker'
          writable: true
          signer: true
        },
        {
          name: 'mintM'
        },
        {
          name: 'makerAtaM'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'maker'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintM'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'memeRatio'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 101, 109, 101]
              },
              {
                kind: 'account'
                path: 'mintM'
              }
            ]
          }
        },
        {
          name: 'escrow'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [101, 115, 99, 114, 111, 119]
              },
              {
                kind: 'account'
                path: 'maker'
              },
              {
                kind: 'arg'
                path: 'taskId'
              }
            ]
          }
        },
        {
          name: 'vaultM'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'escrow'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintM'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'tokenProgram'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'taskId'
          type: 'u64'
        },
        {
          name: 'bonkAmount'
          type: 'u64'
        }
      ]
    },
    {
      name: 'deposit'
      discriminator: [242, 35, 198, 137, 82, 225, 242, 182]
      accounts: [
        {
          name: 'provider'
          writable: true
          signer: true
        },
        {
          name: 'providervault'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [118, 97, 117, 108, 116]
              },
              {
                kind: 'account'
                path: 'provider'
              }
            ]
          }
        },
        {
          name: 'ownership'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [
                  116,
                  98,
                  119,
                  95,
                  121,
                  97,
                  109,
                  105,
                  110,
                  111,
                  103,
                  101,
                  109,
                  117
                ]
              }
            ]
          }
        },
        {
          name: 'mintBonk'
        },
        {
          name: 'providerAtaBonk'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'provider'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintBonk'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'ownershipBonk'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'ownership'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintBonk'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'tokenProgram'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'bonkAmount'
          type: 'u64'
        }
      ]
    },
    {
      name: 'finalize'
      discriminator: [171, 61, 218, 56, 127, 115, 12, 217]
      accounts: [
        {
          name: 'prover'
          writable: true
          signer: true
        },
        {
          name: 'maker'
          writable: true
        },
        {
          name: 'escrow'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [101, 115, 99, 114, 111, 119]
              },
              {
                kind: 'account'
                path: 'maker'
              },
              {
                kind: 'account'
                path: 'escrow.task_id'
                account: 'escrow'
              }
            ]
          }
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: []
    },
    {
      name: 'init'
      discriminator: [220, 59, 207, 236, 108, 250, 47, 100]
      accounts: [
        {
          name: 'owner'
          writable: true
          signer: true
        },
        {
          name: 'ownership'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [
                  116,
                  98,
                  119,
                  95,
                  121,
                  97,
                  109,
                  105,
                  110,
                  111,
                  103,
                  101,
                  109,
                  117
                ]
              }
            ]
          }
        },
        {
          name: 'mintBonk'
        },
        {
          name: 'memeRatio'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 101, 109, 101]
              },
              {
                kind: 'account'
                path: 'mintBonk'
              }
            ]
          }
        },
        {
          name: 'tokenProgram'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: []
    },
    {
      name: 'refund'
      discriminator: [2, 96, 183, 251, 63, 208, 46, 46]
      accounts: [
        {
          name: 'maker'
          writable: true
          signer: true
          relations: ['escrow']
        },
        {
          name: 'mintM'
          relations: ['escrow']
        },
        {
          name: 'makerAtaM'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'maker'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintM'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'escrow'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [101, 115, 99, 114, 111, 119]
              },
              {
                kind: 'account'
                path: 'maker'
              },
              {
                kind: 'account'
                path: 'escrow.task_id'
                account: 'escrow'
              }
            ]
          }
        },
        {
          name: 'vaultM'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'escrow'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintM'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'tokenProgram'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: []
    },
    {
      name: 'setRatio'
      discriminator: [219, 52, 67, 220, 96, 132, 154, 161]
      accounts: [
        {
          name: 'owner'
          writable: true
          signer: true
          relations: ['ownership']
        },
        {
          name: 'mintMeme'
        },
        {
          name: 'ownership'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [
                  116,
                  98,
                  119,
                  95,
                  121,
                  97,
                  109,
                  105,
                  110,
                  111,
                  103,
                  101,
                  109,
                  117
                ]
              }
            ]
          }
        },
        {
          name: 'memeRatio'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 101, 109, 101]
              },
              {
                kind: 'account'
                path: 'mintMeme'
              }
            ]
          }
        },
        {
          name: 'tokenProgram'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'memeRatio'
          type: 'u64'
        },
        {
          name: 'claimRatio'
          type: 'u64'
        }
      ]
    },
    {
      name: 'take'
      discriminator: [149, 226, 52, 104, 6, 142, 230, 39]
      accounts: [
        {
          name: 'taker'
          writable: true
          signer: true
        },
        {
          name: 'maker'
          writable: true
          relations: ['escrow']
        },
        {
          name: 'mintMeme'
          relations: ['memeRatio']
        },
        {
          name: 'takerAtaT'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'taker'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintMeme'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'memeRatio'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 101, 109, 101]
              },
              {
                kind: 'account'
                path: 'mintMeme'
              }
            ]
          }
        },
        {
          name: 'escrow'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [101, 115, 99, 114, 111, 119]
              },
              {
                kind: 'account'
                path: 'maker'
              },
              {
                kind: 'account'
                path: 'escrow.task_id'
                account: 'escrow'
              }
            ]
          }
        },
        {
          name: 'vaultT'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'escrow'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintMeme'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'tokenProgram'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: []
    },
    {
      name: 'vaultClaim'
      discriminator: [248, 247, 50, 35, 235, 238, 104, 183]
      accounts: [
        {
          name: 'owner'
          writable: true
          signer: true
        },
        {
          name: 'maker'
          writable: true
          relations: ['escrow']
        },
        {
          name: 'mintMeme'
          relations: ['memeRatio']
        },
        {
          name: 'ownership'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [
                  116,
                  98,
                  119,
                  95,
                  121,
                  97,
                  109,
                  105,
                  110,
                  111,
                  103,
                  101,
                  109,
                  117
                ]
              }
            ]
          }
        },
        {
          name: 'memeRatio'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 101, 109, 101]
              },
              {
                kind: 'account'
                path: 'mintMeme'
              }
            ]
          }
        },
        {
          name: 'ownershipMeme'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'ownership'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintMeme'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'escrow'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [101, 115, 99, 114, 111, 119]
              },
              {
                kind: 'account'
                path: 'maker'
              },
              {
                kind: 'account'
                path: 'escrow.task_id'
                account: 'escrow'
              }
            ]
          }
        },
        {
          name: 'vaultMeme'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'escrow'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintMeme'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'tokenProgram'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: []
    },
    {
      name: 'winnerClaim'
      discriminator: [79, 151, 149, 106, 55, 70, 191, 121]
      accounts: [
        {
          name: 'winner'
          writable: true
          signer: true
          relations: ['escrow']
        },
        {
          name: 'maker'
          writable: true
          relations: ['escrow']
        },
        {
          name: 'owner'
          writable: true
          relations: ['ownership']
        },
        {
          name: 'mintBonk'
        },
        {
          name: 'mintMeme'
          relations: ['memeRatio']
        },
        {
          name: 'mintWin'
        },
        {
          name: 'ownership'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [
                  116,
                  98,
                  119,
                  95,
                  121,
                  97,
                  109,
                  105,
                  110,
                  111,
                  103,
                  101,
                  109,
                  117
                ]
              }
            ]
          }
        },
        {
          name: 'memeRatio'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 101, 109, 101]
              },
              {
                kind: 'account'
                path: 'mintMeme'
              }
            ]
          }
        },
        {
          name: 'escrow'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [101, 115, 99, 114, 111, 119]
              },
              {
                kind: 'account'
                path: 'maker'
              },
              {
                kind: 'account'
                path: 'escrow.task_id'
                account: 'escrow'
              }
            ]
          }
        },
        {
          name: 'winnerAtaWin'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'winner'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintWin'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'winnerAtaBonk'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'winner'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintBonk'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'vaultWin'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'escrow'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintWin'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'ownershipBonk'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'ownership'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintBonk'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'tokenProgram'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: []
    },
    {
      name: 'withdraw'
      discriminator: [183, 18, 70, 156, 148, 109, 161, 34]
      accounts: [
        {
          name: 'provider'
          writable: true
          signer: true
        },
        {
          name: 'providervault'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [118, 97, 117, 108, 116]
              },
              {
                kind: 'account'
                path: 'provider'
              }
            ]
          }
        },
        {
          name: 'ownership'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [
                  116,
                  98,
                  119,
                  95,
                  121,
                  97,
                  109,
                  105,
                  110,
                  111,
                  103,
                  101,
                  109,
                  117
                ]
              }
            ]
          }
        },
        {
          name: 'memeRatio'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 101, 109, 101]
              },
              {
                kind: 'account'
                path: 'mintMeme'
              }
            ]
          }
        },
        {
          name: 'mintMeme'
        },
        {
          name: 'providerAtaMeme'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'provider'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintMeme'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'ownershipMeme'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'ownership'
              },
              {
                kind: 'account'
                path: 'tokenProgram'
              },
              {
                kind: 'account'
                path: 'mintMeme'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'tokenProgram'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'removeAmount'
          type: 'u64'
        }
      ]
    }
  ]
  accounts: [
    {
      name: 'escrow'
      discriminator: [31, 213, 123, 187, 186, 22, 218, 155]
    },
    {
      name: 'memeRatio'
      discriminator: [226, 149, 151, 253, 175, 33, 72, 108]
    },
    {
      name: 'ownerCap'
      discriminator: [136, 155, 111, 45, 190, 70, 50, 208]
    },
    {
      name: 'providerVault'
      discriminator: [238, 112, 251, 254, 60, 98, 42, 3]
    }
  ]
  errors: [
    {
      code: 6000
      name: 'customError'
      msg: 'Custom error message'
    },
    {
      code: 6001
      name: 'alreadyFilledError'
      msg: 'Already filled, can not withdraw'
    },
    {
      code: 6002
      name: 'notFilledError'
      msg: 'Not filled, can not withdraw'
    },
    {
      code: 6003
      name: 'outOfClaimAmountError'
      msg: 'Out of claim amount'
    }
  ]
  types: [
    {
      name: 'escrow'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'taskId'
            type: 'u64'
          },
          {
            name: 'maker'
            type: 'pubkey'
          },
          {
            name: 'mintM'
            type: 'pubkey'
          },
          {
            name: 'mintT'
            type: 'pubkey'
          },
          {
            name: 'winner'
            type: 'pubkey'
          },
          {
            name: 'bonkAmount'
            type: 'u64'
          },
          {
            name: 'filled'
            type: 'bool'
          },
          {
            name: 'bump'
            type: 'u8'
          }
        ]
      }
    },
    {
      name: 'memeRatio'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'mintMeme'
            type: 'pubkey'
          },
          {
            name: 'claimRatio'
            type: 'u64'
          },
          {
            name: 'memeRatio'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'ownerCap'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'owner'
            type: 'pubkey'
          },
          {
            name: 'mintBonk'
            type: 'pubkey'
          },
          {
            name: 'totalBonk'
            type: 'u64'
          },
          {
            name: 'actualBonk'
            type: 'u64'
          },
          {
            name: 'bump'
            type: 'u8'
          }
        ]
      }
    },
    {
      name: 'providerVault'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'bonkAmount'
            type: 'u64'
          }
        ]
      }
    }
  ]
  constants: [
    {
      name: 'seed'
      type: 'string'
      value: '"anchor"'
    }
  ]
}
