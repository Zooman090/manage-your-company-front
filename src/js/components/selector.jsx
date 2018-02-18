import React, { Component } from 'react';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui';
import Select from 'material-ui/Select';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
  id: PropTypes.number,
  value: PropTypes.array,
  onChange: PropTypes.func,
  className: PropTypes.string
};

class Selector extends Component {
  get items() {
    const { items } = this.props;

    return items.map(({ title, value }, index) => <MenuItem key={`${index}-selector-item`} value={value}>{title}</MenuItem>);
  }

  render() {
    const { label, id, value, onChange, className = '' } = this.props;

    return <FormControl className={className}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        inputProps={{
          name: label,
          id
        }}
      >
        {this.items}
      </Select>
    </FormControl>;
  }
}

export default Selector;
