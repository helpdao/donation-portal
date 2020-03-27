import React from 'react';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import {withRouter} from 'react-router-dom'
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
			body: null
		};
  }
  getFormData = (dataFromChild) => {
	  Promise.resolve(dataFromChild).then((data) => {
		  this.setState({body:data})
		  //this.props.history.push("#register-dao")
		  document.location.href="#register-dao"
		})
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
						<RegisterForm parentCallback={this.getFormData}></RegisterForm>
					</section>
					<section id='register-dao'>
						<RegisterWallet />

						<a
							href='#init-squad'
							style={{ textDecoration: 'none' }}
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

export default withRouter(NewSquad);
