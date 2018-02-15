import React, { Component } from 'react';
import { Grid } from 'material-ui';

import GlobalMenu from '../main-menu';
import Authorization from './authorization';

export default class Header extends Component {
  render() {
    return (
      <Grid
        container
        justify="space-between"
        className="header-container">
        <p className="header-text">MYCs</p>
        <GlobalMenu />
        <Authorization />
      </Grid>
    );
  }
}
