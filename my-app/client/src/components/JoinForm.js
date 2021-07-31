import React, {Component, Fragment} from 'react';
import SessionHelper from "../helper/SessionHelper";
import {Redirect} from "react-router";
import cogoToast from "cogo-toast";
import {NameRequired} from "../helper/ToastHelper";

class JoinForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            name:"",
            redirect:false
        }
    }

    OnJoin=()=>{
        if(this.state.name.length===0){
            NameRequired();
        }
        else {
            SessionHelper.setName(this.state.name);
            this.setState({redirect:true})
        }
    }

    pageRedirect=()=>{
        if(this.state.redirect===true){
            return(<Redirect to="/meet"/>)
        }
    }


    render() {
        return (
            <Fragment>
                <div className="center text-center">
                    <h3 className="nav-item">Join Team</h3>
                    <input onChange={(e)=>{this.setState({name:e.target.value})}} placeholder="Your Name" type="text" className="form-control text-center form-rounded mt-3"/>
                    <button onClick={this.OnJoin} className="btn w-100 mt-3 btn-rounded btn-primary">Start</button>
                </div>
                {this.pageRedirect()}
            </Fragment>
        );
    }



}
export default JoinForm;