import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import { squadDetails } from "../requests";
import { Statistic, Row, Col, Button, PageHeader, Tag } from 'antd';

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

  return (
    <div style={{ marginTop: 32, marginBottom: 32 }}>
      <PageHeader
        onBack={() => document.location.href="/"}
        title={details.name}
        tags={details.verified ? <Tag color="green">Verified</Tag> : ''}
        extra={[
          <Button key="1" type="primary">
            Donate
          </Button>,
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
      <Row>
        <Col  offset={6} span={6}>
          <Button type="primary" onClick={() => makeDonation()} href={`https://buy.ramp.network?swapAsset=DAI&userAddress=${details.daoAddress}`}>Donate with Ramp (EU)</Button>        
        </Col>
        <Col  span={6}>
          <Button type="primary" onClick={() => makeDonation()} href={"https://pay.sendwyre.com/purchase?destCurrency=DAI&paymentMethod=debit-card&dest=" + details.daoAddress + "&redirectUrl=http://localhost:3000/squad/" + details._id}>Donate with Wyre (US)</Button>        
        </Col>
        {donation ? (
          <Button href={details.inviteLink}>Join the chat</Button>
        ) : ( '' )}
      </Row>
    </div>
  );
};

export default SquadDetails;
