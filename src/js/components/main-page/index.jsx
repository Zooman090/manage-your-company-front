import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

import Header from '../header';
import Search from '../search';
import CompanyList from '../company-list';

export default class Main extends Component {
  render() {
    return(
      <div className="page-container">
        <Header />
        <Grid className="container-for-search"
          container>
          <Search />
          <CompanyList />
        </Grid>
      </div>
    );
  }
}