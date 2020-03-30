import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import { squadDetails } from "../requests";
import Layout from './Layout'
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
  let donation = false
  let makeDonation = () =>{
    localStorage.setItem('donation', details._id);
  }
  let isDonationMaked = () => {
    try{
      donation = localStorage.getItem('donation');
    }catch(err){
      console.log(err);

    }
  }
  isDonationMaked()
  return (
    <Layout>
      <div className="container my-5">
        <div className="row mt-5">
          <div className="col-xs-12 col-lg-8 mx-auto text-center">
            <h1>
              <span role="img" aria-label="Rescue Worker’s Helmet">&#9937;</span>
                {details.name} Help Squad
              <span role="img" aria-label="Rescue Worker’s Helmet">&#9937;</span>
            </h1>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-xs-12 col-lg-8 mx-auto text-left">
          <ReactMarkdown source={details.description}></ReactMarkdown>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-xs-12 col-lg-8 mx-auto text-center">
            <h5>Total Donated: $000</h5>
            <h5>Remaining: $000</h5>

          </div>
        </div>
        <div className="row mt-3">
          <div className="col-xs-12 col-lg-8 mx-auto text-center">
            <a onClick={() => {makeDonation()}}href={"https://pay.sendwyre.com/purchase?destCurrency=DAI&paymentMethod=debit-card&dest=" + details.daoAddress + "&redirectUrl=http://localhost:3000/squad/" + details._id}>
              <button className="btn hdaoBtn btn-lg">Donate</button>
            </a>
          </div>
        </div>
        { donation === details._id? 
         ( <div className="row mt-3">
            <div className="col-xs-12 col-lg-8 mx-auto text-center">
              <a href={details.inviteLink}>
                <button className="btn hdaoBtnContrast ml-1 btn-lg" >Join the Group</button>
              </a>
            </div>
          </div>  
         ):''
        }      
      </div>
    </Layout>
  );
};

export default SquadDetails;
