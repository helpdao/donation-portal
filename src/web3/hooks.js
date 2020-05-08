import { useEffect, useState } from 'react';
import { getTokenBalance } from './tokens';
import { useWallet } from 'use-wallet';
import BN from 'bignumber.js';

export function useBalance(token, pollInterval = 20000) {
  const wallet = useWallet();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    function reloadBalance() {
      if(wallet.connected) {
        if(token === 'ETH') {
          const balance = new BN(wallet.balance).div(10**18).toNumber();
          setBalance(balance);
        } else {
          getTokenBalance(wallet.ethereum, token, wallet.account)
            .then(balance => setBalance(Number(balance)))
            .catch(console.error);
        }
      }
    }
    reloadBalance();

    const intervalid = setInterval(reloadBalance, pollInterval);
    return () => clearInterval(intervalid);
  }, [wallet, token]);

  return balance;
}