import React, { Component } from 'react';
import { Grid } from 'material-ui';

import Search from '../search';
import CompaniesList from '../company/list';

export default class Main extends Component {
  render() {
    const searchTypes = [{ title: 'name', value: 'name' }, { title: 'type', value: 'type' }],
      filter = {
        selectedType: 'name',
        searchTypes
      };

    return (
      <div className="page-container">
        <Grid className="container-for-search"
          container
          justify={'center'}>
          <Grid container item
            className="search-block"
            xs={8}>
            <Search {...filter} />
            <CompaniesList />
          </Grid>
        </Grid>
      </div>
    );
  }
}