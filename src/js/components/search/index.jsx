import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

import Input from '../input/input';

export default class Search extends Component {
  render() {
    return(
      <Grid container
        alignItems={"center"}
        justify={"center"}
        className="search-container">
        <Grid item xs={12}>
          <Input />
        </Grid>
      </Grid>
    );
  }
}