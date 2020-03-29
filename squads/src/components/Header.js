import React from 'react'
import help_dao_min from "../assets/help_dao_min.svg";
import help_dao_wheel from "../assets/help_dao_wheel.svg";

export default class Footer extends React.Component {
    render(){
        return(
            <div id="top" className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="d-flex flex-grow-1">
                <span className="w-100 d-lg-none d-block"></span>
                <a className="navbar-brand d-none d-lg-inline-block" href="#">
                    <img src={help_dao_min} className="img-fluid d-inline-block align-top" alt=""/>
                </a>
                <a className="navbar-brand-two mx-auto d-lg-none d-inline-block" href="#">
                    <h4 className="red"><b>HELPDAO</b></h4>
                </a>
                <div className="w-100 text-right">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
            <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
                <ul className="navbar-nav ml-auto flex-nowrap">
                <li className="nav-item">
                        <a className="nav-link hdaoLink m-2 menu-link dmSans bold" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link hdaoLink m-2 menu-link dmSans bold" href="/new">Launch a Help Squad</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link hdaoLink m-2 menu-link dmSans bold" href="https://helpdao.org/" target="_blank">What is HelpDAO</a>
                    </li> 
                </ul>
            </div>
        </div>
        );
    }
}