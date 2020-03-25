import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import '../new/Register';

import '../styles/styles.css';
import Register from '../new/Register';

class NewSquad extends React.Component {
	constructor() {
		super();
		this.state = {
			disabled: false
		};
	}

	render() {
		return (
			<div className='main'>
				<a href='/'>
					<HomeIcon id='home'></HomeIcon>
				</a>

				<div className='container'>
					<section>
						<h3>&#9937; Launch a New Squad &#9937;</h3>
						<form id='form' autoComplete='off'>
							<TextField
								id='standard-basic'
								label='Squad Name'
								required
							/>
							<TextField
								id='standard-basic'
								label='Squad Description'
								required
							/>

							<TextField
								id='standard-basic'
								label='Chat Invite Link'
								required
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
						<h3>&#128640; TakeOff &#128640;</h3>
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
