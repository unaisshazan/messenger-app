
import React from 'react';
import '../css/MessageContentDesktop.css';
// import { directive } from '@babel/types';
import { withFirebase } from './Firebase';
import { withAuthentication, AuthUserContext } from './Session';

class MessageChat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            messages: [],
            username: '',
        }

    }

    componentDidMount = () => {
        this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                        
                // Current User
                let currentUserID = this.props.firebase.currentUser();
                this.props.firebase.user(currentUserID).once('value', (snapshot) => {
                    let name = snapshot.val().username;
                    this.setState({username: name})
                })

                this.props.firebase
                    .messages()
                    .on('value', (snapshot) => {
                        const messageObject = snapshot.val()
                        
                        if(messageObject) {
                            const messageList = Object.keys(messageObject).map(key => ({
                                ...messageObject[key],
                                uid: key,
                            }));

                            this.setState({messages: messageList})
                        } else {
                            this.setState({messages: null})
                    }
                })
            }
        })
    }

    componentWillUnmount() {
        this.listener();
        this.props.firebase.messages().off();
    }

    onChangeText = event => {
        this.setState({text : event.target.value })
    }

    onCreateMessage = (event, authUser) => { 
        event.preventDefault()
    
        this.props.firebase.messages().push({
            text: this.state.text,
            userId: authUser.uid,
            username: this.state.username
        });
      this.setState({ text: '' });

    }

    render() {
        const { text, messages } = this.state;

        return(
            <AuthUserContext.Consumer>
            { authUser => (
                <div className="message-container-mobile">
                    <div className="conversation-mobile" id="conversation-desktop">
                    {messages && 
                        <MessageList
                        messages={messages.map(message => ({
                            ...message,
                        }))}
                        />
                    } 
                    </div>
                    <form 
                        className="send-input-mobile"
                        onSubmit={event => this.onCreateMessage(event, authUser)}
                    >
                        <input 
                            type="text" 
                            placeholder="Type a message...."
                            className="message-input-mobile"
                            id="message-input-mobile"
                            onChange={this.onChangeText}
                            value={text}
                        ></input>
                        <div className="button-group-mobile">
                            <button type="button" className="input-area-mobile"><i className="fas fa-icons"></i></button>
                            <input 
                                className="send-button-mobile"
                                type="submit"
                                value="Send"
                            />
                        </div>
                    </form>
                </div>
                )
            }
            </AuthUserContext.Consumer>

        )
    }

}



const MessageList = ({messages}) => (
    <ul>
        {messages.map((message,index)=> (
            <li key={index}>
                <span>
                    <strong>{message.username}
                    </strong>{' : '}
                    {message.text}
                </span>
            </li>
        ))}
    </ul>
)

 export default withAuthentication(withFirebase(MessageChat));

