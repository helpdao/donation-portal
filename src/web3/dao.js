import { ethers } from 'ethers';

import { currentNetwork, vars } from '../vars.json';
const daiAddress = vars[currentNetwork].daiAddress;

// TODO
const financeABI = [];

export const createVote = async (ethereum, daoAddress, data) => {
  const { amount, reason } = data;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const recipient = await signer.getAddress();
  const numberOfTokens = ethers.utils.parseUnits(String(amount), 18);

  // TODO
  const financeContract = new ethers.Contract(daoAddress, financeABI, signer);

  const tx = await financeContract.newImmediatePayment(daiAddress, recipient, numberOfTokens, reason)
  const receipt = await provider.waitForTransaction(tx.hash);
  if(receipt.status === 0) {
    throw new Error('transaction-fail');
  }

  return tx;
}