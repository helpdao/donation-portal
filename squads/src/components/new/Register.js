import React from 'react';
import { useWallet, UseWalletProvider } from 'use-wallet';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';

import '../styles/styles.css';

const NewSquad = (props) => {
	const wallet = useWallet();
	const loadPluggin = () => {
		wallet.activate('fortmatic')
	}

	const isConnected = () => {
		if(wallet.account !== null){
			document.location.href="#init-squad"
			localStorage.setItem('fortmatic', wallet.account);
			return(
				<Alert severity="success">Account connected!</Alert>
			)
		}

		}
	return (
			<div>
			{wallet.connected ? (
				isConnected()
			) : (wallet.activating !== null ? (
				<div className="spinner-border red" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			):(	
				<button
				onClick = { () => {loadPluggin()}}
				className="btn hdaoBtnOutline btn-lg">
				Register
				</button>
			)
			)}
			</div>
	);
};

export default(props) => {
	
	return(
	<UseWalletProvider
		chainId={1}
		connectors={{
			// This is how connectors get configured
			fortmatic: { apiKey: 'pk_live_C11CB41780801641' }
		}}
	>
		<NewSquad />
	</UseWalletProvider>
)};