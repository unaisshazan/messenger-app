import React from 'react';

import '../css/SiSuForm.css';
import Header from '../components/Header';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../components/Firebase';

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    error: null,
}
class SignUpFormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const { username, email, password } = this.state;
	    event.preventDefault();

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                    });
            })
            .then(() => {
                this.setState({...INITIAL_STATE})
                this.props.history.push('/message-chat')
            })
            .catch(error => {
                this.setState({error})
            });

        }
    
    onChange = (event) => {
        this.setState({ [event.target.name] : event.target.value });
    }
    render() {
        const {
            username,
            email,
            password,
            error,
        } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <span className="form-name">Sign Up</span>

                <span className="line"></span>

                <label className="form-label">Email</label>
                <input 
                    type="email" 
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    placeholder="Enter your email..."
                    className="input-username"
                    required
                ></input>
                <span className="line-input"></span>

                <label className="form-label">Your name</label>
                <input 
                    type="text" 
                    name="username"
                    value={username}
                    onChange={this.onChange} 
                    placeholder="Enter your name..."
                    className="input-username"
                    required
                ></input>
                <span className="line-input"></span>

                <label className="form-label label-password">Password</label>
                <input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={this.onChange} 
                    placeholder="Choose a new password..."
                    className="input-password"
                    required
                ></input>
                <span className="line-input"></span>

                {error && <p>{error.message}</p>}

                <button
                    type="submit"
                    name="submit"
                    className="button-input"
                >SIGN UP</button>
            </form>
        )
    }
}

const SigUpForm = withRouter(withFirebase(SignUpFormBase));

const SignUp = () => (
    <div className="page-container">
        <Header/>
        <div className="form-container">
            <SigUpForm/>
        </div>
    </div>
)
export default SignUp;
