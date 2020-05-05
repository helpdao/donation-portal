import BN from 'bignumber.js';
import { ethers } from 'ethers';
import erc20ABI from './erc20ABI.json';

import { currentNetwork, vars } from '../vars.json';

const daiAddress = vars[currentNetwork].daiAddress;

export const getBalance = async (donationAddress) => {
  let res = await fetch(`https://api.tokenbalance.com/token/${daiAddress}/${donationAddress}`);
  let data = await res.json();
  return data.balance;
}

export const getDAIBalance = async (ethereum, address) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const tokenContract = new ethers.Contract(daiAddress, erc20ABI, provider);
  const tokenBalance = await tokenContract.balanceOf(address);
  return new BN(tokenBalance.toString()).div(10**18).toString();
}

export const sendDAI = async (ethereum, daiAmount, toAddress) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(daiAddress, erc20ABI, signer);

  const numberOfTokens = ethers.utils.parseUnits(String(daiAmount), 18);

  const senderAddress = await signer.getAddress();
  const tokenBalance = await tokenContract.balanceOf(senderAddress);
  if(numberOfTokens.gt(tokenBalance)) {
    throw new Error('token-balance-too-low');
  }

  const tx = await tokenContract.transfer(toAddress, numberOfTokens);
  const receipt = await provider.waitForTransaction(tx.hash);
  if(receipt.status === 0) {
    throw new Error('transaction-fail');
  }
}