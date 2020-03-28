import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { allSquads } from "../requests";
import {GoVerified, GoUnverified} from 'react-icons/go'
//import "../App.css";

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
    <div  class="">
      <div className="row">
        <div className="col-xs-12 col-lg-8 mx-auto text-center">
          <h2 className="mt-5 blue"><b>OUR HELP SQUADS:</b></h2>
        </div>
      </div>
      {squads.length > 0 ? (
        squads.map(squad => {
          return (
            <div key={squad._id} className="col-xs-12 col-lg-3 mx-auto">
              <div className="row p-2">
                <a href={"/squad/" + squad._id} className="col-12">
                  <button 
                    class=" col-12 btn btn-lg hdaoBtn"
                    data-toggle="tooltip"
                    data-placement="right"
                    title={squad.verified ? "This squad is verified by HelpDAO":"This squad is not verified by HelpDAO"}
                  >
                    {squad.name}
                    <span className="text-white badge">
                      {squad.verified ===true ? <h5><GoVerified/></h5>: <h5><GoUnverified/></h5>}
                    </span>
                  </button>
                </a>
              </div>
            </div>
          );
        })
      ) : (
        <div className="row mt-3">
          <div className="col-xs-12 col-lg-8 mx-auto alert alert-danger text-center">Something goes wrong. Reload the page or try it again in a while.</div>
        </div>
      )}
            <div className="col-xs-12 col-lg-3 mx-auto">
              <div className="row p-2">
                <div className="col-12 text-center">
                  <p className="blue">...</p>
                <h5 className="blue">More help on the way!</h5>
                </div>
              </div>
            </div>      
    </div>
  );
};

export default SquadList;
