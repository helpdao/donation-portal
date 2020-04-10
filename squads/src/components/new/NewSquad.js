import React, { useState } from "react";
import { Steps, Button, message, Form, Input } from "antd";
import Register from "./Register";
import { findSquad, createSquad } from "../../requests";
import ReactMarkdown from "react-markdown";
const { Step } = Steps;
const { TextArea } = Input;
let inviteLinkRegex = RegExp(
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?(t\.me\/|chat\.whatsapp\.com)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  "i"
);

export default function NewSquad() {
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  //STEPS CONTROLLERS
  const next = () => {
    const val = current + 1;
    setCurrent(val);
  };

  const prev = () => {
    let val = current - 1;
    setCurrent(val);
  };

  //FORM VALIDATION

  const checkName = () => {
    return new Promise((resolve, reject) => {
      findSquad({ name: name })
        .then((response) => {
          console.log("Valid Name?");
          console.log(response);
          if (response.data.squads.length === 0) {
            resolve();
          } else {
            message.error(
              "This name is in use, you need to choose a different Squad Name"
            );
            reject();
          }
        })
        .catch((err) => {
          message.error("Somenthing goes wrong. Try it again in a while");
          reject();
        });
    });
  };
  const valideInviteLink = () => {
    return new Promise((resolve, reject) => {
      if (inviteLink.length === 0) {
        message.error("You have to provide an invitation link.");
        reject();
      } else if (!inviteLinkRegex.test(inviteLink)) {
        message.error("You have to provide a valid invitation link.");
        reject();
      } else resolve();
    });
  };
  const validateName = () => {
    return new Promise((resolve, reject) => {
      if (name.length === 0) {
        message.error("You have to provide Squad name");
        reject();
      } else resolve();
    });
  };
  const validateDescription = () => {
    return new Promise((resolve, reject) => {
      if (description.length === 0) {
        message.error("You have to provide a description");
        reject();
      } else resolve();
    });
  };
  const validateForm = () => {
    validateName()
      .then((data) => {
        return checkName();
      })
      .then((data) => {
        return valideInviteLink();
      })
      .then((data) => {
        return validateDescription();
      })
      .then((data) => {
        message.success("Everything is correct!");
        setError("");
        setFormValid(true);
        next();
      })
      .catch((err) => {
        setError("error");
        setFormValid(false);
        console.log(err);
      });
  };
  //STEPS VALIDATION CONTROLL
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
      validateForm();
    } else if (current === 2) {
      if (formValid !== false && walletConnected !== false) {
        let dao = "0x0000000000000000ABADBABE0000000000000000";
        let data = {
          name: name,
          description: description,
          inviteLink: inviteLink,
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

  const steps = [
    {
      title: "Register",
      content: <Register></Register>,
    },
    {
      title: "Enter details",
      content: (
        <div>
          <label>Squad Name</label>
          <Input
            name="name"
            placeholder="Name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <label>Squad Invitation Link</label>
          <Input
            name="inviteLink"
            placeholder="InviteLink"
            value={inviteLink}
            onChange={(evt) => setInviteLink(evt.target.value)}
          />
          <label>Squad Description</label>
          <TextArea
            rows={20}
            name="description"
            placeholder="Description"
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
          />
        </div>
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
      <Steps current={current} status={error} style={{ marginTop: 32, marginBottom: 32 }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => validateStep()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => validateStep()}>
            Launch {name} Squad!
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: 8 }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
}
