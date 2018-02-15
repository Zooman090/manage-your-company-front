import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { connect } from 'react-redux';

import CreateForm from './form.jsx';

class CreateCompany extends Component {
  componentWillMount() {
    const { user, history } = this.props,
      { role } = user;

    if (role === 'guest') {
      history.push('/');
    }
  }

  render() {
    return (
      <Grid container
        justify={'center'}>
        <CreateForm />
      </Grid>
    );
  }
}

const mapState = state => ({ user: state.user });

export default connect(mapState)(CreateCompany);
