import React, { Component } from 'react';
import { Button, Grid } from 'material-ui';
import { connect } from 'react-redux';

import serverRoute, { siteUrl } from '../../../config/route.js';
import { securityFetch } from '../helper/request';

import Input from '../input/input.jsx';

import { userAuthorization } from '../../actions/user.js';

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
      url = `${serverRoute}/sign/in`,
      encodeCredentials = window.btoa(`${email}:${password}`),
      options = {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${encodeCredentials}`,
          'Access-Control-Allow-Origin': siteUrl
        }
      };

    securityFetch(url, options)
      .then(response => {
        response.json()
          .then(({ role = 'guest' }) => {
            const userParameters = { role, isSign: true },
              { history } = this.props;

            localStorage.setItem('myc', JSON.stringify(userParameters));

            history.push('/');

            this.props.saveUserParameters(userParameters);
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
        <form onSubmit={this.signIn}>
          <Input label="Email" type='email' name='email'
            value={email}
            onChange={this.typeEmail} />
          <Input label="Password" type='password' name='password'
            value={password}
            onChange={this.typePassword} />
          <Button className="sign-in-btn" type='submit' color='primary' raised="true">
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
    }
  });

export default connect(mapState, mapDispatch)(SignIn);
