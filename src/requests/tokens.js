const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';

export const getBalance = async (donationAddress) => {
  let res = await fetch(`https://api.tokenbalance.com/token/${daiAddress}/${donationAddress}`);
  let data = await res.json();
  return data.balance;
}
