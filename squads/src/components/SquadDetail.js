import React, { useEffect, useState } from "react";
import HomeIcon from '@material-ui/icons/Home';
import ReactMarkdown from 'react-markdown'
import "./styles/styles.css";
import { squadDetails } from "../requests";

const SquadDetails = props => {
  const { squadId } = props.match.params;
  const [details, setDetails] = useState({});

  useEffect(() => {
    async function getDetails() {
      try{
        const result = await squadDetails(squadId);
        console.log("Result Squad Details: ")
        console.log(result)
        if(result.data && result.data.squad){
          setDetails(result.data.squad);
        }
      }catch(err){ 
        console.log(err)
      }
    }
    getDetails();
  }, [squadId]);

  return (
    <div>
    <a href='/'>
      <HomeIcon id='home'></HomeIcon>
    </a>
    <div className="squad-container">
      <h1> <u>{details.name} Help Squad</u></h1>
      <div id="mdInterpreter">
        <ReactMarkdown source={details.description} />
      </div>
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
