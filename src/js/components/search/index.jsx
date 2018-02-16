import React, { Component } from 'react';
import { Grid, TextField } from 'material-ui';
import { connect } from 'react-redux';

import { saveCompanySearchParametrs } from '../../actions/search';

import Selector from '../selector';
import Input from '../input/input';

class Search extends Component {
  constructor(props) {
    super(props);

    const { selectedType } = props;

    this.state = {
      selectedType,
      keyword: ''
    };

    this.selectFilterType = this.selectFilterType.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
  }

  selectFilterType(event) {
    const selectedType = event.target.value,
      { keyword } = this.state;

    this.setState({ selectedType });

    this.props.filterComapnies(keyword.toLocaleLowerCase(), selectedType);
  }

  changeKeyword(event) {
    const keyword = event.target.value.toLocaleLowerCase(),
      { selectedType } = this.state;

    this.setState({ keyword });

    this.props.filterComapnies(keyword, selectedType);
  }

  render() {
    const { selectedType, keyword } = this.state,
      { searchTypes } = this.props;

    return (
      <Grid container
        wrap={'nowrap'}
        alignItems={'center'}
        className="search-container">
        <Grid item xs={8}>
          <TextField label="search" type='text' name="search"
            className="width-100-percent"
            value={keyword}
            onChange={this.changeKeyword} />
        </Grid>
        <Grid item xs={4}>
          <Selector item label='search by' id='company-select'
            className='width-100-percent'
            value={selectedType}
            onChange={this.selectFilterType}
            items={searchTypes} />
        </Grid>
      </Grid>
    );
  }
};

const mapState = () => ({}),
  mapDispatch = dispatch => ({
    filterComapnies: (keyworld, type) => {
      dispatch(saveCompanySearchParametrs(keyworld, type));
    }
  });

export default connect(mapState, mapDispatch)(Search);
