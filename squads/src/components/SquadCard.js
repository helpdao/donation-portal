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
      title={<>{name}{verified ? <Tag color="#52c41a" style={{ float: 'right' }}>Verified</Tag> : ''}</>}
    >
      <div style={{ height: 164 }}>
        <ReactMarkdown source={desc.substring(0, 180).replace(/[\#]*/, '')}></ReactMarkdown>
      </div>
    </Card>
  );
}
