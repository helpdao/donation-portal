import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import help_dao from './assets/help_dao.svg';

import XXXSquad from './squads/XXX';
import YYYSquad from './squads/YYY';
import ZZZSquad from './squads/ZZZ';

import './App.css';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path='/'>
						<div className='home'>
							<img src={help_dao} alt='help_dao_logo'></img>
							<li>
								<button>
									<Link to='/XXX'>XXX Help Squad</Link>
								</button>
							</li>
							<li>
								<button>
									<Link to='/YYY'>YYY Help Squad</Link>
								</button>
							</li>
							<li>
								<button>
									<Link to='/ZZZ'>ZZZ Help Squad</Link>
								</button>
							</li>
							<p>.. more help on the way!</p>
						</div>
					</Route>
					<Route exact path='/XXX'>
						<XXXSquad />
					</Route>
					<Route exact path='/YYY'>
						<YYYSquad />
					</Route>
					<Route exact path='/ZZZ'>
						<ZZZSquad />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
