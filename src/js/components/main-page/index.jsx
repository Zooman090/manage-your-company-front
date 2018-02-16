import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { connect } from 'react-redux';

import Search from '../search';
import CompaniesList from '../company/list';

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
    </Grid> : null;
  }

  render() {
    return (
      <div className="page-container">
        <Grid className="container-for-search"
          container
          justify={'center'}>
          {this.pageContent}
        </Grid>
      </div>
    );
  }
}

const mapState = ({ user }) => ({
  user
});

export default connect(mapState)(Main);
