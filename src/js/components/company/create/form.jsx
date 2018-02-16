import React, { Component } from 'react';
import { Button, Grid, TextField } from 'material-ui';

import serverRoute from '../../../../config/route';
import { jsonFetch } from '../../helper/request';

export default class CreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      type: '',
      address: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const { name, type, address } = this.state,
      body = {
        name,
        type,
        address
      },
      url = `${serverRoute}/company/create`;

    jsonFetch(url, body);
  }

  render() {
    const { name, type, address } = this.state;

    return (
      <Grid item className="create-container">
        <form className="layout-column mlr-15" onSubmit={this.onSubmit}>
          <TextField label='Name' name='name'
            value={name}
            onChange={event => this.setState({ name: event.target.value }) } />
          <TextField label='Type' name='type'
            className="mt-20"
            value={type}
            onChange={event => this.setState({ type: event.target.value }) } />
          <TextField label='Address' name='address'
            className="mt-20"
            value={address}
            onChange={event => this.setState({ address: event.target.value }) } />

          <Button type='submit' className="create-btn" raised='true' color='primary'>Create</Button>
        </form>
      </Grid>
    );
  }
}
