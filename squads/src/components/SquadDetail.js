import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import { squadDetails } from "../requests";
import { Statistic, Row, Col, Button } from 'antd';

const SquadDetails = props => {
  const { squadId } = props.match.params;
  const [details, setDetails] = useState({});
  const [donation, setDonation] = useState(false);

  useEffect(() => {
    async function getDetails() {
      try {
        const result = await squadDetails(squadId);
        console.log("Result Squad Details: ");
        console.log(result);
        if (result.data && result.data.squad) {
          setDetails(result.data.squad);
          setDonation(
            Boolean(localStorage.getItem(`donation-${result.data.squad._id}`))
          );
        }
      } catch (err) {
        console.log(err);
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
      <h1>{details.name}</h1>
      <ReactMarkdown source={details.description}></ReactMarkdown>
      <Row>
        <Col span={12}>
          <Statistic title="Total donated" value={112893} />
        </Col>
        <Col span={12}>
          <Statistic title="Remaining" value={112893} precision={2} />
        </Col>
      </Row>
      <Row>
        <Button type="primary" href={`https://buy.ramp.network?swapAsset=DAI&userAddress=${details.daoAddress}`}>Donate with Ramp (EU)</Button>
        <Button type="primary" href={"https://pay.sendwyre.com/purchase?destCurrency=DAI&paymentMethod=debit-card&dest=" + details.daoAddress + "&redirectUrl=http://localhost:3000/squad/" + details._id}>Donate with Wyre (US)</Button>
        {donation ? (
          <Button href={details.inviteLink}>Join the chat</Button>
        ) : ( '' )}
      </Row>
    </div>
  );
};

export default SquadDetails;
