import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import '../new/Register';

import '../styles/styles.css';
import Register from '../new/Register';
import { createSquad } from "../../requests"

var name;
var description;
//var dao;
var inviteLink;

class NewSquad extends React.Component {
	constructor() {
		super();
		this.state = {
			disabled: false
		};
  }
  
  submitSquad = async () => {
    try {
      const body = {
        name,
        description,
        inviteLink: telegram,
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

				<div className='container'>
					<section>
						<h3> <span>&#9937;</span> Launch a New Squad <span>&#9937;</span></h3>
						<form id='form' autoComplete='off'>
							<TextField
								id='standard-basic'
								label='Squad Name'
								required
								onChange={event => {
									name = event.target.value;
								}}
							/>
							<TextField
								id='standard-basic'
								label='Squad Description'
								required
								onChange={event => {
									description = event.target.value;
								}}
							/>

							<TextField
								id='standard-basic'
								label='Chat Invite Link'
								required
								onChange={event => {
									inviteLink = event.target.value;
								}}
							/>
							<hr />
						</form>
						<a
							href='#register-dao'
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
					<section id='register-dao'>
						<Register />

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
							disabled={name && description && dao && telegram}
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
