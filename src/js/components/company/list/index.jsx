import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { connect } from 'react-redux';

import { refreshCompaniesList } from '../../../actions/company';
import { showErrorDialog } from '../../../actions/dialog';
import { filteredCompanies } from '../../../selectors/search';

import { serverUrl } from '../../../../config/route';
import { checkingStatus } from '../../helper/request';

import Company from './company';

class CompaniesList extends Component {
  componentDidMount() {
    const options = {
        credentials: 'include'
      },
      url = `${serverUrl}/company/get`;

    fetch(url, options)
      .then(checkingStatus)
      .then(companies => {
        this.props.refreshCompany(companies);
      })
      .catch((error) => {
        const headerTitle = 'Error',
          { showErrorDialog } = this.props;

        error
          .then(({ errorMessage }) => {
            showErrorDialog({ errorMessage, headerTitle });
          });
      });
  }

  list() {
    const { companiesList } = this.props;

    return companiesList.map((company, index) => <Company key={`${index}-company`} {...company} />);
  }

  render() {
    return (
      <Grid container className="layout-column company-list-container">
        { this.list() }
      </Grid>
    );
  }
}

const mapState = state => ({
    companiesList: filteredCompanies(state)
  }),
  mapDispatch = dispatch => ({
    refreshCompany: (companiesList) => {
      dispatch(refreshCompaniesList(companiesList));
    },
    showErrorDialog: dialogParameters => {
      dispatch(showErrorDialog(dialogParameters));
    }
  });

export default connect(mapState, mapDispatch)(CompaniesList);
