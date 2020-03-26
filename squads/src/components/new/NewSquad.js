import React from 'react';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import RegisterForm from './registerForm';
import '../new/Register';

import '../styles/styles.css';
import Register from '../new/Register';
import { createSquad } from "../../requests"

var name = "";
var description ="";
var dao = "0x931D387731bBbC988B312206c74F77D004D6B84b";
var inviteLink = "";

class NewSquad extends React.Component {
	constructor() {
		super();
		this.state = {
			disabled: false,
			body: null
		};
  }
  myCallback = (dataFromChild) => {
	this.state.body = dataFromChild;
	console.log(dataFromChild)
  }
  submitSquad = async () => {
    try {
      const body = {
        name,
        description,
        inviteLink: inviteLink,
        daoAddress: dao
      }
      await createSquad(body)
    } catch (error) {
      console.log(error)
    }
  }
  getFormData = () => {
	console.log("GettingData")
	this.refs.submit.mySubmitHandler()
  }
	render() {
		return (
			<div className='main'>
				<a href='/'>
					<HomeIcon id='home'></HomeIcon>
				</a>

				<div className='container'>
					<section>
						<h3> <span>&#9937;</span> Launch a New Squad <span>&#9937;</span></h3>
						<RegisterForm ref="submit" callback={this.myCallback}></RegisterForm>
						<a
							href={ this.state.body != null ? '#register-dao':'#' }
							style={{ textDecoration: 'none' }}
						>
							<Button
								onClick={this.getFormData}
								id='next'
								variant='outlined'
								color='secondary'
							>
								Next
							</Button>
						</a>
					</section>
					<section id='register-dao'>
						<Register />

						<a
							href='#init-squad'
							style={{ textDecoration: 'none' }}
							onClick={this.getFormData}

						>
							<Button
								id='next'
								variant='outlined'
								color='secondary'
							>
								Next
							</Button>
						</a>
					</section>
					<section id='init-squad'>
						<h3> <span>&#128640;</span> TakeOff <span>&#128640;</span></h3>
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
