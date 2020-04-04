import React from 'react';
import { Card, Button, Tag } from 'antd';
import ReactMarkdown from 'react-markdown'

export default function SquadCard({ name, desc, url, verified }) {
  return (
    <Card
      actions={[
        <Button type="primary" href={url}>Read more →</Button>,
      ]}
      title={<>{name}{verified ? <Tag color="#52c41a" style={{ float: 'right' }}>Verified</Tag> : ''}</>}
    >
      <div style={{ height: 128 }}>
        <ReactMarkdown source={desc.substring(0, 180).replace(/[\#]*/, '')}></ReactMarkdown>
      </div>
    </Card>
  );
}
