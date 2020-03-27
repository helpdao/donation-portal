import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { allSquads } from "../requests";
import "./styles/styles.css";

const SquadList = props => {
  const [squads, setSquads] = useState([]);

  const getSquads = async () => {
    try{
      let result = await allSquads();
      if(result.data.squads.length > 0){
        setSquads(result.data.squads);
      }
    }catch(err){
      console.log("SquadList.js line 17")
      console.log(err)
    }

  };

  useEffect(() => {
    getSquads();
  }, []);

  return (
    <>
      {squads.length > 0 ? (
        squads.map(squad => {
          return (
            <li>
              <Link to={`/squad/${squad._id}`}>
                <button>{squad.name}</button>
              </Link>
            </li>
          );
        })
      ) : (
        <p> No squads</p>
      )}
      <p>.. more help on the way!</p>
    </>
  );
};

export default SquadList;
