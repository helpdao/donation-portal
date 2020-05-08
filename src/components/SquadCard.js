import React from 'react';
import { Card, Button, Tag } from 'antd';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown'

export default function SquadCard({ name, desc, url, verified }) {
  return (
    <Card
      actions={[
        <Link to={url}><Button type="primary">Read more →</Button></Link>,
      ]}
      title={<>{name}{verified ? <Tag color="green" style={{ float: 'right' }}>Verified</Tag> : ''}</>}
    >
      <div style={{ height: 164, maxHeight:164, overflow:'hidden'}}>
        <ReactMarkdown source={desc.substring(0,180).replace(/([\#])+/g, '')}></ReactMarkdown>
      </div>
    </Card>
  );
}
