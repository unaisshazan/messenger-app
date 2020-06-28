import React from 'react';

import '../css/SiSuForm.css';
import Header from '../components/Header';
import { withRouter, Link } from 'react-router-dom';
import { withFirebase } from '../components/Firebase';
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}
class SignInFormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const { email, password } = this.state;
	event.preventDefault();

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
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
            email,
            password,
            error,
        } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <span className="form-name">Sign In</span>

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
                >SIGN IN</button>
		
                <div className="account">
                    <Link to='/sign-up'><p>Create a new account</p></Link>
                </div>
        </form>
	)
    }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

const SignIn = () => (
    <div className="page-container">
        <Header/>
        <div className="form-container">
            <SignInForm/>
        </div>
    </div>
)
export default SignIn;
