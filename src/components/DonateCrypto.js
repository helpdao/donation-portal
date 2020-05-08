import React, { useState } from 'react'
import { Row, Col, Typography, Button, Spin, Form, InputNumber } from 'antd';
import { useWallet } from 'use-wallet';

import { useBalance } from '../web3/hooks'
import { sendDAI } from '../web3/tokens'

import RequireWallet from './RequireWallet';

const { Text } = Typography;

const DonationForm = ({ donationAddress }) => {
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const daiBalance = useBalance('DAI');
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
      <Row>
        <Col>
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