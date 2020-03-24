import React from 'react';
import { useWallet, UseWalletProvider } from 'use-wallet';
import Button from '@material-ui/core/Button';

import '../styles/styles.css';

const NewSquad = () => {
	let wallet = useWallet();
	return (
		<div>
			{wallet.connected ? (
				<div>Registered!</div>
			) : (
				<Button
					id='register-dao'
					size='small'
					onClick={() => wallet.activate('fortmatic')}
				>
					Register
				</Button>
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
