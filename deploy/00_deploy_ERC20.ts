import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deplyMyToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;
  log("deploying ERC20 Token Contract");
  const receipt = await deploy("MyToken", {
    from: deployer,
    args: [],
    log: true,
  });
  log("deployed MyToken contract at " + receipt.address);
};
export default deplyMyToken;
deplyMyToken.tags = ["all", "MyToken"];
