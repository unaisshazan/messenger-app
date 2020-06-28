import React from 'react';
import '../css/MessageContentDesktop.css';
// import { directive } from '@babel/types';
import { withFirebase } from './Firebase';
import Messages from './Messages';

class MessageContentDesktop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
        };
    }

    componentDidMount() {
        // Authenticated User's Name
        this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                
                // Current User
                let currentUserID = this.props.firebase.currentUser();
                this.props.firebase.user(currentUserID).once('value', (snapshot) => {
                    let name = snapshot.val().username;
                    this.setState({"name": name})
                })
            }
        })
        
    }

    componentWillUnmount() {
        this.listener();
        this.props.firebase.users().off();
    }

    render() {
        return (
            <div className="message-content-container col-sm-9">
                <div className="header-desktop">
                    <h1 className="user-name-desktop">{this.state.name}</h1>
                </div>
                <Messages/>
            </div>
        )
    }
}


export default withFirebase(MessageContentDesktop);
