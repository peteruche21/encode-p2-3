import { expect } from "./chai";
// eslint-disable-next-line node/no-unpublished-import
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, deployments } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { CustomBallot, MyToken } from "../../typechain-types";

const PROPOSALS = ["proposal-1", "proposal-2", "proposal-3"];
const BASE_VOTE_POWER = 10;
const PROPOSAL_CHOSEN = [0, 1, 2];
const USED_VOTE_POWER = 5;
const ACCOUNTS_FOR_TESTING = 3;

describe("Ballot", function () {
  let ballotContract: CustomBallot;
  let tokenContract: MyToken;
  let accounts: SignerWithAddress[];

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    await deployments.fixture(["all"]);
    tokenContract = await ethers.getContract("MyToken");
  });

  describe("when voting power is given", async () => {
    it("updates votes correctly", async () => {
      const preMintVotePower = await tokenContract.getVotes(
        accounts[1].address
      );
      expect(preMintVotePower).to.eq(0);
      const mintTx = await tokenContract.mint(
        accounts[1].address,
        ethers.utils.parseEther(BASE_VOTE_POWER.toFixed(18))
      );
      await mintTx.wait();
      const postMintVotePower = await tokenContract.getVotes(
        accounts[1].address
      );
      expect(postMintVotePower).to.eq(0);
      const delegateTx = await tokenContract
        .connect(accounts[1])
        .delegate(accounts[1].address);
      await delegateTx.wait();
      const postDelegateVotePower = await tokenContract.getVotes(
        accounts[1].address
      );
      expect(Number(ethers.utils.formatEther(postDelegateVotePower))).to.eq(
        BASE_VOTE_POWER
      );
      const historicVotePower = await tokenContract.getPastVotes(
        accounts[1].address,
        2
      );
      expect(Number(ethers.utils.formatEther(historicVotePower))).to.eq(0);
    });
  });

  describe("when the ballot contract is deployed", async () => {
    beforeEach(async () => {
      await deployments.fixture(["all"]);
      ballotContract = await ethers.getContract("CustomBallot");
    });

    it("has the provided proposals", async () => {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
          PROPOSALS[index]
        );
      }
    });
  });

  for (let batch = 0; batch < ACCOUNTS_FOR_TESTING; batch++) {
    describe(`when tokens are minted for ${
      batch + 1
    } accounts of ${ACCOUNTS_FOR_TESTING}`, async () => {
      beforeEach(async () => {
        for (let index = 0; index <= batch; index++) {
          const mintTx = await tokenContract.mint(
            accounts[index + 1].address,
            BASE_VOTE_POWER
          );
          await mintTx.wait();
          const delegateTx = await tokenContract
            .connect(accounts[index + 1])
            .delegate(accounts[index + 1].address);
          await delegateTx.wait();
        }
      });

      describe("when a ballot is created", async () => {
        beforeEach(async () => {
          await deployments.fixture(["all"]);
          ballotContract = await ethers.getContract("CustomBallot");
        });

        for (let index = 0; index < ACCOUNTS_FOR_TESTING; index++) {
          describe(`when the account ${index + 1} votes`, async () => {
            const expectedVotes = [0, 0, 0];
            if (index < batch) {
              beforeEach(async () => {
                const voteTx = await ballotContract
                  .connect(accounts[index + 1])
                  .vote(PROPOSAL_CHOSEN[index], USED_VOTE_POWER);
                await voteTx.wait();
                expectedVotes[PROPOSAL_CHOSEN[index]] += USED_VOTE_POWER;
              });

              it("updates the votes for that proposal", async () => {
                const votedProposal = await ballotContract.proposals(
                  PROPOSAL_CHOSEN[index]
                );
                expect(votedProposal.voteCount).to.eq(
                  expectedVotes[PROPOSAL_CHOSEN[index]]
                );
              });
              it("updates the spent votes for that account", async () => {
                const spentVotes = await ballotContract.spentVotePower(
                  accounts[index + 1].address
                );
                expect(spentVotes).to.eq(USED_VOTE_POWER);
              });
            } else {
              it("fails", async () => {
                await expect(
                  ballotContract
                    .connect(accounts[index + 1])
                    .vote(PROPOSAL_CHOSEN[index], USED_VOTE_POWER)
                ).to.be.revertedWith("Has not enough voting power");
              });
            }
          });
        }
      });
    });
  }
});
