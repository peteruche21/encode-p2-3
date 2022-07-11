import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "ethers";

const PROPOSALS = ["proposal-1", "proposal-2", "proposal-3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

const deployCustomBallot: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;
  const tokenContract = await (await deployments.get("MyToken")).address;
  log("deploying CustomBallot");
  const receipt = await deploy("CustomBallot", {
    from: deployer,
    args: [convertStringArrayToBytes32(PROPOSALS), tokenContract],
    log: true,
  });
  log("deployed CustomBallot contract at " + receipt.address);
};
export default deployCustomBallot;
deployCustomBallot.tags = ["all", "CustomBallot"];
