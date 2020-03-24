import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import help_dao from './assets/help_dao.svg';

import XXXSquad from './components/squads/XXX';
import YYYSquad from './components/squads/YYY';
import ZZZSquad from './components/squads/ZZZ';

import NewSquad from './components/new/NewSquad';
import Register from './components/new/Register';

import './App.css';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<div className='home'>
						<Link to='/new'>
							<button id='new-squad'>Launch a help squad</button>
						</Link>

						<img src={help_dao} alt='help_dao_logo'></img>
						<li>
							<Link to='/XXX'>
								<button>XXX Help Squad</button>
							</Link>
						</li>
						<li>
							<Link to='/YYY'>
								<button>YYY Help Squad</button>
							</Link>
						</li>
						<li>
							<Link to='/ZZZ'>
								<button>ZZZ Help Squad</button>
							</Link>
						</li>
						<p>.. more help on the way!</p>
					</div>
				</Route>
				<Route exact path='/new'>
					<NewSquad />
				</Route>
				<Route exact path='/new/register'>
					<Register />
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

export default App;
