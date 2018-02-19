import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Search from '../search';
import Guest from './guest';
import CompaniesList from '../company/list';

const propTypes = {
  user: PropTypes.object
};

class Main extends Component {
  get pageContent() {
    const { role } = this.props.user,
      searchTypes = [{ title: 'name', value: 'name' }, { title: 'type', value: 'type' }],
      filter = {
        selectedType: 'name',
        searchTypes
      };

    return role !== 'guest' ? <Grid container item
      className="search-block"
      xs={8}>
      <Search {...filter} />
      <CompaniesList />
    </Grid> : <Guest />;
  }

  render() {
    return (
      <div className="page-container">
        <Grid className="container-for-search"
          container
          justify={'center'}
          spacing={0}>
          {this.pageContent}
        </Grid>
      </div>
    );
  }
}

const mapState = ({ user }) => ({
  user
});

Main.propTypes = propTypes;

export default connect(mapState)(Main);
