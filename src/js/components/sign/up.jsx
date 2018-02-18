import React, { Component } from 'react';
import { Grid, Button, TextField } from 'material-ui';
import { connect } from 'react-redux';

import { userAuthorization } from '../../actions/user.js';
import { showErrorDialog } from '../../actions/dialog';

import { serverUrl } from '../../../config/route.js';
import { jsonFetch, checkingStatus } from '../helper/request';

const MIN_PASS_LENGTH = 8,
  MAX_PASS_LENGTH = 32;

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmPasswordIsRight: false,
      passwordIsRight: false,
      selectedType: 'boss',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      password: '',
      email: ''
    };

    this.signUp = this.signUp.bind(this); 
  }

  signUp(event) {
    event.preventDefault();

    const { firstName, lastName, password, email, confirmPassword, selectedType: role } = this.state,
      body = { firstName, lastName, password, email, role },
      url = `${serverUrl}/sign/up`,
      passwordLength = password.length,
      lengthIsRight = passwordLength >= MIN_PASS_LENGTH && passwordLength <= MAX_PASS_LENGTH,
      passIsRight = lengthIsRight && confirmPassword === password;

    if (passIsRight) {
      jsonFetch(url, body)
        .then(checkingStatus)
        .then(() => { 
          const { history, saveUserParameters } = this.props,
            userParameters = { isSign: true, role };

          saveUserParameters(userParameters);
          localStorage.setItem('myc', JSON.stringify(userParameters));
          history.push('/');
        })
        .catch(error => {
          const headerTitle = 'Sign Up Error',
            { showErrorDialog } = this.props;

          error
            .then(({ errorMessage }) => {
              showErrorDialog({ errorMessage, headerTitle });
              history.push('/');
            });
        });
    } else if (lengthIsRight) {
      this.setState({
        passwordIsRight: false,
        confirmPasswordIsRight: true
      });
    } else {
      this.setState({
        passwordIsRight: true,
        confirmPasswordIsRight: false
      });
    }
  }

  render() {
    const { firstName, lastName, email, password, confirmPassword, selectedType, confirmPasswordIsRight, passwordIsRight } = this.state;

    return (
      <Grid container justify="center" className="sign-up-container">
        <form className="layout-column mt-20 sign-up-form" onSubmit={this.signUp}>
          <TextField label="First Name" type='text' name="firstName"
            className="mt-20"
            required={true}
            value={firstName}
            onChange={event => this.setState({ firstName: event.target.value })} />
          <TextField label="Last Name" type='text' name="lastName"
            className="mt-20"
            required={true}
            value={lastName}
            onChange={event => this.setState({ lastName: event.target.value })} />
          <TextField label="Email" type='email' name="email"
            className="mt-20"
            required={true}
            value={email}
            onChange={event => this.setState({ email: event.target.value })} />
          <TextField label="Password" type='password' name="password"
            className="mt-20"
            error={passwordIsRight}
            required={true}
            value={password}
            onChange={event => this.setState({ password: event.target.value })} />
          <TextField label="Confirm Password" type='password' name='confirmPassword'
            className="mt-20"
            error={confirmPasswordIsRight}
            required={true}
            value={confirmPassword}
            onChange={event => this.setState({ confirmPassword: event.target.value })} />
          <TextField label="Role" type='text' name='role'
            className="mt-20"
            value={selectedType} />

          <Button className="sign-up-btn mt-20" type="submit" color="primary" raised={'true'}>Sign Up</Button>
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
      dispatch(showErrorDialog(dialogParameters));
    }
  });

export default connect(mapState, mapDispatch)(SignUp);
