import React from 'react'
import Layout from '../Layout'
import Layaout from '../Layout'
import Stepper from 'bs-stepper'
import Register from './Register'
import 'bs-stepper/dist/css/bs-stepper.min.css'
import RegisterForm from './registerForm'

let stepper = null
export default function NewSquad(){
  let showButtons = false
  const [body,setBody] = React.useState({})
  const [formValid, setformValid] = React.useState(false);
  const [walletConnected, setWalletConnected] = React.useState(false);
  let stepperEl = null
  document.addEventListener('DOMContentLoaded', function () {
    stepperEl = document.getElementById("bs-stepper")
    let options = {linear:false}
    stepper = new Stepper(document.querySelector('.bs-stepper'), options)
    console.log(stepper._currentIndex)     
  })
  const getFormData = (childrenData) => {
    Promise.resolve(childrenData)
    .then((data) => {
      setBody((data) => data);
      setformValid(true);
      return Promise.resolve(stepper.next())
    }).then(() => showButtons = true)
  }

    return(
      <Layaout>
        <div className="container">
        <div id="bs-stepper" className="bs-stepper">
          <div className="bs-stepper-header" role="tablist">
            <div className="step" data-target="#logins-part">
              <button type="button" className="step-trigger" role="tab" aria-controls="logins-part" id="logins-part-trigger">
                <span className="bs-stepper-circle">1</span>
                <span className="bs-stepper-label">Squad Info</span>
              </button>
            </div>
            <div className="line"></div>
            <div className="step" data-target="#information-part">
              <button type="button" className="step-trigger" role="tab" aria-controls="information-part" id="information-part-trigger">
                <span className="bs-stepper-circle">2</span>
                <span className="bs-stepper-label">Connect your Account</span>
              </button>
            </div>
            <div className="line"></div>
            <div className="step" data-target="#finish-part">
              <button type="button" className="step-trigger" role="tab" aria-controls="finish-part" id="finish-part-trigger">
                <span className="bs-stepper-circle">3</span>
                <span className="bs-stepper-label">Launch Squad</span>
              </button>
            </div>            
          </div>
          <div className="bs-stepper-content">
            <div id="logins-part" className="content" role="tabpanel" aria-labelledby="logins-part-trigger">
              <RegisterForm parentCallback={() => getFormData()}></RegisterForm>
            </div>
            <div id="information-part" className="content" role="tabpanel" aria-labelledby="information-part-trigger">
              <div className="fullScreenSection">
                <h3 className="my-3">Register Your Account</h3>
                <Register></Register>
              </div>
            <div className="row">
              <div className="col-6">
                <button className="btn hdaoBtnContrast btn-lg" onClick={() => {stepper.previous()}}>Previous</button>
              </div>
              <div className="col-6 text-right">
                <button className="btn hdaoBtn btn-lg" onClick={() => {stepper.next()}}>Next</button>
              </div>
            </div>  
            </div>
            <div id="finish-part" className="content" role="tabpanel" aria-labelledby="finish-part-trigger">

            </div>
          </div>
        </div>        
        </div>
        
      </Layaout>
    )
}