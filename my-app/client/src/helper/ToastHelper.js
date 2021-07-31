import cogoToast from "cogo-toast";

class ToastHelper{

    NameRequired(){
        cogoToast.error( <div className="toast-text">Your Name Required !</div>,{position:"bottom-center"})
    }
    RequestFail(){
        cogoToast.error( <div className="toast-text">Request Fail ! Try Again !</div>,{position:"bottom-center"})
    }

    AnnounceInfo(info){
        cogoToast.info( <div className="toast-text">{info}</div>,{position:"bottom-center"})
    }

}
export const {NameRequired,RequestFail,AnnounceInfo}=new ToastHelper();