import { Contract, ethers } from "ethers";
import { deployments } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { CustomBallot } from "../../typechain-types";

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY as string);
  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("goerli");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  const customBallotAddress = await (
    await deployments.get("CustomBallot")
  ).address;
  const customBallotInterface = await (
    await deployments.get("CustomBallot")
  ).abi;

  const customBallotContract: CustomBallot = new Contract(
    customBallotAddress,
    customBallotInterface,
    signer
  ) as CustomBallot;

  for (let i = 0; i < 3; i++) {
    const ballotProposal = await customBallotContract.proposals(i);
    const proposal = ethers.utils.parseBytes32String(ballotProposal.name);
    console.log(`proposal ${i} :  ${proposal}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
