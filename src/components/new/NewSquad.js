import React, { useState } from "react";
import {
  Steps,
  message,
  Row,
} from "antd";
import { UseWalletProvider } from "use-wallet";
import Register from "./Register";
import LaunchSquad from "./LaunchSquad";
import SquadForm from "./SquadForm";
import { createSquad } from "../../requests";
import { currentNetwork, vars } from '../../vars.json';

const { Step } = Steps;

export default function NewSquad() {
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [details, setDetails] = useState({});
  const [daoAddresses, setDAOAddresses] = useState({});

  const next = () => {
    const val = current + 1;
    setCurrent(val);
  };

  const launchSquad = async ({ daoAddress, agentAddress }) => {
    let data = {
      name: details.name,
      description: details.description,
      inviteLink: details.inviteLink,
      daoAddress: daoAddress,
      agentAddress: agentAddress,
    };
    const res = await createSquad(data);
    console.log(res);
  }

  const setSquadDetails = (values) => {
    setDetails(values);
    next();
  }

  const setDAODetails = ({ daoAddress, agentAddress }) => {
    setDAOAddresses({ daoAddress, agentAddress });
    launchSquad({ daoAddress, agentAddress });
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
      content: <LaunchSquad onFinish={setDAODetails}></LaunchSquad>
    },
  ];

  localStorage.setItem("ethAddress", "");
  return (
    <UseWalletProvider
      chainId={vars[currentNetwork].chainId}
      connectors={{
        fortmatic: { apiKey: vars[currentNetwork].fortmatic },
      }}
    >
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
    </UseWalletProvider>
  );
}
