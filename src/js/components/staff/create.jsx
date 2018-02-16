import React, { Component } from 'react';
import { Button, Grid, TextField } from 'material-ui';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { jsonFetch } from '../helper/request';
import serverRoute from '../../../config/route';

import Selector from '../selector';

class CreateStaff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      position: '',
      experience: '',
      skills: '',
      selectedCompany: '',
      companiesList: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }

  componentWillMount() {
    const { user, history } = this.props,
      { role } = user;

    if (role === 'guest') {
      history.push('/');
    }
  }

  componentDidMount() {
    const url = `${serverRoute}/company/list`,
      options = {
        credentials: 'include'
      };

    fetch(url, options)
      .then(response => {
        response.json()
          .then(companiesList => this.setState({ companiesList }));
      });
  }

  onSubmit(event) {
    event.preventDefault();

    const { name, position, experience, skills, selectedCompany } = this.state,
      body = { name, position, experience, skills, id: selectedCompany },
      url = `${serverRoute}/staff/create`;

    jsonFetch(url, body);
  }

  selectChange(event) {
    this.setState({ selectedCompany: event.target.value });
  }

  render() {
    const { name, position, experience, skills, selectedCompany, companiesList } = this.state;

    return (
      <Grid container justify={'center'} alignItems={'center'}>
        <Grid item className="create-container"
          lg={4} sm={6} xs={12}>
          <form className="layout-column" onSubmit={this.onSubmit}>
            <TextField label='Full Name' name='name'
              className="mlr-15"
              value={name}
              onChange={event => this.setState({ name: event.target.value })} />
            <TextField label='Position' name='position'
              className="mt-20 mlr-15"
              value={position}
              onChange={event => this.setState({ position: event.target.value })} />
            <TextField label='Experience' name='experience'
              className="mt-20 mlr-15"
              value={experience}
              onChange={event => this.setState({ experience: event.target.value })} />
            <TextField label='Skills' name='skills'
              className="mt-20 mlr-15"
              value={skills}
              onChange={event => this.setState({ skills: event.target.value })} />
            <Selector label='Company' id='company-select'
              value={selectedCompany}
              onChange={this.selectChange}
              items={companiesList}
              className='mt-20 mlr-15'/>

            <Button type='submit' className="create-btn" raised={'true'} color='primary'>
              Create
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}

const mapState = state => ({ user: state.user });

export default connect(mapState)(withRouter(CreateStaff));
