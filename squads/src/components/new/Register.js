import React from "react";
import { useWallet, UseWalletProvider } from "use-wallet";
import { Button, Alert } from "antd";
import { Col, Typography, Spin } from "antd";

import signup from "../../assets/signup.svg";

const { Title } = Typography;

const NewSquad = ({ parentCallback }) => {
  const wallet = useWallet();

  const isConnected = () => {
    if (wallet.account !== null) {
      localStorage.setItem("ethAddress", wallet.account);
      parentCallback()
    }
  };
  return (
    <>
      <Col xs={24} sm={12}>
        <Title level={3}>Register</Title>
        <p>
          In order to launch a help squad, you will need to sign up.
          You can use your email or phone number.
        </p>
        {wallet.connected ? (
          isConnected()
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

export default (props) => {
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        fortmatic: { apiKey: "pk_live_C11CB41780801641" },
      }}
    >
      <NewSquad parentCallback={() => props.onCompletedRegister()}/>
    </UseWalletProvider>
  );
};
