import React, { useEffect, useState } from "react";

import "./styles/styles.css";
import { squadDetails } from "../requests";

const SquadDetails = props => {
  const { squadId } = props.match.params;
  const [details, setDetails] = useState({});

  useEffect(() => {
    async function getDetails() {
      const result = await squadDetails(squadId);
      if(result && result.squad){
        setDetails(result.squad);
      }
    }
    getDetails();
  }, [squadId]);

  return (
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
  );
};

export default SquadDetails;
