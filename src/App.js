import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Agenda from './components/Agendas';

const Main = () => (
  <h1>wwwwwaaaaasssssup</h1>
)

const Register = () => (
  <h1>Register</h1>
)

const Login = () => (
  <div className="container">
    <div className="col">
      <TextField
        hintText="Email"
      /><br />
      <br />
      <TextField className="password"
        hintText="Password"
      /><br />
      <RaisedButton className="loginButton" label="Login" primary={true} style="margin:30 0" />
    </div>
  </div>
)

const Root = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/agendas">View Agendas</Link></li>
          <li><Link to="/login">Track Items</Link></li>
        </ul>

        <hr/>

        <Route exact path="/" component={Main}/>
        <Route path="/agendas" component={Agenda}/>
        <Route path="/login" component={Login}/>
      </div>
    </Router>
  </MuiThemeProvider>
)

export default Root;
