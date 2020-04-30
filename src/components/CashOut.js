import React, { useEffect, useState } from 'react';
import { Row, Col, List, Button, Select, Typography, Avatar } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import MooniWidget from '@mooni/widget';
import { useWallet } from 'use-wallet';

import MooniLogo from '../assets/mooni.png';
import MonolithLogo from '../assets/monolith.png';
import DharmaLogo from '../assets/dharma.png';
import CoinbaseLogo from '../assets/coinbase.png';
import AmonLogo from '../assets/amon.png';

const { Title, Text } = Typography;
const { Option } = Select;

const PRODUCTS = {
  'mooni': {
    name: 'Mooni',
    description: 'Quickly transfer up to 5.000€ to you bank account without KYC',
    logo: MooniLogo,
  },
  'coinbase': {
    name: 'Coinbase',
    description: 'Custodian fiat and cryptocurrency wallet',
    url: 'https://www.coinbase.com/',
    logo: CoinbaseLogo,
  },
  'amon': {
    name: 'Amon',
    description: 'Fiat and cryptocurrency custodian wallet with interest, debit card',
    url: 'https://amon.tech/',
    logo: AmonLogo,
  },
  'monolith': {
    name: 'Monolith',
    description: 'Cryptocurrency wallet associated to a debit card',
    url: 'https://monolith.xyz/',
    logo: MonolithLogo,
  },
  'dharma': {
    name: 'Dharma',
    description: 'Earn interest on USD and transfer to/from your bank account',
    url: 'https://www.dharma.io/',
    logo: DharmaLogo,
  }
};

const COUNTRY_PRODUCTS = {
  'EU': ['mooni', 'monolith', 'amon', 'coinbase'],
  'UK': ['monolith', 'coinbase'],
  'USA': ['dharma', 'coinbase'],
  'OTHER': ['coinbase'],
};

const COUNTRIES = {
  'EU': '🇪🇺 Europe',
  'UK': '🇬🇧 United Kingdom',
  'USA': '🇺🇸 United States',
  'OTHER': 'Other',
};

export default function CashOut({ name, desc, url, verified }) {
  const wallet = useWallet();

  const [country, setCountry] = useState(Object.keys(COUNTRIES)[0]);
  const [mooni, setMooni] = useState(null);

  useEffect(() => {
    setMooni(new MooniWidget({
      web3Provider: wallet.ethereum,
    }));
  }, []);

  const availableProducts = COUNTRY_PRODUCTS[country] || [];
  const productListData = availableProducts.map(productName => [productName, PRODUCTS[productName]]);

  const openProduct = (productName) => () => {
    if (productName === 'mooni') {
      mooni.open();
    } else {
      window.open(PRODUCTS[productName].url)
    }
  };

  return (
    <>
      <Row style={{paddingTop: 8, paddingBottom: 8}}>
        <Col>
          <Title level={4}>Cash out cryptocurrencies</Title>
          <Text>If you want to transfer funds from your crypto wallet, here are some existing solutions depending on where you live.</Text>
        </Col>
      </Row>

      <List
        header={
          <Row align="center">
            <Col span={12}>
              <Text strong>Available solutions</Text>
            </Col>
            <Col span={12}>
              <Select
                value={country}
                style={{width: '100%'}}
                onChange={value => setCountry(value)}
              >
                {Object.keys(COUNTRIES).map(key =>
                  <Option key={key} value={key}>{COUNTRIES[key]}</Option>
                )}
              </Select>
            </Col>
          </Row>
        }
        bordered
        dataSource={productListData}
        itemLayout="horizontal"
        rowKey={([key]) => key}
        renderItem={([productName, product]) => (
          <List.Item
            actions={[
              <Button
                onClick={openProduct(productName)}
                type="primary"
              >
                Open <ExportOutlined/>
              </Button>
            ]}>
            <List.Item.Meta
              avatar={<Avatar src={product.logo} />}
              title={<Text strong>{product.name}</Text>}
              description={product.description}
            />
          </List.Item>
        )}
      />
    </>
  );
}