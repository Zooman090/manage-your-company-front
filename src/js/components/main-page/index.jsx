import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

import Header from '../header';
import Search from '../search';
import CompanyList from '../company-list';
import Menu from '../main-menu';

export default class Main extends Component {
  render() {
    return (
      <div className="page-container">
        <Header />
        <Grid className="container-for-search"
          container>
          <Grid container item
            className="menu-block"
            xs={2}>
            <Menu />
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