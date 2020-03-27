import React, { useEffect, useState } from "react";
import HomeIcon from '@material-ui/icons/Home';

import "./styles/styles.css";
import { squadDetails } from "../requests";

const SquadDetails = props => {
  const { squadId } = props.match.params;
  const [details, setDetails] = useState({});

  const getDetails = async () => {
    const result = await squadDetails(squadId);
    setDetails(result.squad);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
    <a href='/'>
      <HomeIcon id='home'></HomeIcon>
    </a>
    <div className="squad-container">
      <h4>{details.name} Help Squad</h4>
      <p> {details.description} </p>

      <div className="status">
        <p>
          <span>Total Donated:</span> 0000
        </p>
        <p>
          <span>Remaining:</span> 0000
        </p>
      </div>

      <button id="donate">Donate</button>
    </div>
    </div>
  );
};

export default SquadDetails;
