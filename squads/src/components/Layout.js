import React from "react";
import Header from "./Header";
import { Row, Col } from "antd";

export default class Layout extends React.Component {
  render() {
    return (
      <Row style={{ borderBottom: "none" }}>
        <Col
          sm={{ span: 24 }}
          md={{ span: 20, offset: 2 }}
          lg={{ span: 16, offset: 4 }}
          xl={{ span: 12, offset: 6 }}
        >
          <Header />
          {this.props.children}
        </Col>
      </Row>
    );
  }
}
