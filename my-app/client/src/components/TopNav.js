import React, {Component, Fragment} from 'react';
import {Container, Navbar} from "react-bootstrap";
import navIcon from '../assets/images/teams.svg'
import {GoSignOut} from "react-icons/go";
import SessionHelper from "../helper/SessionHelper";
import {Redirect} from "react-router";

class TopNav extends Component {

    constructor() {
        super();
        this.state={
            Redirect:false
        }
    }

    logOut=()=>{
        SessionHelper.logOut();
        this.setState({Redirect:true})
    }

    pageRedirect=()=>{
        if(this.state.Redirect===true){
            window.location.href="/";
        }
    }

    render() {

        let logoutBtn= <button onClick={this.logOut} className="btn mx-1"><GoSignOut className="bottom-nav-item"/></button>
        if(SessionHelper.getName()===null){
            logoutBtn=<span></span>
        }

        return (
            <Fragment>
                {this.pageRedirect()}
                <Navbar className="sticky-top" bg="dark">
                    <Container fluid={true}>
                        <Navbar.Brand  href="#home"><img className="nav-icon" alt="" src={navIcon}/> <span className="nav-item mx-2">   Team Meet</span></Navbar.Brand>
                        {logoutBtn}
                    </Container>
                </Navbar>
            </Fragment>
        );
    }
}

export default TopNav;