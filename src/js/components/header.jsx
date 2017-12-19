import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

export default class Header extends Component {
  render() {
    return(
      <Grid
        container
        className="header-container"
        >
        <p className="header-text">Staff</p>
      </Grid>
    );
  }
}