import React, { Component } from 'react';
import { Grid } from 'material-ui';

import Search from '../search';
import CompanyList from '../company/list';

export default class Main extends Component {
  render() {
    return (
      <div className="page-container">
        <Grid className="container-for-search"
          container>
          <Grid container item
            className="menu-block"
            xs={2}>
            {/* for menu */}
          </Grid>
          <Grid container item
            className="search-block"
            xs={8}>
            <Search />
            <CompanyList />
          </Grid>
        </Grid>
      </div>
    );
  }
}