import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NewSquad from "./components/new/NewSquad";
import Register from "./components/new/Register";
import SquadDetail from "./components/SquadDetail";
import Hero from "./components/Hero";
import SquadList from "./components/SquadList";
import Layout from './components/Layout'
import Container from '@material-ui/core/Container'
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import "./App.css";
import 'antd/dist/antd.less';

//Enabling Tooltips:
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
function App() {
  return (
    <Router>
      <Switch>
        <Layout>
          <Container maxWidth="md">
            <Route exact path="/">
              <Hero />
              <SquadList />
            </Route>
            <Route exact path="/new">
              <NewSquad />
            </Route>
            <Route exact path="/new/register">
              <Register />
            </Route>
            <Route path="/squad/:squadId" component={SquadDetail} />
          </Container>
          </Layout>
      </Switch>
    </Router>
  );
}

export default App;
