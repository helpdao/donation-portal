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
			disabled: true,
			valid: false
		};
	}

	render() {
		return (
			<div className='container'>
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
					<div className='dao-section'>
						<TextField
							style={{ width: '100%' }}
							id='standard-basic'
							label='DAO Address'
							required
							helperText='Register a DAO if not available'
							onChange={event => {
								dao = event.target.value;
							}}
						/>
						<Register />
					</div>
					<TextField
						id='standard-basic'
						label='Chat Invite Link'
						required
						onChange={event => {
							telegram = event.target.value;
							if (name && description && dao && telegram) {
								this.setState({ disabled: false });
							} else {
								this.setState({ disabled: true });
							}
						}}
					/>
				</form>
				<Button
					id='submit'
					disabled={this.state.disabled}
					variant='outlined'
					color='secondary'
				>
					Init Squad
				</Button>
			</div>
		);
	}
}

export default NewSquad;
