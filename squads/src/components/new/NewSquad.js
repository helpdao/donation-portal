import React from 'react';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import RegisterForm from './registerForm';
import RegisterWallet from './Register'
import { createSquad } from "../../requests"
import '../styles/styles.css';

var name = "";
var description ="";
var dao = "0x931D387731bBbC988B312206c74F77D004D6B84b";
var inviteLink = "";

class NewSquad extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
			body: null,
			formValid: false
		};
  }
  isWalletRegistered(){
	return new Promise(async (resolve, reject) => {
		let data = await localStorage.getItem('walletConected')
		if(data !== null){
			resolve(true);
		}else{
			resolve(false)
		}
	});
  }
  getFormData = (dataFromChild) => {
	  Promise.resolve(dataFromChild).then((data) => {
		  this.setState({body:data})
		  this.setState({formValid:true})
		  document.location.href="#register-dao"
		})
  }
  submitSquad = async () => {
    try {
		let walletConnected = await this.isWalletRegistered()
		if(this.state.formValid && walletConnected){
			let body = {
				name:this.state.body.name,
				description:this.state.body.description,
				inviteLink: this.state.body.inviteLink,
				daoAddress: dao
			  }
		  let response = await createSquad(body)
		  console.log(response)
		  document.location.href=`/squad/${response.newSquad._id}`
		}else if(!this.state.formValid){
			document.location.href="#dao-info"
		}else{
			document.location.href="#register-dao"
		}
    } catch (error) {
    	console.log(error)
    }
  }
	render() {

		return (
			
			<div className='main'>
				<a href='/'>
					<HomeIcon id='home'></HomeIcon>
				</a>
				<div className='container '>
					<section id="dao-info">
						<h3> <span role="img" aria-label="Rescue Worker’s Helmet">&#9937;</span> Launch a New Squad <span role="img" aria-label="Rescue Worker’s Helmet">&#9937;</span></h3>
						<RegisterForm parentCallback={this.getFormData}></RegisterForm>
					</section>
					<section id='register-dao'>
					<h3> It's time to connect your wallet:</h3>
						<RegisterWallet />
					</section>
					<section id='init-squad'>
						<h3> <span role="img" aria-label="Launching Rocket">&#128640;</span> TakeOff <span role="img" aria-label="Launching Rocket">&#128640;</span></h3>
						<Button
							id='next'
							variant='outlined'
							color='secondary'
							disabled={name && description && dao && inviteLink}
							onClick={this.submitSquad}
						>
							Init DAO
						</Button>
					</section>					
				</div>
			</div>
		);
	}
}

export default NewSquad;
