import React, { useState } from "react";
import { Form, Button, Input, Col } from "antd";
import { EditorState, convertToRaw } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import write from "../../assets/write.svg";

const SquadForm = ({ onFinish }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onPreFinish = (details) => {
    const contentState = convertToRaw(editorState.getCurrentContent());
    const markdown = draftToMarkdown(contentState);
    console.log(markdown)

    details.description = markdown;
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
              toolbar={{
                options: ['inline', 'blockType', 'list', 'colorPicker', 'link', 'remove'],
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
