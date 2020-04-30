import React from 'react';
import { Row, Col, Typography } from 'antd';
import BN from 'bignumber.js';
import { useBalance } from '../web3/hooks';

const { Title } = Typography;

export default function WalletBalances({ }) {
  const daiBalance = useBalance('DAI');
  const ethBalance = useBalance('ETH');

  return (
    <Row style={{ paddingBottom: 8 }}>
      <Col>
        <Row>
          <Title level={4}>Wallet balances</Title>
        </Row>
        <Row>
          {daiBalance && new BN(daiBalance).dp(4).toNumber()} DAI
        </Row>
        <Row>
          {ethBalance && new BN(ethBalance).dp(4).toNumber()} ETH
        </Row>
      </Col>
    </Row>
  );
}
