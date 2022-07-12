# Report

## deploy

- command `yarn hardhat deploy --network goerli`
- **token contract**
- tx-hash "0xdcc73080677a61ecdd141fe34510c50b5f8c09cf357c429ea2a74ec6c05d7531"
- token contract address "0xA933829940db7Fc86AeF99C20E20408c573F51cD"
- **custom ballot contract**
- tx-hash - 0x2004d448e2f0e27e37b79ba4af34b2ccab8e6f0a77a4513aae0ca9628ccc26c6
- customBallot contract address - 0x3D1BA2979ac423BcCbc929bc2c3895c9408a332f

## mint

- command `yarn hardhat run scripts/CustomBallot/mint.ts --network goerli`
- tx-hash "0x050d05418d2920a8150eb4d30ad93dda33fd2ae721d9a94789ff5a4cc4b76175"
- output
  - Using address 0x0De11B6F33b3d0813004C99b3fF7Ff73c1e1F7a3
  - Wallet balance <big number>
  - assigning voting power to 0x7c0918D433356007199607fd8C106CdcdD4C5483
  - minting
  - minting complete, tx hash: 0x050d05418d2920a8150eb4d30ad93dda33fd2ae721d9a94789ff5a4cc4b76175

## delegate

- command `yarn hardhat run scripts/CustomBallot/delegate.ts --network goerli`
- tx-hash "0x608fcd7510beb8abe19aad6c1f9176e59b99eb923fafc1450796502f3a75d5dc"
- output
  - Using address 0x0De11B6F33b3d0813004C99b3fF7Ff73c1e1F7a3
  - Wallet balance <big number>
  - Attaching MyToken contract interface to address 0xA933829940db7Fc86AeF99C20E20408c573F51cD
  - delegating votes to 0x7c0918D433356007199607fd8C106CdcdD4C5483
  - Awaiting confirmations
  - Delegation completed. Hash: 0x608fcd7510beb8abe19aad6c1f9176e59b99eb923fafc1450796502f3a75d5dc
  - checking for vote power..
  - voting power for 0x7c0918D433356007199607fd8C106CdcdD4C5483 is  0
  
## vote

- command `yarn hardhat run scripts/CustomBallot/vote.ts --network goerli`
- tx-hash ""
- output
  - Using address 0x7c0918D433356007199607fd8C106CdcdD4C5483
  - Wallet balance <big number>
  - casting vote to CustomBallot from 0x7c0918D433356007199607fd8C106CdcdD4C5483
  - Awaiting confirmations
  - Transaction completed. Hash: 0x0d9d32bee152b01790f4941108c98e8fd5d7031e7e0e0c27a4247690093a039e

## get vote

- command `yarn hardhat run scripts/CustomBallot/getVote.ts --network goerli`
- output
  - Using address 0x7c0918D433356007199607fd8C106CdcdD4C5483
  - Wallet balance <big number>
  - fetching vote power for 0x7c0918D433356007199607fd8C106CdcdD4C5483
  - voting power is 0  

## query proposals

- command `yarn hardhat run scripts/CustomBallot/queryProposals.ts --network goerli`
- output
  - Using address 0x0De11B6F33b3d0813004C99b3fF7Ff73c1e1F7a3
  - Wallet balance <big number>
  - proposal 0 :  proposal-1
  - proposal 1 :  proposal-2
  - proposal 2 :  proposal-3
