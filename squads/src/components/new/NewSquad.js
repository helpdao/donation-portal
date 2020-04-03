import React from 'react'
import Stepper from 'bs-stepper'
import Register from './Register'
import 'bs-stepper/dist/css/bs-stepper.min.css'
import RegisterForm from './registerForm'
import { createSquad } from "../../requests"

let stepper = null
let stepperEl = null
export default class  NewSquad extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      body:null,
      name:'',
      walletConnected:false,
      formValid:false,
      walletError:'',
      formError:''
    }
  }

  getFormData(dataFromChild){
      Promise.resolve(dataFromChild).then((data) => {
        this.setState({body:data})
        this.setState({name:data.name})
        this.setState({formValid:true})
        this.setState({formError:''})
        stepper.next()
      })
    }

  isWalletConnected(){
    Promise.resolve(localStorage.getItem('walletConected'))
    .then((connected) => {
      console.log("CONNECTED: ")
      console.log(connected)
    if(connected !== null){
      console.log("ENTRO AQUI")
      Promise.resolve(this.setState({walletConnected:connected}))
      .then(() => {
        if(connected !== false){
          console.log("ENTRO AQUI TAMBIEN")
          stepper.next()
          this.setState({walletError:""})
        }  
      })    
    }else{
      this.setState({walletError:"You need to login in your account."})
    }
    })
  }
  findError(){
    let goTo = -1
    if(this.state.formValid === false){
      console.log("FALLA FORMVALID")
      this.setState({formError:"Seems that something is missing."})
      goTo = 1
    }

    return goTo    
  }
  validateForm(){
    return new Promise((resolve, reject) => {
      if(this.state.formValid === false){
        this.setState({formError:"Seems that something is missing."})
        stepper.to(1)
        reject()
      }else{
        resolve()
      }
    });
  }
  validateWallet(){
    return new Promise((resolve, reject) => {
      if(this.state.walletConnected === false){
        this.setState({walletError:"You need to login in your account."})
        stepper.to(2)
        reject()
      }else{
        resolve()
      }
    });
  }
  validateFields(){
    this.validateForm().then(() => {
      return this.validateWallet();
    }).then(() => {
      let dao = "0x0000000000000000ABADBABE0000000000000000"
			let data = {
				name:this.state.body.name,
				description:this.state.body.description,
				inviteLink:this.state.body.inviteLink,
				daoAddress:dao
			  }
		  createSquad(data).then((response) => {
        if(response.status === 200){
          document.location.href=`/squad/${response.data.newSquad._id}`
        }        
      }).catch((err) => {
        console.log("ALGO SALIO MAL :(")
        console.log(err)
      });
    }).catch((err) => {
      console.log("Algo Fallo")
    })
  }
  render(){
    document.addEventListener('DOMContentLoaded', function () {
      stepperEl = document.getElementById("bs-stepper")
      let options = {linear:false}
      stepper = new Stepper(document.querySelector('.bs-stepper'), options)
      console.log(stepper._currentIndex)     
    })
    localStorage.setItem('walletConected', false)
    return(
      <>
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
              <RegisterForm parentCallback={(data) => this.getFormData(data)}/>
            </div>
            <div id="information-part" className="content" role="tabpanel" aria-labelledby="information-part-trigger">         
              <div className="fullScreenSection">
              <div className="row">
                <div className ="col-xs-12 col-lg-8 mx-auto">
                {this.state.walletError.length === 0 ?'':(<div class="alert alert-danger" role="alert"> {this.state.walletError}</div>)}
                </div>
              </div>                  
                <h3 className="my-3">Register Your Account</h3>
                <Register></Register>
              </div>
            <div className="row">
              <div className="col-6">
                <button className="btn hdaoBtnContrast btn-lg" onClick={() => {stepper.previous()}}>Previous</button>
              </div>
              <div className="col-6 text-right">
                <button className="btn hdaoBtn btn-lg" onClick={() => {this.isWalletConnected()}}>Next</button>
              </div>
            </div>  
            </div>
            <div id="finish-part" className="content" role="tabpanel" aria-labelledby="finish-part-trigger">
              <div className="fullScreenSection">
                <h3>Launch {this.state.name} Squad</h3>
                <button className="btn hdaoBtnOutline btn-lg" onClick={() => {this.validateFields()}}>Launch</button>
              </div>
            <div className="row">
              <div className="col-6">
                <button className="btn hdaoBtnContrast btn-lg" onClick={() => {stepper.previous()}}>Previous</button>
              </div>
            </div>  
            </div>
          </div>
        </div>        
      </>
    )
  }
}