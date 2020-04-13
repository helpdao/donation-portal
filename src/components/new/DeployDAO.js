import ethers from 'ethers';

const templateFactory = '0xxxx';
const contractAbi = {};

const deployDAO = async ({ creator, web3provider }) => {
  const factory = new ethers.Contract(templateFactory, contractAbi, web3provider);

  let deploymentTx = await factory.createDao(creator);
  await deploymentTx.wait();

  const agentAddress = '0x';

  return { agentAddress };
}

export default deployDAO