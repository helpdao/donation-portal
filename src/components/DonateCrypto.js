import React, { useState, useEffect } from 'react'
import { Row, Col, Typography, Button, Spin, Form, InputNumber } from 'antd';
import { useWallet } from 'use-wallet';

import { sendDAI, getDAIBalance } from '../web3/tokens'

const { Title, Text } = Typography;

const ConnectWallet = () => {
  const wallet = useWallet();

  return(
    <Row gutter={32} style={{ paddingTop: 32, paddingBottom: 16 }}>
      <Col>
        {
          wallet.activating ?
            <Spin size="large" />
            :
            <Button
              type="primary"
              onClick={() => wallet.activate("fortmatic")}
            >
              Connect wallet
            </Button>
        }
      </Col>
    </Row>
  );
}

const DonationForm = ({ donationAddress }) => {
  const [error, setError] = useState(null);
  const [daiBalance, setDAIBalance] = useState(null);
  const wallet = useWallet();

  async function onDeposit(data) {
    setError(null);
    try {
      await sendDAI(wallet.ethereum, data.amount, donationAddress);
    } catch(error) {
      console.error(error);
      setError(error);
    }
  }

  useEffect(() => {
    function reloadBalance() {
      getDAIBalance(wallet.ethereum, wallet.account)
        .then(balance => setDAIBalance(Number(balance)))
        .catch(console.error);
    }

    const intervalid = setInterval(reloadBalance, 5000);
    reloadBalance();

    return () => clearInterval(intervalid);
  }, [wallet]);

  if(daiBalance === null) {
    return(
      <Spin size="large" />
    )
  }

  return (
    <Row>
      <Col>
        <Form name="donate" onFinish={onDeposit} layout="inline">
          <Form.Item
            label="Amount (DAI)"
            name="amount"
            rules={[
              { required: true, message: "Invalid amount" },
              { max: daiBalance, type: 'number', message: "Insuffisent balance" },
              { min: 0.1, type: 'number', message: "Amount too low" },
            ]}
          >
            <InputNumber min={0} max={daiBalance} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Donate
            </Button>
          </Form.Item>
        </Form>
        {error && error.message}
        DAI Balance: {daiBalance}
      </Col>
    </Row>
  )
};

const DonateCrypto = ({ squadDetails }) => {
  const wallet = useWallet();

  return(
    <>
      <Row gutter={32} style={{ paddingTop: 32, paddingBottom: 16 }}>
        <Col>
          <Title level={2}>Donate cryptocurrencies</Title>
          <Text>The easiest way to donate to this squad is with cryptocurrencies, if you have some !</Text>
        </Col>
      </Row>
      {wallet.connected ?
        <DonationForm donationAddress={squadDetails.donationAddress}/>
        :
        <ConnectWallet />
      }
    </>
  );
};

export default DonateCrypto;