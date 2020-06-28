import React from 'react';
import '../css/SiSuForm.css';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../components/Firebase';
import GoogleImage from '../static/google.svg';

class SignWithGoogleBase extends React.Component {
    constructor(props) {
        super(props);

        this.sate = {error: null};
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit = async (event) => {
        try {
            await this.props.firebase 
                .doSignInWithGoogle()
                .then(() => {
                    this.setState({ error: null});
                    this.props.history.push('/message-chat')
                })
        } catch (error) {
            this.setState({error})
        }
    }

    render() {
        return (
            <form className="account" onSubmit={this.onSubmit}>
                    <button className="google-account" type="submit">
                        <p>Sign up with Google Account</p>
                        <img src={GoogleImage} className="google-image" alt="Google Icon"></img>
                    </button>
            </form>
        )
    }
}

const SignWithGoogle = withRouter(withFirebase(SignWithGoogleBase))

export default SignWithGoogle;
