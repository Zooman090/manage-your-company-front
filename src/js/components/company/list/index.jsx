import React, { Component } from 'react';
import { Grid, Button } from 'material-ui';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { refreshCompanyList } from '../../../actions/company';
import { showCurrentStaff } from '../../../actions/staff';

import serverRoute from '../../../../config/route';

import Company from './company';

class CompanyList extends Component {
  componentDidMount() {
    fetch(`${serverRoute}/company/get`)
      .then(response => {
        response.json()
          .then(companies => {
            this.props.refreshCompany(companies);
          });
      });
  }

  list() {
    const { companyList } = this.props;

    return companyList.map((company, index) => <Company {...company} index={index} />);
  }

  render() {
    return (
      <Grid container className="company-list-container">
        { this.list() }
      </Grid>
    );
  }
}

const mapState = state => ({
    companyList: state.companyList,
    staffList: state.staffList
  }),
  mapDispatch = dispatch => ({
    refreshCompany: (companyList) => {
      dispatch(refreshCompanyList(companyList));
    },
    saveStaff: staff => {
      dispatch(showCurrentStaff(staff));
    }
  });

export default connect(mapState, mapDispatch)(CompanyList);
