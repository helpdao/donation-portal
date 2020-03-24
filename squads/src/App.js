import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import help_dao from "./assets/help_dao.svg";

import NewSquad from "./components/new/NewSquad";
import Register from "./components/new/Register";
import SquadDetail from "./components/SquadDetail";
import SquadList from "./components/SquadList";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="home">
            <Link to="/new">
              <button id="new-squad">Launch a help squad</button>
            </Link>

            <img src={help_dao} alt="help_dao_logo" />
            <SquadList />
          </div>
        </Route>
        <Route exact path="/new">
          <NewSquad />
        </Route>
        <Route exact path="/new/register">
          <Register />
        </Route>
        <Route path="/squad/:squadId" component={SquadDetail} />
      </Switch>
    </Router>
  );
}

export default App;
