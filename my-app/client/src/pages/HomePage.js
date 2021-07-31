import React, {Component, Fragment} from 'react';
import TopNav from "../components/TopNav";
import AppBody from "../components/AppBody";
import BottomNav from "../components/BottomNav";
import Peer from 'peerjs';
import SessionHelper from "../helper/SessionHelper";
import {AnnounceInfo, RequestFail} from "../helper/ToastHelper";
import io from 'socket.io-client';
import {Helmet} from "react-helmet";
import {Redirect} from "react-router";


const socket= io.connect('/')
class HomePage extends Component {

    constructor() {
        super();
        this.state={
            UserList:[],
            Redirect:false,
            PeerObj:null,
            ConnectedPeerList:[],
            Constraints:{'video':true,'audio':false}
        }
    }

    pageRedirect=()=>{
        if(this.state.Redirect===true){
            return(<Redirect to="/"/>)
        }
    }

    componentDidMount() {
        if(SessionHelper.getName()!==null){
            this.creatPeerID();
        }
        else {
            this.setState({Redirect:true})
        }
    }

    creatPeerID=()=>{
        let peer=new Peer();
        this.setState({PeerObj:peer})
        peer.on('open',(id)=>{
            if(id.length!==0){

                let MyConnectedPeerList=this.state.ConnectedPeerList;
                MyConnectedPeerList.push(id);
                this.setState({ConnectedPeerList:MyConnectedPeerList})

                SessionHelper.setPeerID(id);
                this.CreateNewUser(id);
                this.AnnounceNewJoiner();
                this.GetJoinerList();
                this.AnnounceLeftJoiner();
            }
            else {
                RequestFail();
            }
        })
    }

    CreateNewUser=(PeerID)=>{
        socket.emit('CreateNewUser',{'Name':SessionHelper.getName(),'PeerID':PeerID})
    }

    AnnounceNewJoiner=()=>{
        socket.on('AnnounceNewJoiner',(Name)=>{
            AnnounceInfo(Name+" Joined");
            let msg = new SpeechSynthesisUtterance();
            msg.text = Name+" Has Been Joined";
            window.speechSynthesis.speak(msg);
        })
    }

    AnnounceLeftJoiner=()=>{
        socket.on('AnnounceLeftJoiner',(Name)=>{
            AnnounceInfo(Name+" Left");
            let msg = new SpeechSynthesisUtterance();
            msg.text = Name+" Has Been Left";
            window.speechSynthesis.speak(msg);
        })
    }

    GetJoinerList=()=>{
        socket.on('UserList',(AppUserList)=>{
           this.setState({UserList:AppUserList});
           AppUserList.map((list)=>{
               this.CreateMutualConnection(list['PeerID'])

           })
        });
    }


    CreateMutualConnection=(OtherPeerID)=>{
        let MyConnectedPeerList=this.state.ConnectedPeerList;
        if(!MyConnectedPeerList.includes(OtherPeerID)){
            let myPeer=this.state.PeerObj;
            let conn=myPeer.connect(OtherPeerID);
            conn.on('open',()=>{
                let MyConnectedPeerList=this.state.ConnectedPeerList;
                MyConnectedPeerList.push(OtherPeerID);
                this.setState({ConnectedPeerList:MyConnectedPeerList})
                conn.send(SessionHelper.getName());
            })
            myPeer.on('connection',(conn)=>{
                conn.on('data',(data)=>{
                    console.log(data)
                })
            })
        }
    }



    CreateMutualVideoCall=(OtherPeerID)=>{
        let MyConnectedPeerList=this.state.ConnectedPeerList;
        if(!MyConnectedPeerList.includes(OtherPeerID)){
            let myPeer=this.state.PeerObj;
            navigator.mediaDevices.getUserMedia(this.state.Constraints)
                .then((stream)=>{

                    let call=myPeer.call(OtherPeerID,stream)
                    call.on('stream',(remoteStream)=>{

                    })
                })
                .catch(()=>{

                })
        }
    }

    ReceiveMutualVideoCall=()=>{
        let myPeer=this.state.PeerObj;
        myPeer.on('call',(call)=>{
            navigator.mediaDevices.getUserMedia(this.state.Constraints)
                .then((stream)=>{

                    call.answer(stream)
                    call.on('stream',(remoteStream)=>{

                    })
                })
                .catch(()=>{

                })
        })
    }



    render() {
        return (
            <Fragment>
                {this.pageRedirect()}
                <Helmet>
                    <title>{SessionHelper.getName()}</title>
                </Helmet>
                <TopNav/>


                <BottomNav UserList={this.state.UserList}/>
            </Fragment>
        );
    }
}

export default HomePage;