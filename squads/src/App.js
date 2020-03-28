import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import help_dao from "./assets/help_dao.svg";
import NewSquad from "./components/new/NewSquad";
import Register from "./components/new/Register";
import SquadDetail from "./components/SquadDetail";
import SquadList from "./components/SquadList";
import Layout from './components/Layout'
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import "./App.css";

//Enabling Tooltips:
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Layout>
            <div className="container mt-5">
                <div className="row">
                <div className="col-xs-7 col-lg-7 text-center mx-auto">
                  <img className="img-fluid" src={help_dao} alt="help_dao_logo" />
                </div>
              </div>
              <div className="mt-3">
                <SquadList />
              </div>
            </div>
          </Layout>

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
