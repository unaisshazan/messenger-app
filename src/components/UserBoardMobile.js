import React from 'react';
import '../css/UserBoardMobile.css'
import { withFirebase }from './Firebase';

import { withRouter } from 'react-router-dom';

class UserBoardMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {boardWidth: 325};
   
        this.redirectSignOut = this.redirectSignOut.bind(this);
        this.state = { 'name': null, "userList": [] }
    }
    
    redirectSignOut() {
        this.props.firebase.doSignOut()
            .then(() => {
                this.props.history.push('/sign-in')
            })
    }

    toggleBoard() {
        if(this.state.boardWidth === 325) {
            this.setState({boardWidth: 0})
        } else {
            this.setState({boardWidth: 325})
        }
    }

    componentDidMount() {
        // Current User
        this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
            if(authUser) {
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
            <div 
                className="user-mobile-board"
                style={{ width: this.state.boardWidth }}
            >
                <div className="header-mobile-sideboard">
                    <h1 className="user-name-mobile">Nam Nguyen</h1>
                <button className="toggle-board-button-close" onClick={() => {this.toggleBoard()}}><span>&#9746;</span></button>
                </div>
                <button className="toggle-board-button-open" onClick={() => {this.toggleBoard()}}><span></span></button>

                {this.state.userList.map((user, index) => (
                    <p key={index}className="friend-name">{user}</p>
                ))}
                <p className="log-out-mobile" onClick={this.redirectSignOut}>Log Out</p>
            </div>
        )
    }
}

export default withRouter(withFirebase(UserBoardMobile));
