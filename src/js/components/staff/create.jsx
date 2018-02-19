import React, { Component } from 'react';
import { Button, Grid, TextField } from 'material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { jsonFetch, checkingStatus } from '../helper/request';
import { serverUrl } from '../../../constants/route';

import { showErrorDialog, showSimpleDialog } from '../../actions/dialog';

import Selector from '../selector';

const propTypes = {
  user: PropTypes.object
};

const EMPTY_FORM_STATE = {
  name: '',
  position: '',
  experience: '',
  skills: '',
  selectedCompany: ''
};

class CreateStaff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...EMPTY_FORM_STATE,
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
    const url = `${serverUrl}/company/list`,
      options = {
        credentials: 'include'
      };

    fetch(url, options)
      .then(checkingStatus)
      .then(companiesList => {
        this.setState({ companiesList });
      })
      .catch(error => {
        const headerTitle = 'Sign Out Error',
          { showErrorDialog } = this.props;

        error
          .then(({ errorMessage }) => {
            showErrorDialog({ errorMessage, headerTitle });
          });
      });
  }

  onSubmit(event) {
    event.preventDefault();

    const { name, position, experience, skills, selectedCompany } = this.state,
      body = { name, position, experience, skills, id: selectedCompany },
      url = `${serverUrl}/staff/create`;

    jsonFetch(url, body)
      .then(checkingStatus)
      .then(() => {
        const successfulMessage = 'Created',
          { showSimpleDialog } = this.props;

        showSimpleDialog(successfulMessage);
        this.setState({ ...EMPTY_FORM_STATE });
      })
      .catch(error => {
        const headerTitle = 'Create Error',
          { showErrorDialog } = this.props;

        error
          .then(({ errorMessage }) => {
            showErrorDialog({ errorMessage, headerTitle });
          });
      });
  }

  selectChange(event) {
    this.setState({ selectedCompany: event.target.value });
  }

  render() {
    const { name, position, experience, skills, selectedCompany, companiesList } = this.state;

    return (
      <Grid container justify={'center'} alignItems={'center'} spacing={0}>
        <Grid item className="create-container"
          lg={4} sm={6} xs={12}>
          <form className="layout-column" onSubmit={this.onSubmit}>
            <TextField label='Full Name' name='name'
              required={true}
              className="mlr-15"
              autoComplete="off"
              value={name}
              onChange={event => this.setState({ name: event.target.value })} />
            <TextField label='Position' name='position'
              required={true}
              className="mt-20 mlr-15"
              autoComplete="off"
              value={position}
              onChange={event => this.setState({ position: event.target.value })} />
            <TextField label='Experience' name='experience'
              required={true}
              className="mt-20 mlr-15"
              autoComplete="off"
              value={experience}
              onChange={event => this.setState({ experience: event.target.value })} />
            <TextField label='Skills' name='skills'
              required={true}
              className="mt-20 mlr-15"
              autoComplete="off"
              value={skills}
              onChange={event => this.setState({ skills: event.target.value })} />
            <Selector label='Company' id='company-select'
              required={true}
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

const mapState = state => ({ user: state.user }),
  mapDispatch = dispatch => ({
    showErrorDialog: dialogParameters => {
      dispatch(showErrorDialog(dialogParameters));
    },
    showSimpleDialog: message => {
      dispatch(showSimpleDialog(message));
    }
  });

CreateStaff.propTypes = propTypes;

export default connect(mapState, mapDispatch)(CreateStaff);
