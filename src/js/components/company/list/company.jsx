import React, { Component } from 'react';
import { Grid, Button } from 'material-ui';

import serverRoute from '../../../../config/route';
import StaffList from './staff-list.jsx';

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffList: [],
      show: false
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
          .then(({ staffs = [] }) => this.setState({ staffList: staffs, show: true }));
      });
  }

  get staffList() {
    const { staffList, show } = this.state;

    return show ? <Grid container className="staff-list">
      <StaffList staffs={ staffList }/>
    </Grid> : null;
  }

  get staffShowButton() {
    const { show } = this.state;

    return !show ? <Grid container justify={'center'}>
      <Button className="staff-button"
        target="_blank"
        onClick={this.showStaff}
      >staff</Button>
    </Grid> : null;
  }

  get staffHideButton() {
    const { show } = this.state;

    return show ? <Grid container justify={'center'}>
      <Button className="staff-button"
        target="_blank"
        onClick={() => this.setState({ show: false })}
      >hide staff</Button>
    </Grid> : null;
  }

  render() {
    const { name, type, address } = this.props;

    return <Grid container className="company-info"
      direction={'column'}>
      <p>{ name }</p>
      <p>{ type }</p>
      <p>{ address }</p>
      { this.staffShowButton }
      { this.staffList }
      { this.staffHideButton }
    </Grid>;
  }
}

export default Company;
