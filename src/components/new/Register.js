import React from "react";
import { Button } from "antd";
import { Col, Typography, Spin } from "antd";
import { useWallet } from "use-wallet";

import signup from "../../assets/signup.svg";

const { Title } = Typography;

const Register = ({ onFinish }) => {
  const wallet = useWallet();

  return (
    <>
      <Col xs={24} sm={12}>
        <Title level={3}>Register</Title>
        <p>
          In order to launch a help squad, you will need to sign up.
          You can use your email or phone number.
        </p>
        {wallet.connected ? (
          onFinish()
        ) : wallet.activating !== null ? (
          <Spin size="large" />
        ) : (
          <Button
            type="primary"
            onClick={() => wallet.activate("fortmatic")}
          >
            Register
          </Button>
        )}
      </Col>
      <Col xs={0} sm={12}>
        <img src={signup} style={{ width: '100%' }} />
      </Col>
    </>
  );
};

export default Register;