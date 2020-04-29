import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NewSquad from "./components/new/NewSquad";
import Register from "./components/new/Register";
import SquadPage from "./pages/SquadPage";
import Hero from "./components/Hero";
import SquadList from "./components/SquadList";
import Layout from './components/Layout'

import "./App.css";
import 'antd/dist/antd.less';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Hero />
            <SquadList />
          </Route>
          <Route path="/new">
            <NewSquad />
          </Route>
          <Route path="/new/register">
            <Register />
          </Route>
          <Route path="/squad/:squadId">
            <SquadPage />
          </Route>
          <Route>
            <Redirect to="/"/>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
