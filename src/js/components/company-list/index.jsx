import React, { Component } from 'react';

export default class CompanyList extends Component {
  list() {
    const list = [{
      name: 'Company',
      type: 'IT',
      address: 'St. Head',
      id: 0
    }];

    return list.map(company => (
      <div className="company-info" key={company.id}>
        <p>{ company.name }</p>
        <p>{ company.type }</p>
        <p>{ company.address }</p>
      </div>
    ));
  }

  render() {
    return (
      <div className="company-list-container">
        { this.list() }
      </div>
    );
  }
}