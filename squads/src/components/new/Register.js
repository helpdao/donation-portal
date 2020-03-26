import React from 'react';
import { useWallet, UseWalletProvider } from 'use-wallet';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import '../styles/styles.css';

const NewSquad = () => {
	let wallet = useWallet();
	return (
		<div>
			{wallet.connected ? (
				<div>Registered!</div>
			) : (
				<Tooltip title='Register to create a DAO' placement='top'>
					<Button
						id='register-dao'
						size='large'
						onClick={() => wallet.activate('fortmatic')}
					>
						<span role="img" aria-label="Round Pushpin">&#128205;</span> Register DAO <span role="img" aria-label="Round Pushpin">&#128205;</span>
					</Button>
				</Tooltip>
			)}
		</div>
	);
};

export default () => (
	<UseWalletProvider
		chainId={1}
		connectors={{
			// This is how connectors get configured
			fortmatic: { apiKey: 'pk_live_C11CB41780801641' }
		}}
	>
		<NewSquad />
	</UseWalletProvider>
);
