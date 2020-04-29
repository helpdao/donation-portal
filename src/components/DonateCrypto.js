import React, { useState, useEffect } from 'react'
import { Row, Col, Typography, Button, Spin, Form, InputNumber } from 'antd';
import { useWallet } from 'use-wallet';

import { sendDAI, getDAIBalance } from '../web3/tokens'
import RequireWallet from './RequireWallet';

const { Title, Text } = Typography;

const DonationForm = ({ donationAddress }) => {
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [daiBalance, setDAIBalance] = useState(null);
  const wallet = useWallet();

  async function onDeposit(data) {
    setSending(true);
    setError(null);
    try {
      await sendDAI(wallet.ethereum, data.amount, donationAddress);
      setSending(false);
    } catch(error) {
      console.error(error);
      setSending(false);
      setError(error);
    }
  }

  useEffect(() => {
    function reloadBalance() {
      getDAIBalance(wallet.ethereum, wallet.account)
        .then(balance => setDAIBalance(Number(balance)))
        .catch(console.error);
    }
    reloadBalance();

    const intervalid = setInterval(reloadBalance, 20000);
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
              { min: 1, type: 'number', message: "Amount too low" },
            ]}
          >
            <InputNumber min={0} max={daiBalance} />
          </Form.Item>

          {
            sending ?
              <Spin size="large" />
              :
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Donate
                </Button>
              </Form.Item>
          }

        </Form>
        {error &&
        <Row>
          <Text type="danger">
            <b>Error:</b>&nbsp;{error.message}
          </Text>
        </Row>
        }
        <Row>
          <Text type="secondary">
            DAI Balance: {daiBalance}
          </Text>
        </Row>
      </Col>
    </Row>
  )
};

const DonateCrypto = ({ squadDetails }) => {
  return(
    <>
      <Row style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Col>
          <Title level={2}>Donate cryptocurrencies</Title>
          <Text>The easiest way to donate to this squad is with cryptocurrencies, if you have some !</Text>
        </Col>
      </Row>
      <RequireWallet>
        <DonationForm donationAddress={squadDetails.donationAddress}/>
      </RequireWallet>
    </>
  );
};

export default DonateCrypto;