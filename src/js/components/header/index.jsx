import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';

import GlobalMenu from '../main-menu';
import Authorization from './authorization';

export default class Header extends Component {
  render() {
    return (
      <Grid
        container
        justify="space-between"
        className="header-container">
        <Link className="decoration-none" to='/'><p className="header-text">MYCs</p></Link>
        <GlobalMenu />
        <Authorization />
      </Grid>
    );
  }
}
