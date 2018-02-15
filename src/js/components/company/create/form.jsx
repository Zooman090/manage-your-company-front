import React, { Component } from 'react';
import { Button, Grid } from 'material-ui';

import serverRoute from '../../../../config/route';
import { jsonFetch } from '../../helper/request';

import Input from '../../input/input';

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
        <form onSubmit={this.onSubmit}>
          <Input label='Name' name='name' value={name} onChange={event => this.setState({ name: event.target.value }) } />
          <Input label='Type' name='type' value={type} onChange={event => this.setState({ type: event.target.value }) } />
          <Input label='Address' name='address' value={address} onChange={event => this.setState({ address: event.target.value }) } />
          <Button type='submit' className="create-btn" raised='true' color='primary'>Create</Button>
        </form>
      </Grid>
    );
  }
}