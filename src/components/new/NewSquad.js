import React, { useState } from "react";
import {
  Steps,
  Row,
} from "antd";
import Register from "./Register";
import LaunchSquad from "./LaunchSquad";
import SquadForm from "./SquadForm";
import { createSquad } from "../../requests";

const { Step } = Steps;

export default function NewSquad() {
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState('');
  const [details, setDetails] = useState({});
  const [daoAddresses, setDAOAddresses] = useState({});

  const next = () => {
    const val = current + 1;
    setCurrent(val);
  };

  const launchSquad = async ({ daoAddress, agentAddress }) => {
    setDAOAddresses({ daoAddress, agentAddress });
    let data = {
      name: details.name,
      description: details.description,
      inviteLink: details.inviteLink,
      daoAddress: daoAddress,
      donationAddress: agentAddress,
    };
    const res = await createSquad(data);
    window.location.replace(`${window.location.origin}/squad/${res.data.newSquad._id}?launched=true`);
  }

  const setSquadDetails = (values) => {
    setDetails(values);
    next();
  }

  const steps = [
    {
      title: "Register",
      content: <Register onFinish={next}></Register>,
    },
    {
      title: "Enter details",
      content: <SquadForm onFinish={setSquadDetails}></SquadForm>,
    },
    {
      title: "Launch",
      content: <LaunchSquad onFinish={launchSquad}></LaunchSquad>
    },
  ];

  return (
    <>
      <Steps
        current={current}
        status={error}
        style={{ marginTop: 32, marginBottom: 32 }}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        <Row gutter={64} justify="space-around" align="middle">
          {steps[current].content}
        </Row>
      </div>
    </>
  );
}
