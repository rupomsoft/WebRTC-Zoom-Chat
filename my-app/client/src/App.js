import React, {Component} from 'react';
import io from "socket.io-client";
class App extends Component {
    componentDidMount() {
        const socket = io.connect('/');
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}
export default App;