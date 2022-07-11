# Report

## deploy

- command `yarn hardhat deploy --network goerli`
- tx-hash "0x66cc3f888531aa0151c48ddf43d2a029306ff9fa7b97631d6614577f742a121e"
- contract address "0xAA4e13c38ACc5652dcde7affA8745D5c2e2f5eab"

## give right to vote

- command `yarn hardhat run scripts/Ballot/giveVotingRights.ts --network goerli`
- tx-hash "0x95c81cccb17e16d97aabae02a8f16250cdf59c1daecda988470b239df6be54a7"
- output
  - Using address 0x0De11B6F33b3d0813004C99b3fF7Ff73c1e1F7a3
  - Wallet balance <big number>
  - Attaching ballot contract interface to address 0xAA4e13c38ACc5652dcde7affA8745D5c2e2f5eab
  - Giving right to vote to 0x7c0918D433356007199607fd8C106CdcdD4C5483
  - Awaiting confirmations
  - Transaction completed. Hash: 0x95c81cccb17e16d97aabae02a8f16250cdf59c1daecda988470b239df6be54a7

## vote

- command `yarn hardhat run scripts/Ballot/vote.ts --network goerli`
- tx-hash "0x2bf9aa2b4564f52784efd777572c689187ded9e978a627438fe11e83d667b0d8"
- output
  - Using address 0x0De11B6F33b3d0813004C99b3fF7Ff73c1e1F7a3
  - Wallet balance <big number>
  - Attaching ballot contract interface to address 0xAA4e13c38ACc5652dcde7affA8745D5c2e2f5eab
  - casting vote to ballot from 0x0De11B6F33b3d0813004C99b3fF7Ff73c1e1F7a3
  - Awaiting confirmations
  - Transaction completed. Hash: 0x2bf9aa2b4564f52784efd777572c689187ded9e978a627438fe11e83d667b0d8

## delegate

- command `yarn hardhat run scripts/Ballot/delegateVote.ts --network goerli`
- tx-hash ""
- output
  - Using address 0x0De11B6F33b3d0813004C99b3fF7Ff73c1e1F7a3
  - Wallet balance <big number>
  - Attaching ballot contract interface to address 0xAA4e13c38ACc5652dcde7affA8745D5c2e2f5eab
  - delegating votes to 0x7c0918D433356007199607fd8C106CdcdD4C5483
  - **ERROR** - "you have already voted"

## get voting result

- command `yarn hardhat run scripts/Ballot/getVotingResult.ts --network goerli`
- output
  - Using address 0x0De11B6F33b3d0813004C99b3fF7Ff73c1e1F7a3
  - Wallet balance <big number>
  - Attaching ballot contract interface to address 0xAA4e13c38ACc5652dcde7affA8745D5c2e2f5eab
  - fetching winning proposals
  - winner is #1 "proposal-2"
  - Completed.
  