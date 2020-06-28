import React from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

// Pages 
import SignUp from '../src/pages/SignUp';
import SignIn from '../src/pages/SignIn';
import MessageChat from '../src/pages/MessageChat';

import './css/App.css'

import { withAuthentication, AuthUserContext } from './components/Session';

const SwitchRoute = () => (
          <Switch>
            <Route exact path="/" component={SignIn}></Route>
            <Route path="/sign-in" component={SignIn}></Route>
            <Route path="/sign-up" component={SignUp}></Route>
            <Redirect to="/sign-in" />
          </Switch>
)

const RedirectRoute = () => (
    <Switch>
        <Route path="/message-chat" component={MessageChat} />
        <Redirect to="/message-chat"/>    
    </Switch>
)

class App extends React.Component {
  render() {
    return(
      <div className="page">
        <Router>
            <AuthUserContext.Consumer>
                {authUser => 
                    authUser? <RedirectRoute/> : <SwitchRoute/>
                }
            </AuthUserContext.Consumer>
        </Router>
      </div>
    )
  }
}

export default withAuthentication(App);
