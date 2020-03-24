import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useWallet, UseWalletProvider } from 'use-wallet';

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
	let wallet = useWallet();
	return (
		<div className='container'>
			{wallet.connected ? (
				<div>Registered!</div>
			) : (
				<button onClick={() => wallet.activate('fortmatic')}>Register</button>
			)}
			<button id='form-submit'>Launch squad</button>
		</div>
	);
};

export default () => (
	<UseWalletProvider
		chainId={1}
		connectors={{
			// This is how connectors get configured
			fortmatic: { apiKey: 'pk_live_C11CB41780801641' },
		}}
	>
		<NewSquad />
	</UseWalletProvider>
)