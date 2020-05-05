import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NewSquad from "./components/new/NewSquad";
import SquadPage from "./pages/SquadPage";
import Hero from "./components/Hero";
import SquadList from "./components/SquadList";
import Layout from './components/Layout'

import "./App.css";
import 'antd/dist/antd.less';
import { UseWalletProvider } from 'use-wallet';
import { currentNetwork, vars } from './vars';

function App() {
  return (
    <UseWalletProvider
      chainId={vars[currentNetwork].chainId}
      connectors={{
        fortmatic: { apiKey: vars[currentNetwork].fortmatic },
      }}
    >
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Hero />
              <SquadList />
            </Route>
            <Route exact path="/new">
              <NewSquad />
            </Route>
            <Route path="/squad/:squadId">
              <SquadPage />
            </Route>
            <Redirect to="/"/>
          </Switch>
        </Layout>
      </Router>
    </UseWalletProvider>
  );
}

export default App;
