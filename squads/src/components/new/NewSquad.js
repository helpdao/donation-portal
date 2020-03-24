import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import '../new/Register';

import '../styles/styles.css';
import Register from '../new/Register';

var name;
var description;
var dao;
var telegram;

class NewSquad extends React.Component {
	constructor() {
		super();
		this.state = {
			disabled: true
		};
	}

	render() {
		return (
			<div className='main'>
				<div className='container'>
					<section>
						<h3>Launch a New Squad</h3>
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
									telegram = event.target.value;
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
						<h3>TakeOff</h3>
						<form id='form' autoComplete='off'>
							<TextField
								id='standard-basic'
								label='DAO Address'
								required
								helperText='Enter the address of the registered DAO'
								onChange={event => {
									dao = event.target.value;
									if (
										name &&
										description &&
										telegram &&
										dao
									) {
										this.setState({
											disabled: false
										});
									} else {
										this.setState({
											disabled: true
										});
									}
								}}
							/>
						</form>
						<hr></hr>
						<Button
							id='next'
							variant='outlined'
							color='secondary'
							disabled={this.state.disabled}
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
