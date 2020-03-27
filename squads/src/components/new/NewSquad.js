import React from 'react';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import Alert from '@material-ui/lab/Alert';
import RegisterForm from './registerForm';
import RegisterWallet from './Register'
import { createSquad } from "../../requests"
import '../styles/styles.css';

let dao = "0x931D387731bBbC988B312206c74F77D004D6B84b";

class NewSquad extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
			body: null,
			formValid: false,
			daoInfoError:'',
			walletRegisterError:'',
			requestError:''
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
		  this.setState({daoInfoError:''})
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
			if(response.status === 200){
				document.location.href=`/squad/${response.data.newSquad._id}`
			}
		}else if(!this.state.formValid){
			Promise.resolve(this.setState({daoInfoError:"Review the form, somenthing is missing."})).then(() => document.location.href="#dao-info");
		}else{
			Promise.resolve(this.setState({walletRegisterError:"You need to login into your wallet."})).then(() => document.location.href="#register-dao");
		}
    } catch (err) {
		let error = "Somenthing goes wrong. Try it again in a while"
		Promise.resolve(this.setState({requestError:error})).then(() => document.location.href="#dao-info")
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
					{this.state.daoInfoError.length === 0 ? '':<Alert severity="error"> {this.state.daoInfoError} — check it out!</Alert>}
					{this.state.requestError.length === 0 ? '':<Alert severity="error"> {this.state.requestError} — check it out!</Alert>}

						<h3> <span role="img" aria-label="Rescue Worker’s Helmet">&#9937;</span> Launch a New Squad <span role="img" aria-label="Rescue Worker’s Helmet">&#9937;</span></h3>
						<RegisterForm parentCallback={this.getFormData}></RegisterForm>
					</section>
					<section id='register-dao'>
					{this.state.walletRegisterError.length === 0 ? '':<Alert severity="error"> {this.state.walletRegisterError} — check it out!</Alert>}
					<h3> It's time to connect your wallet:</h3>
						<RegisterWallet />
					</section>
					<section id='init-squad'>
						<h3> <span role="img" aria-label="Launching Rocket">&#128640;</span> TakeOff <span role="img" aria-label="Launching Rocket">&#128640;</span></h3>
						<Button
							id='next'
							variant='outlined'
							color='secondary'
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
