import React, { useState, useEffect } from 'react';
import { useWallet } from 'use-wallet';
import { Button, Spin, Row, Col } from 'antd';

export default function RequireWallet({ children }) {
  const [menuChoice, setMenuChoice] = useState('init');
  const wallet = useWallet();

  const activate = (connector) => () =>{
    wallet.activate(connector).catch(console.error)
  };

  if(wallet.connected) {
    return children;
  }

  if(wallet.activating) {
    return (
      <Spin size="large" />
    )
  }

  if(menuChoice === 'init') {
    return (
      <Row>
        <Col>
          <Button
            type="primary"
            onClick={() => setMenuChoice('have-wallet')}
          >
            Connect wallet
          </Button>
        </Col>
      </Row>
    )
  }
  else if(menuChoice === 'have-wallet') {
    return (
      <Row gutter={16}>
        <Col>
          <Button
            type="primary"
            onClick={() => setMenuChoice('wallet-choice')}
          >
            I have a wallet
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={activate("fortmatic")}
          >
            I don't have a wallet
          </Button>
        </Col>
      </Row>
    )
  }
  else if(menuChoice === 'wallet-choice') {
    return (
      <Row>
        <Row gutter={16}>
          <Col>
            <Button
              type="primary"
              onClick={activate("injected")}
            >
              Metamask
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={activate("fortmatic")}
            >
              Fortmatic
            </Button>
          </Col>
        </Row>
      </Row>
    )
  }
  else {
    return <div>?</div>;
  }
}