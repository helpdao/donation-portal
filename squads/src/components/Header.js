import React from 'react'
import { Menu, Layout } from 'antd';
import help_dao_min from "../assets/help_dao_min.svg";
import { Row, Col } from 'antd';
import help_dao_wheel from "../assets/help_dao_wheel.svg";

export default class Footer extends React.Component {
    render(){
        return(
            <Menu mode="horizontal">
                <Menu.Item key="home" style={{ float: 'left' }}>
                    <a href="/"><img src={help_dao_min} className="img-fluid d-inline-block align-top" alt="" style={{ height: 48 }}/></a>
                </Menu.Item>
                <Menu.Item key="about" style={{ float: 'right' }}>
                    <a href="https://helpdao.org/" target="_blank">About</a>
                </Menu.Item>
                <Menu.Item key="new" style={{ float: 'right' }}>
                    <a href="/new">Launch a help squad</a>
                </Menu.Item>
            </Menu>
        );
    }
}