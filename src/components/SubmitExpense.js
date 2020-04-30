import React, { useState } from 'react'
import { Row, Col, Typography, Input, Button, Spin, Form, InputNumber, Result } from 'antd';
import { useWallet } from 'use-wallet';

import { createVote } from '../web3/dao';

const { Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SubmitExpenseForm = ({ squadDetails }) => {
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const wallet = useWallet();

  async function onSubmit(data) {
    setSending(true);
    setError(null);
    try {
      await createVote({
        ethereum: wallet.ethereum,
        votingAddress: squadDetails.votingAddress, // TODO
        financeAddress: squadDetails.financeAddress, // TODO
        amount: data.amount,
        receipt: data.reason,
      });
      setSending(false);
      setSent(true);
    } catch(error) {
      console.error(error);
      setSending(false);
      setError(error);
    }
  }

  if(sent) {
    return (
      <Result
        status="success"
        title="Request submitted!"
        subTitle={'You need to wait that the squad evaluate your request and vote for its processing.'}
      />
    )
  }
  return (
    <Form
      name="submit-expenses"
      onFinish={onSubmit}
      {...layout}
    >
      <Form.Item
        label="Amount (DAI)"
        name="amount"
        rules={[
          { required: true, message: "Invalid amount" },
          { min: 0, type: 'number', message: "Amount too low" },
        ]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        label="Reason"
        name="reason"
        rules={[
          { required: true, message: "Please specify a reason for the request" },
        ]}
      >
        <Input min={0} />
      </Form.Item>

      {
        sending ?
          <Spin size="large" />
          :
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
      }

      {error &&
      <Text type="danger">
        <b>Error:</b>&nbsp;{error.message}
      </Text>
      }
    </Form>
  )
};

const SubmitExpense = ({ squadDetails }) => {
  return(
    <>
      <Row style={{ paddingBottom: 16 }}>
        <Col>
          <Text>Have you done some work for that squad and need to be refunded for your expenses ? Fill this form to ask for a payment from the squad !</Text>
        </Col>
      </Row>
      <SubmitExpenseForm daoAddress={squadDetails.daoAddress}/>
    </>
  );
};

export default SubmitExpense;