import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { refreshCompaniesList } from '../../../actions/company';
import { showErrorDialog } from '../../../actions/dialog';
import { filteredCompanies } from '../../../selectors/search';

import { serverUrl } from '../../../../constants/route';
import { checkingStatus } from '../../helper/request';

import Company from './company';

const propTypes = {
  companiesList: PropTypes.array
};

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
      <Grid container className="layout-column company-list-container" spacing={0}>
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

CompaniesList.propTypes = propTypes;

export default connect(mapState, mapDispatch)(CompaniesList);
