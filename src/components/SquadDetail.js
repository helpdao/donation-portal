import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import { squadDetails } from "../requests";
import { Statistic, Row, Col, Button, PageHeader, Tag, Menu, Dropdown, Typography } from 'antd';
import { DownOutlined, CreditCardOutlined, CalculatorOutlined } from '@ant-design/icons';

const { Text } = Typography;

const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';

const SquadDetails = props => {
  const { squadId } = props.match.params;
  const [details, setDetails] = useState({});
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function getDetails() {
      try {
        const result = await squadDetails(squadId);
        if (result.data && result.data.squad) {
          setDetails(result.data.squad);
        }
        let balance = await getBalance()
        setBalance(balance);
      } catch (err) {
        console.log(err)
      }
    }
    getDetails();
  }, [squadId]);

  const getBalance = async () => {
    let res = await fetch(`https://api.tokenbalance.com/token/${daiAddress}/${details.daoAddress}`);
    let data = await res.json();
    return data.balance;
  }

  const donationMenu = (
    <Menu>
      <Menu.Item key="1">
        <a href={`https://pay.sendwyre.com/purchase?destCurrency=DAI&paymentMethod=debit-card&dest=${details.daoAddress}&redirectUrl=http://localhost:3000/squad/${details._id}`} target="_blank" rel="noopener noreferrer">
          <CreditCardOutlined />
          <Text strong style={{ marginLeft: 8 }}>Credit and debit card</Text>
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href={`https://buy.ramp.network?swapAsset=DAI&userAddress=${details.daoAddress}`} target="_blank" rel="noopener noreferrer">
          <CalculatorOutlined />
          <Text strong style={{ marginLeft: 8 }}>Bank account - 🇪🇺🇬🇧</Text>
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ marginTop: 32, marginBottom: 32 }}>
      <PageHeader
        onBack={() => document.location.href="/"}
        title={details.name}
        tags={details.verified ? <Tag color="green">Verified</Tag> : ''}
        extra={[
          <Button href={details.inviteLink} target="_blank" rel="noopener noreferrer">Join the chat</Button>,
          <Dropdown overlay={donationMenu} placement="bottomRight">
            <Button type="primary">
              Donate <DownOutlined />
            </Button>
          </Dropdown>
        ]}
        style={{ padding: 0 }}
      ></PageHeader>

      <Row style={{ marginTop: 32, marginBottom: 32 }} gutter={64}>
        <Col xs={24} sm={24} md={16}>
          <ReactMarkdown source={details.description}></ReactMarkdown>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Statistic title="Current balance" prefix="$" value={balance} precision={2} valueStyle={{ color: '#3f8600' }} />
          <a href={`https://mainnet.aragon.org/#/${details.daoAddress}`} target="_blank" rel="noopener noreferrer">
            Check finances →
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default SquadDetails;
