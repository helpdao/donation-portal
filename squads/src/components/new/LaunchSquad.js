import React from "react";
import { useWallet, UseWalletProvider } from "use-wallet";
import { Button, Alert } from "antd";
import { Row, Col, Typography, Spin } from "antd";

import help from "../../assets/help.svg";

const { Title } = Typography;

const LaunchSquad = ({ parentCallback }) => {
  const wallet = useWallet();

  const isConnected = () => {
    if (wallet.account !== null) {
      localStorage.setItem("fortmatic", wallet.account);
      parentCallback()
    }
  };
  return (
    <>
      <Col xs={24} sm={12}>
        <Title level={3}>Launch</Title>
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
            Launch help squad
          </Button>
        )}
      </Col>
      <Col xs={0} sm={12}>
        <img src={help} style={{ width: '100%' }} />
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
      <LaunchSquad parentCallback={() => props.onCompletedRegister()}/>
    </UseWalletProvider>
  );
};
