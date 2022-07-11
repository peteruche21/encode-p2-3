import { Contract, ethers } from "ethers";
import { deployments, getNamedAccounts } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { CustomBallot } from "../../typechain-types";

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY_USER as string);
  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("goerli");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  const { deployer } = await getNamedAccounts();
  const CustomBallotAddress = await (
    await deployments.get("CustomBallot")
  ).address;
  const CustomBallotInterface = await (
    await deployments.get("CustomBallot")
  ).abi;

  const CustomBallotContract: CustomBallot = new Contract(
    CustomBallotAddress,
    CustomBallotInterface,
    signer
  ) as CustomBallot;

  console.log(`casting vote to CustomBallot from ${deployer}`);
  const amount = 0;
  const tx = await CustomBallotContract.vote(
    1,
    ethers.utils.parseEther(amount.toFixed(18))
  );
  console.log("Awaiting confirmations");
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
