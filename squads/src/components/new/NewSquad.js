import React from 'react'
import { Steps, Button, message } from 'antd';
import Register from './Register'
import RegisterForm from './registerForm'
import { createSquad } from "../../requests"

const { Step } = Steps;

const steps = [
  {
    title: 'Register',
    content: <Register></Register>,
  },
  {
    title: 'Enter details',
    content: <RegisterForm parentCallback={(data) => this.getFormData(data)}/>,
  },
  {
    title: 'Launch',
    content: 'Last-content',
  },
];

export default class NewSquad extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      body:null,
      name:'',
      fortmaticAddress:null,
      walletConnected:false,
      formValid:false,
      walletError:'',
      formError:'',
      current: 0,
    }
  }

  getFormData(dataFromChild){
      Promise.resolve(dataFromChild).then((data) => {
        this.setState({body:data})
        this.setState({name:data.name})
        this.setState({formValid:true})
        this.setState({formError:''})
      })
    }

  isWalletConnected(){
    Promise.resolve(localStorage.getItem('fortmatic'))
    .then((connected) => {
      console.log("CONNECTED: ")
      console.log(connected)
    if(connected !== null){
      Promise.resolve(this.setState({walletConnected:connected}))
      .then(() => {
        if(connected !== false){
          message.success("Registered!")
          this.next()
          this.setState({walletError:""})
        }  
      })    
    }else{
      this.setState({walletError:"You need to login in your account."})
      message.error("You need to login in your account.")
    }
    })
  }
  findError(){
    let goTo = -1
    if(this.state.formValid === false){
      this.setState({formError:"Seems that something is missing."})
      goTo = 1
    }

    return goTo    
  }
  validForm(){
    console.log("Not yet")
    return false
  }
  validateForm(){
    return new Promise((resolve, reject) => {
      if(this.state.formValid === false){
        this.setState({formError:"Seems that something is missing."})
        // stepper.to(1)
        reject()
      }else{
        resolve()
      }
    });
  }
  validateWallet(){
    return new Promise((resolve, reject) => {
      if (this.state.walletConnected === false){
        this.setState({walletError:"You need to login in your account."})
        // thisstepper.to(2)
        reject()
      } else {
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
				name: this.state.body.name,
				description: this.state.body.description,
				inviteLink: this.state.body.inviteLink,
				daoAddress: dao,
			}
		  createSquad(data).then((response) => {
        if (response.status === 200) {
          document.location.href=`/squad/${response.data.newSquad._id}`
        }        
      }).catch((err) => {
        console.log(err)
      });
    }).catch((err) => {})
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  validateStep(){
    if(this.state.current === 0){
      Promise.resolve(localStorage.getItem('fortmatic'))
      .then((fortmatic) => {
        console.log("FORTMATIC: " + fortmatic)
        if(fortmatic.length !== 0){
          this.next()
        }else
          message.error("You need to log in your account!")
      })

    }else if(this.state.current === 1){
      if(this.validForm()){
        this.next()
      }else{
        message.error("Review the form!")
      }
    }
  }
  render(){
    const { current } = this.state;
    localStorage.setItem('fortmatic', '')

    return(
      
      <>
        <div>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.validateStep()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>      
      </>
    )
  }
}