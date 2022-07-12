import { Contract, ethers } from "ethers";
import { deployments, getNamedAccounts } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { MyToken } from "../../typechain-types";

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
  const { deployer, user } = await getNamedAccounts();
  const tokenContractAddress = await (await deployments.get("MyToken")).address;
  const tokenContractInterface = await (await deployments.get("MyToken")).abi;

  console.log(
    `Attaching MyToken contract interface to address ${tokenContractAddress}`
  );

  const tokenContract: MyToken = new Contract(
    tokenContractAddress,
    tokenContractInterface,
    signer
  ) as MyToken;

  console.log(`delegating votes to ${user}`);
  const tx = await tokenContract.delegate(user);
  console.log("Awaiting confirmations");
  await tx.wait();
  console.log(`Delegation completed. Hash: ${tx.hash}`);
  console.log("checking for vote power..");
  const votingPower = await tokenContract.getVotes(user);
  const formattedVotingPower = Number(ethers.utils.formatEther(votingPower));
  console.log(`voting power for ${user} is `, formattedVotingPower);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
