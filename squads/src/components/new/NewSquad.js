import React from 'react';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import RegisterForm from './registerForm';
import RegisterWallet from './Register'
import { createSquad } from "../../requests"
import Layout from '../Layout'

let dao = "0x0000000000000000ABADBABE0000000000000000";

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
			Promise.resolve(this.setState({daoInfoError:"Seems that something is missing."})).then(() => document.location.href="#top");
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
			<Layout>
				<div  id="dao-info" className='container mt-5'>
					<section >
						<div className="row">
							<div className="col-xs-12 col-lg-8 mx-auto text-center">

								<h3 className="mt-3">
									<span role="img" aria-label="Rescue Worker’s Helmet">&#9937; </span>
									Launch a New Squad
									<span role="img" aria-label="Rescue Worker’s Helmet"> &#9937;</span>
								</h3>
								{this.state.daoInfoError.length === 0 ? '':<div className="alert alert-danger mt-3"> {this.state.daoInfoError} — check it out!</div>}
								{this.state.requestError.length === 0 ? '':<div className="alert alert-danger mt-3"> {this.state.requestError} — check it out!</div>}
							</div>
						</div>
						<div className="row mt-3">
							<div className="col-xs-12 col-lg-8 mx-auto">
								<RegisterForm parentCallback={this.getFormData}></RegisterForm>
							</div>
						</div>
					</section>
					<section id='register-dao' className="fullScreenSection">
					<div className="row">
							<div className="col-xs-12 col-lg-8 mx-auto text-center">						
							{this.state.walletRegisterError.length === 0 ? '':<div className="alert alert-danger"> {this.state.walletRegisterError} — check it out!</div>}
							<h3 className="mt-3">Register Your Account</h3>
					</div>
					</div>
						<RegisterWallet />
					</section>
					<section id='init-squad' className="fullScreenSection">
						<h3> <span role="img" aria-label="Launching Rocket">&#128640;</span> TakeOff <span role="img" aria-label="Launching Rocket">&#128640;</span></h3>
						<button
							id='launchSquadButton'
							className="btn hdaoBtnOutline btn-lg mt-3"
							onClick={this.submitSquad}
						>
							Launch Squad
						</button>
					</section>					
				</div>
			</Layout>

		);
	}
}

export default NewSquad;
