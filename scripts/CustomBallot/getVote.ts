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

  const tokenContractAddress = await (await deployments.get("MyToken")).address;
  const tokenContractInterface = await (await deployments.get("MyToken")).abi;
  const { user } = await getNamedAccounts();

  const tokenContract: MyToken = new Contract(
    tokenContractAddress,
    tokenContractInterface,
    signer
  ) as MyToken;

  console.log(`fetching vote power for ${user}`);
  const VotePower = await tokenContract.getVotes(user);
  console.log(`voting power is ${VotePower}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
