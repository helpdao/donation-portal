import React from "react";
import { Form, Button, Input, TextArea } from "antd";

const SquadForm = ({ onFinish }) => {
  return (
    <Form name="new" onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Squad name"
        name="name"
        rules={[{ required: true, message: "Please write a name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Squad chat link"
        name="inviteLink"
        rules={[
          { required: true, message: "Please write a link!" },
          { type: "url", message: "Please write a valid link!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Squad description"
        name="description"
        rules={[{ required: true, message: "Please write a description!" }]}
      >
        <Input.TextArea
          rows={10}
          name="description"
          placeholder="Description"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Done
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SquadForm