import React from 'react';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import RegisterForm from './registerForm';
import Register from './Register'
import { createSquad } from "../../requests"
import '../styles/styles.css';

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
  getFormData = (dataFromChild) => {
	this.state.body = dataFromChild;
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
	render() {
		return (
			<div className='main'>
				<a href='/'>
					<HomeIcon id='home'></HomeIcon>
				</a>

				<div className='container '>
					<section>
						<h3> <span>&#9937;</span> Launch a New Squad <span>&#9937;</span></h3>
						<RegisterForm ref="submit" parentCallback={this.getFormData}></RegisterForm>
						<Register/>
					</section>
				</div>
			</div>
		);
	}
}

export default NewSquad;
