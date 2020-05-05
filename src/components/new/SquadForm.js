import React, { useState } from "react";
import { Form, Button, Input, Col } from "antd";
import { EditorState } from 'draft-js';
import { stateToMarkdown } from "draft-js-export-markdown";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import write from "../../assets/write.svg";

const SquadForm = ({ onFinish }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onPreFinish = (details) => {
    details.description = stateToMarkdown(editorState.getCurrentContent());
    onFinish(details);
  }

  return (
    <>
      <Col xs={24} sm={24} md={12}>
        <Form name="new" onFinish={onPreFinish} layout="vertical">
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
          >
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={setEditorState}
              toolbarStyle={{ border: 'none' }}
              wrapperStyle={{ border: '1px solid #d9d9d9', borderRadius: 2 }}
              editorStyle={{ minHeight: '10rem', padding: '0px 16px' }}
              toolbar={{
                options: ['inline', 'blockType', 'list', 'link', 'remove'],
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Done
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={0} sm={0} md={12}>
        <img src={write} style={{ width: "100%" }} />
      </Col>
    </>
  );
};

export default SquadForm;
