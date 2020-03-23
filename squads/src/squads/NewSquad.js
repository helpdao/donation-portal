import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './styles.css';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '50ch'
		}
	}
}));

const NewSquad = () => {
	const classes = useStyles();
	return (
		<div className='container'>
			<form
				className={classes.root}
				id='form'
				noValidate
				autoComplete='off'
			>
				<TextField id='standard-basic' label='Name' />
				<TextField id='standard-basic' label='Description' />
				<TextField id='standard-basic' label='DAO Address' />
				<TextField id='standard-basic' label='Chat Invite Link' />
			</form>
			<button id='form-submit'>Init Squad</button>
		</div>
	);
};

export default NewSquad;
