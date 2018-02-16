import React, { Component } from 'react';
import { Grid, Button } from 'material-ui';

import serverRoute from '../../../../config/route';
import StaffList from './staff-list.jsx';

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffList: [],
      showStaffList: false
    };

    this.showStaff = this.showStaff.bind(this);
  }

  showStaff() {
    const { company_id: id } = this.props,
      url = `${serverRoute}/staff/get/${id}`,
      options = {
        credentials: 'include'
      };

    fetch(url, options)
      .then(response => {
        response.json()
          .then(({ staffs = [] }) => this.setState({ staffList: staffs, showStaffList: true }));
      });
  }

  get staffList() {
    const { staffList, showStaffList } = this.state;

    return showStaffList ? <Grid container className="staff-list">
      <StaffList staffs={ staffList }/>
    </Grid> : null;
  }

  get staffShowButton() {
    const { showStaffList } = this.state;

    return !showStaffList ? <Grid container justify={'center'}>
      <Button className="staff-button mt-20"
        target="_blank"
        onClick={this.showStaff}
      >staff</Button>
    </Grid> : null;
  }

  get staffHideButton() {
    const { showStaffList } = this.state;

    return showStaffList ? <Grid container justify={'center'}>
      <Button className="staff-button mt-20"
        target="_blank"
        onClick={() => this.setState({ showStaffList: false })}
      >hide staff</Button>
    </Grid> : null;
  }

  render() {
    const { name, type, address } = this.props,
      { showStaffList } = this.state,
      customClass = `company-info ${showStaffList ? 'full-height' : 'minimal-height'}`;

    return <Grid container className={customClass}
      direction={'column'}>
      <div className="company-detail-container">
        <p className="company-detail-container__text">{ name }</p>
        <p className="company-detail-container__text">Type: <span className="company-detail-container__point">{ type }</span></p>
        <p className="company-detail-container__text">Address: <span className="company-detail-container__point">{ address }</span></p>
      </div>
      <div className="staff-container">
        { this.staffList }
      </div>
      { this.staffShowButton }
      { this.staffHideButton }
    </Grid>;
  }
}

export default Company;
