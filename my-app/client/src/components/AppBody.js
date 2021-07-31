import React, {Component, Fragment} from 'react';
import UserList from "./UserList";




class AppBody extends Component {






    render() {

        return (
            <Fragment>
                <div className="container-fluid m-0 p-0 ">
                    <div className="row">
                        <div className="col-md-10">

                        </div>
                        <div className="col-md-2 ">
                            <div className="user-list-section">
                                <UserList UserList={this.props.UserList}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default AppBody;