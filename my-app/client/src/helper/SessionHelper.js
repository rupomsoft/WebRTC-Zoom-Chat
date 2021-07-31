class SessionHelper{
    static setName(Name){
        sessionStorage.setItem("Name",Name)
    }
    static getName(){
       return  sessionStorage.getItem("Name")
    }

    static setPeerID(PeerID){
        sessionStorage.setItem("PeerID",PeerID)
    }
    static getPeerID(){
       return  sessionStorage.getItem("PeerID")
    }

    static logOut(){
        sessionStorage.clear();
    }


}
export default SessionHelper;