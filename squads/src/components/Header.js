import React from 'react'
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import help_dao_min from "../assets/help_dao_min.svg";

export default class Footer extends React.Component {
  render() {
    return (
      <Menu mode="horizontal" style={{ borderBottom: 'none', paddingTop: 16 }}>
        <Menu.Item key="home" style={{ float: 'left', borderBottom: 'none' }}>
          <Link to="/"><img src={help_dao_min} className="img-fluid d-inline-block align-top" alt="" style={{ height: 48 }}/></Link>
        </Menu.Item>
        <Menu.Item key="about" style={{ float: 'right' }}>
          <a href="https://helpdao.org/" target="_blank">About</a>
        </Menu.Item>
        <Menu.Item key="new" style={{ float: 'right' }}>
          <Link to="/new">Launch a help squad</Link>
        </Menu.Item>
      </Menu>
    )
  }
}