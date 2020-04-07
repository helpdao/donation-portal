import React, { useState, useEffect } from "react";
import { allSquads } from "../requests";
import SquadCard from "./SquadCard";
import { Card, Col, Row } from 'antd';
//import "../App.css";

const SquadList = props => {
  const [squads, setSquads] = useState([]);

  const getSquads = async () => {
    try {
      let result = await allSquads();
      if (result.data.squads.length > 0) {
        setSquads(result.data.squads);
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getSquads();
  }, []);
  return (
    <div>
      <Row gutter={[16, 16]}>
        <h2 style={{ textAlign: 'center', marginTop: 32 }}>HELP SQUADS</h2>
      </Row>
      <Row gutter={[16, 16]}>
        {squads.map(squad => (
          <Col span={8}>
            <SquadCard name={squad.name} desc={squad.description} url={"/squad/" + squad._id} verified={squad.verified}></SquadCard>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SquadList;
