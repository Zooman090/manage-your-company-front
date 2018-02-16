import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { refreshCompaniesList } from '../../../actions/company';
import { showCurrentStaff } from '../../../actions/staff';

import serverRoute from '../../../../config/route';

import Company from './company';

class CompaniesList extends Component {
  componentDidMount() {
    const options = {
      credentials: 'include'
    };

    fetch(`${serverRoute}/company/get`, options)
      .then(response => {
        response.json()
          .then(companies => {
            this.props.refreshCompany(companies);
          });
      });
  }

  list() {
    const { companiesList } = this.props;

    return companiesList.map((company, index) => <Company key={`${index}-company`} {...company} />);
  }

  render() {
    return (
      <Grid container className="company-list-container">
        { this.list() }
      </Grid>
    );
  }
}

const companiesList = ({ companiesList }) => companiesList,
  searchParameters = ({ search }) => search,
  filteredCompanies = createSelector(
    [companiesList, searchParameters],
    (companies, { keyword, filterBy }) => companies.filter(company => company[filterBy].toLocaleLowerCase().includes(keyword))
  );

const mapState = state => ({
    companiesList: filteredCompanies(state)
  }),
  mapDispatch = dispatch => ({
    refreshCompany: (companiesList) => {
      dispatch(refreshCompaniesList(companiesList));
    },
    saveStaff: staff => {
      dispatch(showCurrentStaff(staff));
    }
  });

export default connect(mapState, mapDispatch)(CompaniesList);
