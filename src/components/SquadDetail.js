import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import { currentNetwork } from '../vars.json';
import { squadDetails } from "../requests";
import { Statistic, Row, Col, Button, PageHeader, Tag, Menu, Dropdown, Typography, Result } from 'antd';
import { DownOutlined, CreditCardOutlined, CalculatorOutlined } from '@ant-design/icons';
import SquadShare from './SquadShare'

const { Text, Title } = Typography;

const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';

const SquadDetails = props => {
  const { squadId } = props.match.params;
  const [details, setDetails] = useState({});
  const [balance, setBalance] = useState(0);
  const [donation, setDonation] = useState(false);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    setDonation(urlParams.get('donation') === 'true');
    setLaunched(urlParams.get('launched') === 'true');

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
    getDetails();
  }, [squadId]);

  const getBalance = async (donationAddress) => {
    let res = await fetch(`https://api.tokenbalance.com/token/${daiAddress}/${donationAddress}`);
    let data = await res.json();
    return data.balance;
  }

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
    </Menu>
  );

  return (
    <>
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

      {launched ? (
        <Result
          status="success"
          title="Help squad launched!"
          subTitle={`You have successfully launched ${details.name}. This is your help squad's very own profile page. Share it now!`}
          extra={[
            <SquadShare/>,
            <Row justify="center">
              <Button type="primary" key="next">What's next?</Button>
            </Row>,
            
          ]}
        />
      ) : ''}

      {donation ? (
        <Result
          status="success"
          title="Thanks for donating!"
          subTitle={`You have successfully donated to ${details.name}. Thank you!`}
        />
      ) : ''}

      <Row style={{ marginTop: 32, marginBottom: 32 }} gutter={64}>
        <Col xs={{ span: 24, order: 1 }} sm={{ span: 24, order: 1 }} md={{ span: 16, order: 0 }}>
          <ReactMarkdown source={details.description}></ReactMarkdown>
          {!launched ? (
            <>
              <Title level={3}>Share</Title>
              <SquadShare></SquadShare>
            </>
          ) : ''}
        </Col>
        <Col xs={{ span: 24, order: 0 }} sm={{ span: 24, order: 0 }} md={{ span: 8, order: 1 }} style={{ textAlign: 'right' }}>
          <Statistic title="Current balance" prefix="$" value={balance} precision={2} valueStyle={{ color: '#3f8600' }} />
          <a href={`https://${currentNetwork}.aragon.org/#/${details.daoAddress}`} target="_blank" rel="noopener noreferrer">
            Check finances →
          </a>
        </Col>
      </Row>
    </>
  );
};

export default SquadDetails;
