import MooniWidget from '@mooni/widget';
import React, { useState, useEffect } from 'react'
import { Row, Col, Typography, Button, Spin, Form, InputNumber, Modal } from 'antd';

import SubmitExpense from './SubmitExpense';
import RequireWallet from './RequireWallet';
import { useWallet } from 'use-wallet';

const { Title, Text } = Typography;

const SquadVolunteer = ({ squadDetails }) => {
  const wallet = useWallet();

  const [mooni, setMooni] = useState(null);
  const [submitExpenseModal, setSubmitExpenseModal] = useState(false);

  useEffect(() => {
    setMooni(new MooniWidget({
      web3Provider: wallet.ethereum,
    }));
  }, []);

  return(
    <>
      <Row gutter={32} style={{ paddingTop: 32, paddingBottom: 16 }}>
        <Col>
          <Title level={2}>Volunteers</Title>
          <Text>Do you want to volunteer for this squad ?</Text>
        </Col>
      </Row>
      <RequireWallet>
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