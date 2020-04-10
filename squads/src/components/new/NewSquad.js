import React, { useState } from "react";
import {
  Steps,
  Button,
  message,
  Row,
  Col,
  Typography,
} from "antd";
import Register from "./Register";
import SquadForm from "./SquadForm";
import { findSquad, createSquad } from "../../requests";
import write from "../../assets/write.svg";

const { Step } = Steps;

export default function NewSquad() {
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [details, setDetails] = useState({});

  //STEPS CONTROLLERS
  const next = () => {
    const val = current + 1;
    setCurrent(val);
  };

  const prev = () => {
    let val = current - 1;
    setCurrent(val);
  };

  const validateStep = () => {
    if (current === 0) {
      Promise.resolve(localStorage.getItem("fortmatic")).then((fortmatic) => {
        console.log("FORTMATIC: " + fortmatic);
        if (fortmatic.length !== 0) {
          next();
          setError("");
          setWalletConnected(true);
        } else {
          message.error("You need to sign up!");
          setError("error");
          setWalletConnected(false);
        }
      });
    } else if (current === 1) {
    } else if (current === 2) {
      if (walletConnected === true) {
        let dao = "0x0000000000000000ABADBABE0000000000000000";
        let data = {
          name: details.name,
          description: details.description,
          inviteLink: details.inviteLink,
          daoAddress: dao,
        };
        createSquad(data)
          .then((response) => {
            if (response.status === 200) {
              document.location.href = `/squad/${response.data.newSquad._id}`;
            }
          })
          .catch((err) => {
            console.log(err);
            message.error(
              "Oops, something goes wrong, please review all the fields and try it again in a while."
            );
          });
      }
    }
  };

  const setSquadDetails = (values) => {
    setDetails(values);
    next();
  }

  const steps = [
    {
      title: "Register",
      content: <Register onCompletedRegister={() => validateStep()}></Register>,
    },
    {
      title: "Enter details",
      content: (
        <Row gutter={64} justify="space-around" align="middle">
          <Col xs={24} sm={24} md={12}>
            <SquadForm onFinish={setSquadDetails}></SquadForm>
          </Col>
          <Col xs={0} sm={0} md={12}>
            <img src={write} style={{ width: "100%" }} />
          </Col>
        </Row>
      ),
    },
    {
      title: "Launch",
      content: "Last-content",
    },
  ];

  localStorage.setItem("fortmatic", "");
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
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => validateStep()}>
            Launch {details.name} Squad!
          </Button>
        )}
      </div>
    </>
  );
}
