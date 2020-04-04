import React from 'react'
import Header from './Header'
import { Row, Col } from 'antd';

export default class Layout extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return(
            <Row style={{ borderBottom: 'none' }}>
                <Col span={12} offset={6}>
                    <Header />
                    { this.props.children }
                </Col>
            </Row>
        );
    }
}