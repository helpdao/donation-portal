import React from 'react'
import help_dao_min from "../assets/help_dao_min.svg";
import help_dao_wheel from "../assets/help_dao_wheel.svg";

export default class Footer extends React.Component {
    render(){
        return(
            <div id="top" class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="d-flex flex-grow-1">
                <span class="w-100 d-lg-none d-block"></span>
                <a class="navbar-brand d-none d-lg-inline-block" href="#">
                    <img src={help_dao_min} className="img-fluid d-inline-block align-top" alt=""/>
                </a>
                <a class="navbar-brand-two mx-auto d-lg-none d-inline-block" href="#">
                    <h4 className="red"><b>HELPDAO</b></h4>
                </a>
                <div class="w-100 text-right">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
            <div class="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
                <ul class="navbar-nav ml-auto flex-nowrap">
                <li class="nav-item">
                        <a class="nav-link hdaoLink m-2 menu-link dmSans bold" href="/">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link hdaoLink m-2 menu-link dmSans bold" href="/new">Launch a Help Squad</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link hdaoLink m-2 menu-link dmSans bold" href="https://helpdao.org/" target="_blank">What is HelpDAO</a>
                    </li> 
                </ul>
            </div>
        </div>
        );
    }
}