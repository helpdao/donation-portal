import React, { useState } from "react";
import Fortmatic from "fortmatic";
import { Button } from "antd";
import { Col, Typography } from "antd";
import { ethers } from 'ethers';
import { useWallet } from "use-wallet";
import { currentNetwork, vars } from '../../vars';
import deployDAO from '../../web3/DeployDAO';

import help from "../../assets/help.svg";

const { Title } = Typography;

const LaunchSquad = ({ onFinish }) => {
  const wallet = useWallet();
  const fortmatic = new Fortmatic(vars[currentNetwork].fortmatic);
  // For testing purposes only, you can replace wallet.balance
  // for balance and then use setBalance to simulate an ETH deposit
  const [balance, setBalance] = useState(0);
  window.setBalance = setBalance;

  const launchDAO = async () => {
    const { daoAddress, agentAddress } = await deployDAO({ creator: wallet.account, web3provider: wallet.ethereum });
    onFinish({ daoAddress, agentAddress });
  }

  return (
    <>
      <Col xs={24} sm={12}>
        <Title level={3}>Launch</Title>
        <p>
          To launch a help squad, a $20 deposit is needed.<br/>
          This is because of our payment providers.<br/>
          It will cost around $5 in network fees to launch the help squad.<br/>
          <b>The rest will be deposited directly on your own help squad, so you will be its first donor!</b>
        </p>
        {parseFloat(ethers.utils.formatEther(wallet.balance)) < 0.05 ? (
          <Button
            type="primary"
            onClick={() => fortmatic.user.deposit()}
          >
            Deposit $20
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => launchDAO()}
          >
            Launch help squad
          </Button>
        )}
      </Col>
      <Col xs={0} sm={12}>
        <img src={help} style={{ width: '100%' }} />
      </Col>
    </>
  );
};

export default LaunchSquad;