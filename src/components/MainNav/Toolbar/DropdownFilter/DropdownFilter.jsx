import React, { Component } from 'react';
import './DropdownFilter.scss';

class DropdownFilter extends Component {
  state = {
    usersList: ['DATE', 'USERNAME', 'DISK', 'BANDWIDTH', 'STARRED'],
    webList: ['DATE', 'DOMAIN', 'IP ADDRESS', 'DISK', 'BANDWIDTH', 'STARRED'],
    dnsList: ['DATE', 'EXPIRE', 'DOMAIN', 'IP ADDRESS', 'RECORDS', 'STARRED'],
    mailList: ['DATE', 'DOMAIN', 'ACCOUNTS', 'DISK', 'STARRED'],
    dbList: ['DATE', 'DATABASE', 'DISK', 'USER', 'HOST', 'STARRED'],
    cronList: ['DATE', 'COMMAND', 'STARRED'],
    packagesList: ['DATE', 'PACKAGE NAME', 'STARRED'],
    internetProtocolsList: ['DATE', 'IP', 'NETMASK', 'INTERFACE', 'DOMAINS', 'OWNER', 'STARRED'],
    firewallList: ['ACTION', 'PROTOCOL', 'PORT', 'IP ADDRESS', 'COMMENT', 'STARRED'],
  }

  changeSorting = (type, order) => {
    this.props.changeSorting(type, order);
  }

  filterClassName = (sorting, order) => {
    if (this.props.sorting === sorting && this.props.order === order) {
      return "dropdown-item active";
    }

    return "dropdown-item";
  }

  renderFilters = () => {
    const { list } = this.props;
    let activeListFilter = this.state[list];

    return activeListFilter.map((item, index) => {
      return (
        <li key={index}>
          <span className={this.filterClassName(item, "descending")} onClick={() => this.changeSorting(item, "descending")}>{item}<span className="arrow-down">&#8595;</span></span>
          <span className={this.filterClassName(item, "ascending")} onClick={() => this.changeSorting(item, "ascending")}><span>&#8593;</span></span>
        </li>
      );
    });
  }

  button = () => {
    if (this.props.order === "descending") {
      return <span className="arrow-down">&#8595;</span>;
    } else {
      return <span>&#8593;</span>;
    }
  }

  render() {
    return (
      <div className="btn-group">
        <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sort by: <b>{this.props.sorting}</b>
          {this.button()}
        </button>
        <div className="dropdown-menu">
          <ul className="dropdown-list">
            {this.renderFilters()}
          </ul>
        </div>
      </div >
    );
  }
}

export default DropdownFilter;