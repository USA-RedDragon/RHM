import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import axios from "axios";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Logo from "../../components/Logo/Logo.jsx";

import Auth from "../../services/auth.js";

const styles = {
  wrapper: {
    textAlign: "center"
  }
}

class Login extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
      error: ''
		};

		this.imgConfig = {
			width: '200px',
			title: 'React'
		};

    this.login = this.login.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentWillMount() {
    if(Auth.isLoggedIn()){
      window.location = '/dashboard';
    }
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  login(e) {
    e.preventDefault();
    this.setState({error: ''});
    
    axios.post("http://localhost:3001/api/login", {username: this.state.username, password: this.state.password})
    .then(res => {
      Auth.setToken(res.data.token);
      window.location = '/dashboard';
    }).catch(err => {
      this.setState({error: err.response.data.message});
    })
  }

  render() {
    const { classes } = this.props;
    return (
    <div className={classes.wrapper}>
      <Grid container
        alignItems="center"
        justify="center">
        <div>
          <h1><Logo config={this.imgConfig} /></h1>
          <h3>Login</h3>

          {this.state.error &&
            <p color="danger">{this.state.error} </p>
          }

          <form onSubmit={this.login}>
          <TextField
            label="Username"
            id="login-username"
            inputProps={{
              onChange: this.handleUsernameChange
            }} />
            <TextField
              label="Password"
              id="login-password"
              inputProps={{
                type: "password",
                onChange: this.handlePasswordChange
              }}
              />
            <Button type="submit" color="primary">Login</Button>
            </form>
          </div>
        </Grid>
    </div>
    );
  }

}

Login.propTypes = {
  classes: PropTypes.object,
};

export default withRouter(withStyles(styles)(Login));
