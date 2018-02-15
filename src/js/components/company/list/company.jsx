import React, { Component } from 'react';
import { Grid, Button } from 'material-ui';
import { Link } from 'react-router-dom';

import { refreshCompanyList } from '../../../actions/company';
import { showCurrentStaff } from '../../../actions/staff';
import serverRoute from '../../../../config/route';
import StaffList from './staff-list.jsx';

class Company extends Component {
  showStaff(id) {
    const url = `${serverRoute}/staff/get/${id}`,
      options = {
        credentials: 'include'
      };

    fetch(url, options)
      .then(response => {
        response.json()
          .then(({ staffList = [] }) => this.setState({ staffList }));
      });
  }

  staffList(index) {
    const { staffList } = this.state;

    return <Grid container className="staff-list">
      <StaffList staffs={ staffList } companyId={ index }/>
    </Grid>;
  }

  render() {
    const { companyList } = this.props;

    return companyList.map(({ company_id: id, name, type, address }, index) => (
      <Grid container className="company-info" key={`${id}-company`}
        direction={'column'}>
        <p>{ name }</p>
        <p>{ type }</p>
        <p>{ address }</p>
        <Grid container justify={'center'}>
          <Button className="staff-button"
            target="_blank"
            onClick={this.showStaff.bind(this, id)}
          >staff</Button>
        </Grid>
        { this.staffList(index) }
      </Grid>
    ));
  }
}

export default Company;
