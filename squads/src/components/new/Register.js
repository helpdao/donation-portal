import React from "react";
import { useWallet, UseWalletProvider } from "use-wallet";
import { Button, Alert } from "antd";
import { Row, Col, Typography } from "antd";

import signup from "../../assets/signup.svg";
import "../styles/styles.css";

const { Title } = Typography;

const NewSquad = (props) => {
  const wallet = useWallet();

  const isConnected = () => {
    if (wallet.account !== null) {
      document.location.href = "#init-squad";
      localStorage.setItem("fortmatic", wallet.account);
      return <Alert message="Account connected!" type="success" />;
    }
  };
  return (
    <Row gutter={64}>
      <Col md={24} lg={12}>
        <Title level={3}>Register</Title>
        <p>
          In order to launch a help squad, you will need to sign up.
          You can use your email or phone number.
          After that, you need to purchase ETH by:
          <ol>
            <li>1. Going into x</li>
            <li>2. Doing Y</li>
            <li>3. Doing Y</li>
          </ol>
          Then you can proceed to the next step!
        </p>
        {wallet.connected ? (
          isConnected()
        ) : wallet.activating !== null ? (
          <div className="spinner-border red" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <Button
            onClick={() => wallet.activate("fortmatic")}
          >
            Register
          </Button>
        )}
      </Col>
      <Col md={24} lg={12}>
        <img src={signup} style={{ width: '100%' }} />
      </Col>
    </Row>
  );
};

export default (props) => {
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        // This is how connectors get configured
        fortmatic: { apiKey: "pk_live_C11CB41780801641" },
      }}
    >
      <NewSquad />
    </UseWalletProvider>
  );
};
