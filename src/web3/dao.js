import { ethers } from 'ethers';
import votingABI from './erc20ABI.json';

/*

import { encodeCallScript } from '@aragon/test-helpers/evmScript'
import { encodeActCall } from '@aragon/toolkit'

import { currentNetwork, vars } from '../vars';
const daiAddress = vars[currentNetwork].daiAddress;

const encodeVote = async ({ financeAddress, receiverAddress, tokenAddress, amount, receipt }) => {
  const newImmediatePaymentSignature =
    'newImmediatePayment(address,address,uint256,string)';

  const calldata = await encodeActCall(newImmediatePaymentSignature, [
    tokenAddress,
    receiverAddress,
    amount,
    receipt,
  ]);

  const action = {
    to: financeAddress,
    calldata,
  };

  return encodeCallScript([action])
};
*/

export const createVote = async ( { ethereum, votingAddress, financeAddress, amount, receipt }) => {
  return;

  /*
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const receiverAddress = await signer.getAddress();
  const numberOfTokens = ethers.utils.parseUnits(String(amount), 18);

  const votingContract = new ethers.Contract(votingAddress, votingABI, signer);

  const script = await encodeVote({
    financeAddress,
    receiverAddress,
    tokenAddress: daiAddress,
    amount: numberOfTokens,
    receipt
  });
  const tx = await votingContract.newVote(script, receipt);

  const txReceipt = await provider.waitForTransaction(tx.hash);
  if(txReceipt.status === 0) {
    throw new Error('transaction-fail');
  }

  return tx;
  */
}