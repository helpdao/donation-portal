import { ethers } from 'ethers';
import { currentNetwork, vars } from '../vars.json';
import contractAbi from './abi.json';

const deployDAO = async ({ creator, web3provider }) => {
  const factory = new ethers.Contract(vars[currentNetwork].templateFactory, contractAbi, web3provider);

  let deploymentTx = await factory.createDao(creator);
  await deploymentTx.wait();

  window.deploymentTx = deploymentTx;

  const agentAddress = '0x';

  return { agentAddress };
}

export default deployDAO