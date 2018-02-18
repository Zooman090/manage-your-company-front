import React, { Component } from 'react';
import { Button, Grid, TextField } from 'material-ui';
import { connect } from 'react-redux';

import { serverUrl, siteUrl } from '../../../config/route.js';
import { securityFetch, checkingStatus } from '../helper/request';

import { userAuthorization } from '../../actions/user.js';
import { showErrorDialog } from '../../actions/dialog';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.signIn = this.signIn.bind(this);
    this.typeEmail = this.typeEmail.bind(this);
    this.typePassword = this.typePassword.bind(this);
  }

  signIn(event) {
    event.preventDefault();

    const { email, password } = this.state,
      url = `${serverUrl}/sign/in`,
      encodeCredentials = window.btoa(`${email}:${password}`),
      options = {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${encodeCredentials}`,
          'Access-Control-Allow-Origin': siteUrl
        }
      };

    securityFetch(url, options)
      .then(checkingStatus)
      .then(({ role = 'guest' }) => {
        const userParameters = { role, isSign: true },
          { history, saveUserParameters } = this.props;

        localStorage.setItem('myc', JSON.stringify(userParameters));

        history.push('/');

        saveUserParameters(userParameters);
      })
      .catch(error => {
        const headerTitle = 'Sign In Error',
          { showErrorDialog } = this.props;

        error
          .then(({ errorMessage }) => {
            showErrorDialog({ errorMessage, headerTitle });
          });
      });
  }

  typeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  typePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <Grid container className="sign-in-container">
        <form className="sign-in-form layout-column" onSubmit={this.signIn}>
          <TextField label="Email" type='email' name='email'
            value={email}
            onChange={this.typeEmail} />
          <TextField label="Password" type='password' name='password'
            value={password}
            onChange={this.typePassword} />
          <Button className="sign-in-btn mt-20" type='submit' color='primary' raised="true">
            Sign In
          </Button>
        </form>
      </Grid>
    );
  }
}

const mapState = () => ({}),
  mapDispatch = dispatch => ({
    saveUserParameters: userParameters => {
      dispatch(userAuthorization(userParameters));
    },
    showErrorDialog: dialogParameters => {
      console.log('check');
      dispatch(showErrorDialog(dialogParameters));
    }
  });

export default connect(mapState, mapDispatch)(SignIn);
