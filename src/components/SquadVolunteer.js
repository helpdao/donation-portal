import MooniWidget from '@mooni/widget';
import React, { useState, useLayoutEffect, useRef } from 'react'
import { Row, Col, Typography, Button, Spin, Form, InputNumber, Modal } from 'antd';

import SubmitExpense from './SubmitExpense';
import RequireWallet from './RequireWallet';
import { useWallet } from 'use-wallet';
import { useBalance } from '../web3/hooks';
import BN from 'bignumber.js';

const { Title, Paragraph } = Typography;

const SquadVolunteer = ({ squadDetails }) => {
  const wallet = useWallet();
  const daiBalance = useBalance('DAI');
  const ethBalance = useBalance('ETH');

  const [mooni, setMooni] = useState(null);
  const [submitExpenseModal, setSubmitExpenseModal] = useState(false);

  useLayoutEffect(() => {
    setMooni(new MooniWidget({
      web3Provider: wallet.ethereum,
    }));
  }, []);

  return(
    <>
      <Row gutter={32} style={{ paddingTop: 32, paddingBottom: 16 }}>
        <Col>
          <Title level={2}>Volunteers</Title>
          <Title level={4}>Do you want to volunteer for this squad ?</Title>
          <Paragraph>Please head over <a href={squadDetails.inviteLink} target="_blank" rel="noopener noreferrer">the chat of this team</a> to find out how you can help.</Paragraph>
          <Paragraph>If you want to be refunded for expenses or compensated for work, you can ask them, and if the community accepts you will earn cryptocurrencies in your personal wallet..</Paragraph>
          <Paragraph>You can find the address of your personal wallet here. Once you have received the funds, you can come back here and cash out to tranfers funds from your cryptocurrency wallet to your bank account.</Paragraph>
        </Col>
      </Row>
      <Title level={3}>My personal wallet</Title>

      <RequireWallet>

        <Row style={{ paddingBottom: 16 }}>
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

        <Row gutter={16}>
          <Col>
            <Button type="primary" onClick={() => setSubmitExpenseModal(true)}>
              Submit expenses
            </Button>
          </Col>
          {mooni && <Col>
            <Button type="secondary" onClick={() => mooni.open()}>
              Cash out cryptocurrencies
            </Button>
          </Col>}
        </Row>
        <Modal
          title="Submit expenses"
          visible={submitExpenseModal}
          onCancel={() => setSubmitExpenseModal(false)}
          footer={null}
        >
          <SubmitExpense squadDetails={squadDetails} />
        </Modal>
      </RequireWallet>
    </>
  );
};

export default SquadVolunteer;