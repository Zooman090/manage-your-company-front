import React, { Component } from 'react';
import RaisedButton from 'material-ui/Button';
import FontIcon from 'material-ui/Icon';
import Grid from 'material-ui/Grid';

import { connect } from 'react-redux';

import { refreshCompanyList } from '../../actions/company';

const list = [{
    name: 'Company',
    type: 'IT',
    address: 'Lviv, St. Head',
    staff: [],
    id: 0
  }],
  staff = [{
    name: 'Lilia',
    position: 'Manager',
    experience: 1,
    sills: 'managment'
  }],
  ONE_SECOND = 1000;

class CompanyList extends Component {
  constructor(props) {
    super(props);

    this.getCompanyStaff = this.getCompanyStaff.bind(this);
  }
  componentWillMount() {
    // must be $.ajax({});
    setTimeout(() => {
      this.props.refreshCompany(list);
    }, ONE_SECOND);
  }

  getCompanyStaff(id) {
    // must be $.ajax({});
    console.log('Empty');
  }

  list() {
    const { companyList } = this.props;

    return companyList.map(company => (
      <Grid container className="company-info" key={company.id}
        direction={'column'}>
        <p>{ company.name }</p>
        <p>{ company.type }</p>
        <p>{ company.address }</p>
        <Grid container justify={'center'}>
          <RaisedButton className="staff-button"
            target="_blank"
            onClick={this.getCompanyStaff}
          >staff</RaisedButton>
        </Grid>
        <Grid container>
        </Grid>
      </Grid>
    ));
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
    companyList: state.companyList
  }),
  mapDispatch = dispatch => ({
    refreshCompany: (companyList) => {
      dispatch(refreshCompanyList(companyList));
    }
  });

export default connect(mapState, mapDispatch)(CompanyList);
