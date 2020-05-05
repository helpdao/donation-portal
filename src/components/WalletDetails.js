import React from 'react';
import { Row, Col, Input, Typography } from 'antd';
import { useWallet } from 'use-wallet';

const { Title, Text } = Typography;

export default function WalletDetails({ }) {
  const wallet = useWallet();

  return (
    <Row style={{ paddingBottom: 8 }}>
      <Col span={24}>
        <Title level={4}>Wallet details</Title>
        Your address
        <br/>
        <Row>
          <Col span={18}>
            <Input disabled value={wallet.account} />
          </Col>
          <Col span={6}>
            <Row  justify="center" align="center">
              <Text strong copyable={{ text: wallet.account }} ellipsis>Copy</Text>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
