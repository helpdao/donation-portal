import React, { useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import { currentNetwork } from '../vars';
import { Statistic, Row, Col, Button, Typography, Result } from 'antd';
import SquadShare from './SquadShare'

const { Title } = Typography;

const SquadDetails = ({ squadDetails, balance }) => {

  let urlParams = new URLSearchParams(window.location.search);
  const donation = urlParams.get('donation') === 'true';
  const launched = urlParams.get('launched') === 'true';

  return (
    <>
      {launched && (
        <Result
          status="success"
          title="Help squad launched!"
          subTitle={`You have successfully launched ${squadDetails.name}. This is your help squad's very own profile page. Share it now!`}
          extra={[
            <Row justify="center">
              <Button type="primary" key="next">What's next?</Button>
            </Row>,
          ]}
        />
      )}

      {donation && (
        <Result
          status="success"
          title="Thanks for donating!"
          subTitle={`You have successfully donated to ${squadDetails.name}. Thank you!`}
        />
      )}

      <Row gutter={64}>
        <Col xs={{ span: 24, order: 1 }} sm={{ span: 24, order: 1 }} md={{ span: 16, order: 0 }}>
          <ReactMarkdown source={squadDetails.description}></ReactMarkdown>
          <Title level={3}>Share</Title>
          <SquadShare url={`${window.location.origin}/squad/${squadDetails._id}`}></SquadShare>
        </Col>
        <Col xs={{ span: 24, order: 0 }} sm={{ span: 24, order: 0 }} md={{ span: 8, order: 1 }} style={{ textAlign: 'right' }}>
          <Statistic title="Current balance" prefix="$" value={balance} precision={2} valueStyle={{ color: '#3f8600' }} />
          <a href={`https://${currentNetwork}.aragon.org/#/${squadDetails.daoAddress}`} target="_blank" rel="noopener noreferrer">
            Check finances →
          </a>
        </Col>
      </Row>
    </>
  );
};

export default SquadDetails;
