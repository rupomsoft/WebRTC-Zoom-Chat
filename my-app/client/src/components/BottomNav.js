import React, {Component} from 'react';
import {FaVideo} from "react-icons/fa";
import {TiMicrophone} from "react-icons/ti";
import {MdScreenShare,MdMessage} from "react-icons/md";
import {GoSignOut} from 'react-icons/go';
import {FaUsers} from "react-icons/fa";
import {Badge} from "react-bootstrap";
import SessionHelper from "../helper/SessionHelper";



class BottomNav extends Component {
    render() {
        let UserList=this.props.UserList;
        let UserListLength=UserList.length;
        return (
            <div className=" bottom-navbar   p-3 fixed-bottom container-fluid">
                    <div className="row  justify-content-center">
                        <div className="col-md-6 col-lg-6 text-center col-sm-12">
                            <div className="d-inline-flex">


                                <button  className="btn mx-1">
                                    <FaVideo className="bottom-nav-item"/>
                                </button>

                                <button  className="btn mx-1">
                                    <TiMicrophone className="bottom-nav-item"/>
                                </button>

                                <button  className="btn mx-1">
                                    <MdScreenShare className="bottom-nav-item"/>
                                </button>


                                <button  className="btn mx-1">
                                    <MdMessage className="bottom-nav-item"/>
                                </button>



                                <button  className="btn mx-1">
                                    <FaUsers className="bottom-nav-item"/> <span className="badge">{UserListLength}</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default BottomNav;