import React, { Component } from 'react';
import { Grid, RaisedButton } from 'material-ui';
import serverRoute from '../../../config/route.js';

import Input from '../input/input.jsx';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.signUp = this.signUp.bind(this); 
  }

  signUp(event) {
    // event.preventDefault();

    // console.log($('form input'));

    // const data = formData($('form input'));

    // console.log(data);

    // if (data.password === data.confirmPassword) {
    //   $.ajax({
    //     url: `${serverRoute}/sign/up`,
    //     method: 'POST',
    //     data
    //   });
    // } else {
    //   alert('pass not confirm');
    // }
  }

  render() {
    return (
      <Grid container justify="center" className="sign-up-container">
        <form onSubmit={this.signUp}>
          <Input label="First Name" type='text' name="firstName" />
          <Input label="Last Name" type='text' name="lastName" />
          <Input label="Email" type='email' name="email" />
          <Input label="Password" type='password' name="password" />
          <Input label="Confirm Password" type='password' name='confirmPassword' />
          <RaisedButton className="sign-up-btn" type="submit" color="primary" raised>Sign Up</RaisedButton>
        </form>
      </Grid>
    );
  }
}
