import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { squadDetails } from "../requests";
import { Row, Col, Button, PageHeader, Tag, Menu, Dropdown, Typography, Modal, Skeleton } from 'antd';
import { DownOutlined, CreditCardOutlined, CalculatorOutlined, WalletOutlined } from '@ant-design/icons';
import SquadDetails from '../components/SquadDetail';
import SquadVolunteer from '../components/SquadVolunteer';
import { getBalance } from '../web3/tokens';
import DonateCrypto from '../components/DonateCrypto';

const { Text } = Typography;

const SquadPage = () => {
  let { squadId } = useParams();
  const [details, setDetails] = useState({});
  const [balance, setBalance] = useState(0);
  const [donateCryptoModal, setDonateCryptoModal] = useState(false);

  useEffect(() => {
    async function getDetails() {
      try {
        const result = await squadDetails(squadId);
        if (result.data && result.data.squad) {
          setDetails(result.data.squad);
          let balance = await getBalance(result.data.squad.donationAddress)
          setBalance(balance);
        }
      } catch (err) {
        console.log(err)
      }
    }
    getDetails().catch(console.error);
  }, [squadId]);

  const donationMenu = (
    <Menu>
      <Menu.Item key="1">
        <a href={`https://pay.sendwyre.com/purchase?destCurrency=DAI&paymentMethod=debit-card&dest=${details.donationAddress}&redirectUrl=${window.location.origin}/squad/${details._id}?donation=true`} target="_blank" rel="noopener noreferrer">
          <CreditCardOutlined />
          <Text strong style={{ marginLeft: 8 }}>Credit and debit card</Text>
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href={`https://buy.ramp.network?swapAsset=DAI&userAddress=${details.donationAddress}`} target="_blank" rel="noopener noreferrer">
          <CalculatorOutlined />
          <Text strong style={{ marginLeft: 8 }}>Bank account - 🇪🇺🇬🇧</Text>
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <a onClick={() => setDonateCryptoModal(true)}>
          <WalletOutlined />
          <Text strong style={{ marginLeft: 8 }}>Cryptocurrency</Text>
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Skeleton loading={!details.name} active={!details.name} >
        <PageHeader
          onBack={() => document.location.href="/"}
          title={details.name}
          tags={details.verified ? <Tag color="green">Verified</Tag> : ''}
          extra={[
            <Button key="1" href={details.inviteLink} target="_blank" rel="noopener noreferrer">Join the chat</Button>,
            <Dropdown key="2"  overlay={donationMenu} placement="bottomRight">
              <Button type="primary">
                Donate <DownOutlined />
              </Button>
            </Dropdown>
          ]}
          style={{ padding: 0 }}
        />

        <Row style={{ marginTop: 32, marginBottom: 128 }}>
          <Col>
            <SquadDetails squadDetails={details} balance={balance} />
            <SquadVolunteer squadDetails={details} />
          </Col>
        </Row>
      </Skeleton>

      <Modal
        title="Donate cryptocurrencies"
        visible={donateCryptoModal}
        onCancel={() => setDonateCryptoModal(false)}
        footer={null}
      >
        <DonateCrypto squadDetails={details} />
      </Modal>
    </>
  );
};

export default SquadPage;
