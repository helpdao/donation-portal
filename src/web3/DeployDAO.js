import { ethers } from 'ethers';
import { currentNetwork, vars } from '../vars';
import contractAbi from './deployABI.json';

const filterAddresses = async (factory, transactionHash) => {
  const daoPromise = new Promise((resolve, reject) => {
    let daoFilter = factory.filters.DeployDao();
    factory.on(daoFilter, (daoAddress, event) => {
      if (event.transactionHash === transactionHash) {
        resolve(daoAddress)
      }
    })
  })

  const agentPromise = new Promise((resolve, reject) => {
    let agentFilter = factory.filters.InstalledApp();
    factory.on(agentFilter, (appProxy, appId, event) => {
      if (event.transactionHash === transactionHash && appId === vars[currentNetwork].agentAppId) {
        resolve(appProxy)
      }
    })
  })

  return Promise.all([daoPromise, agentPromise])
}

const deployDAO = async ({ creator, web3provider }) => {
  let provider = new ethers.providers.Web3Provider(web3provider);
  let signer = provider.getSigner();
  const factory = new ethers.Contract(vars[currentNetwork].templateFactory, contractAbi, signer);
  
  let deploymentTx = await factory.createDao(creator);
  const [daoAddress, agentAddress] = await filterAddresses(factory, deploymentTx.hash);

  return { daoAddress, agentAddress };
}

export default deployDAO