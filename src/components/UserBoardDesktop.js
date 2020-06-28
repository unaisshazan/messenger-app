import React from 'react';
// import { Link } from 'react-router-dom';
// import { directive } from '@babel/types';
import '../css/UserBoardDesktop.css';
import { withFirebase }from './Firebase';

import { withRouter } from 'react-router-dom';

class UserBoardDesktop extends React.Component {
    constructor(props) {
        super(props)

        this.redirectSignOut = this.redirectSignOut.bind(this);
        this.state = { 'name': null, "userList": [] }
    }
    redirectSignOut() {
        console.log("Hello")
        this.props.firebase.doSignOut()
            .then(() => {
                // console.log("Hello")
                this.props.history.push('/sign-in')
            })
    }
    
    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                
                // Current User
                let currentUserID = this.props.firebase.currentUser();
                this.props.firebase.user(currentUserID).once('value', (snapshot) => {
                    let name = snapshot.val().username;
                    this.setState({"name": name})
        })

                // User List
                this.props.firebase.users().once('value', (snapshot) => {
                    let arrayUser = []
                    snapshot.forEach((childSnapshot) => {
                        let name = childSnapshot.val().username;
                        arrayUser.push(name);
                    })
                    this.setState({"userList": arrayUser})
                    // console.log(this.state.userList)
                })
            }
        })
    }

    componentWillUnmount() {
         this.listener();
    }

    render() {
        return (
            <div className="user-board col-sm-3">
                <h1 className="user-name">{this.state.name}</h1>
                {this.state.userList.map((user, index) => (
                    <p key={index}className="friend-name">{user}</p>
                ))}
                <button className="log-out col-sm-3" onClick={this.redirectSignOut}>Log Out</button>
            </div>
        )
    }
}

export default withRouter(withFirebase(UserBoardDesktop));
