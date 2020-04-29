import React, { useEffect, useState } from "react";
import { squadDetails } from "../requests";
import { Button, PageHeader, Tag, Menu, Dropdown, Typography } from 'antd';
import { DownOutlined, CreditCardOutlined, CalculatorOutlined } from '@ant-design/icons';
import SquadDetails from '../components/SquadDetail';
import { getBalance } from '../requests/tokens';

const { Text } = Typography;

const SquadPage = props => {
  const { squadId } = props.match.params;
  const [details, setDetails] = useState({});
  const [balance, setBalance] = useState(0);

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

      <SquadDetails details={details} balance={balance} />
    </>
  );
};

export default SquadPage;
