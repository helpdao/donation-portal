import React, { useState } from 'react'
import { Row, Col, Typography } from 'antd';

// import SubmitExpense from './SubmitExpense';
import RequireWallet from './RequireWallet';
import WalletBalances from './WalletBalances';
import WalletDetails from './WalletDetails';
import CashOut from './CashOut';

const { Title, Paragraph, Text } = Typography;

const SquadVolunteer = ({ squadDetails }) => {
  // const [submitExpenseModal, setSubmitExpenseModal] = useState(false);

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

      <Row style={{ paddingBottom: 8 }}>
        <Col>
        <Title level={3}>My personal wallet</Title>
        <Text>Here you will find some informations abut your cryptocurrency wallet.</Text>
        </Col>
      </Row>

      <RequireWallet>

        <Row gutter={16}>
          <Col sm={12} xs={24}>
            <WalletDetails />
          </Col>
          <Col sm={12} xs={24}>
            <WalletBalances />
          </Col>
        </Row>

        <Row style={{ paddingTop: 16 }}>
          <Col span={24}>
            <CashOut />
          </Col>
        </Row>

        {/*
        <Row gutter={16}>
          <Col>
            <Button type="primary" onClick={() => setSubmitExpenseModal(true)}>
              Submit expenses
            </Button>
          </Col>
        </Row>
        <Modal
          title="Submit expenses"
          visible={submitExpenseModal}
          onCancel={() => setSubmitExpenseModal(false)}
          footer={null}
        >
          <SubmitExpense squadDetails={squadDetails} />
        </Modal>
        */}

      </RequireWallet>
    </>
  );
};

export default SquadVolunteer;