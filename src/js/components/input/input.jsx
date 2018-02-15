import React, { Component } from 'react';
import ErrorMessage from './input-error';

export default class Input extends Component {
  render() {
    const { id, label, type, name, value, onChange } = this.props;

    return (
      <div className="input-container">
        <div className="label-container">
          <label className="custom-label" htmlFor={ id }>{ label }</label>
        </div>
        <input type={ type } id={ id } name={ name } value={ value }
          onChange={onChange}
          className="custom-input"/>
        <ErrorMessage />
      </div>
    );
  }
}
