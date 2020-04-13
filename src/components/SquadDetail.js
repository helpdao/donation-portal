import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import { squadDetails } from "../requests";
import { Statistic, Row, Col, Button, PageHeader, Tag, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const SquadDetails = props => {
  const { squadId } = props.match.params;
  const [details, setDetails] = useState({});
  const [donation, setDonation] = useState(false);

  useEffect(() => {
    async function getDetails() {
      try {
        const result = await squadDetails(squadId);
        if (result.data && result.data.squad) {
          setDetails(result.data.squad);
          setDonation(
            Boolean(localStorage.getItem(`donation-${result.data.squad._id}`))
          );
        }
      } catch (err) {
        console.log(err)
      }
    }
    getDetails();
  }, [squadId]);

  const makeDonation = () => {
    localStorage.setItem(`donation-${details._id}`, true);
    setDonation(true);
  };

  const donationMenu = (
    <Menu onClick={makeDonation}>
      <Menu.Item key="1">
        💳 Credit and debit card
      </Menu.Item>
      <Menu.Item key="2">
        🇪🇺+🇬🇧 Bank account
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
          <Dropdown overlay={donationMenu}>
            <Button type="primary">
              Donate <DownOutlined />
            </Button>
          </Dropdown>,
        ]}
        style={{ padding: 0 }}
      ></PageHeader>

      <Row style={{ marginTop: 32, marginBottom: 32 }}>
        <Col span={12}>
          <Statistic title="Total donated" prefix="$" value={112893} precision={2} valueStyle={{ color: '#3f8600' }} />
        </Col>
        <Col span={12}>
          <Statistic title="Remaining" prefix="$" value={112893} precision={2} />
        </Col>
      </Row>
      <ReactMarkdown source={details.description}></ReactMarkdown>
      <Row justify="center" align="middle" gutter={[8, 8]}>
        <Col xs={24} md={6} align="middle">
          <Button type="primary" onClick={() => makeDonation()} href={`https://buy.ramp.network?swapAsset=DAI&userAddress=${details.daoAddress}`}>Donate with Ramp (EU)</Button>        
        </Col>
        <Col  xs={24} md={6} align="middle">
          <Button type="primary" onClick={() => makeDonation()} href={"https://pay.sendwyre.com/purchase?destCurrency=DAI&paymentMethod=debit-card&dest=" + details.daoAddress + "&redirectUrl=http://localhost:3000/squad/" + details._id}>Donate with Wyre (US)</Button>        
        </Col>
      </Row>

        {donation ? (
        <Row gutter={[8, 16]}>
          <Col xs={24} justify="center" align="middle">          
            <Button href={details.inviteLink}>Join the chat</Button>
          </Col>
        </Row>          
        ) : ( '' )}

    </div>
  );
};

export default SquadDetails;
