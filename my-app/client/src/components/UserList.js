import React, {Component} from 'react';
import {ListGroup} from "react-bootstrap";
import {GoPrimitiveDot} from "react-icons/go";

class UserList extends Component {
    render() {

            let ActiveList= this.props.UserList;
            let ActiveListView= ActiveList.map((List,i)=>{
                return(
                    <ListGroup.Item><GoPrimitiveDot className="text-success"/> {List['Name']}</ListGroup.Item>
                )
            })

        return (
            <div>
                <ListGroup className="bg-dark" variant="flush">
                    {ActiveListView}
                </ListGroup>
            </div>
        );
    }
}

export default UserList;