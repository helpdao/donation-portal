import React from 'react'
import { Row, Col } from 'antd';

export default class Footer extends React.Component {
  render() {
    return(
      <Row gutter={32} style={{ paddingTop: 64, paddingBottom: 64 }}>
        <Col span={14}>
          <h1>Grassroots help for vulnerable groups in COVID-19.</h1>
          <h5>Discover local squads that help those who need it the most in the current COVID-19 pandemic.</h5>
        </Col>
        <Col span={10}>
          <img
            src="https://uploads-ssl.webflow.com/5e750e8eafbf2f39a4236fe3/5e751a47a06260604764bb02_Frame%201-p-2000.png"
            style={{ width: '100%', borderRadius: 16 }}
          />
        </Col>
      </Row>
    )
  }
}