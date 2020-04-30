import React, { useEffect, useState } from 'react';
import { Row, Col, List, Button, Select, Typography } from 'antd';
import MooniWidget from '@mooni/widget';
import { useWallet } from 'use-wallet';

const { Title } = Typography;
const { Option } = Select;

const PRODUCTS = {
  'mooni': {
    name: 'Mooni'
  }
};

const COUNTRY_PRODUCTS = {
  'EU': ['mooni'],
};

export default function CashOut({ name, desc, url, verified }) {
  const wallet = useWallet();

  const [country, setCountry] = useState('EU');
  const [mooni, setMooni] = useState(null);

  useEffect(() => {
    setMooni(new MooniWidget({
      web3Provider: wallet.ethereum,
    }));
  }, []);

  const availableProducts = COUNTRY_PRODUCTS[country] || [];
  const productListData = availableProducts.map(productName => [productName, PRODUCTS[productName]]);

  const openProduct = (productName) => () => {
    if(productName === 'mooni') {
      mooni.open();
    }
  };

  return (
    <>
      <Row style={{ paddingTop: 8 }}>
        <Title level={4}>Cash out cryptocurrencies</Title>
      </Row>

      <List
        style={{ maxWidth: 400}}
        header={
          <Row>
            <Col span={16}>
              <b>Available solutions</b>
            </Col>
            <Col span={8}>
              <Select
                value={country}
                style={{ width: '100%' }}
                onChange={value => setCountry(value)}
              >
                <Option value="EU">Europe</Option>
                <Option value="USA">USA</Option>
                <Option value="OTHER">Other</Option>
              </Select>
            </Col>
          </Row>
        }
        bordered
        dataSource={productListData}
        renderItem={([productName, product]) => (
          <List.Item>
            <Col span={18}>
              {product.name}
            </Col>
            <Col span={6}>
              <Button onClick={openProduct(productName)}>Open</Button>
            </Col>
          </List.Item>
        )}
      />

    </>
  );
}
