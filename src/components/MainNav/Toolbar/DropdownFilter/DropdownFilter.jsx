import React, { Component } from 'react';
import './DropdownFilter.scss';
const { inc } = window.GLOBAL.App;

class DropdownFilter extends Component {
  state = {
    usersList: [inc.Date, inc.Username, inc.Disk, inc.Bandwidth, inc.Starred],
    webList: [inc.Date, inc.Domain, inc['IP Addresses'], inc.Disk, inc.Bandwidth, inc.Starred],
    dnsList: [inc.Date, inc.Expire, inc.Domain, inc['IP Addresses'], inc.Records, inc.Starred],
    mailList: [inc.Date, inc.Domain, inc.Accounts, inc.Disk, inc.Starred],
    dbList: [inc.Date, inc.Database, inc.Disk, inc.User, inc.Host, inc.Starred],
    cronList: [inc.Date, inc.Command, inc.Starred],
    packagesList: [inc.Date, inc['Package Name'], inc.Starred],
    internetProtocolsList: [inc.Date, inc.IP, inc.Netmask, inc.Interface, inc.Domain, inc.Owner, inc.Starred],
    firewallList: [inc.Action, inc.Protocol, inc.Port, inc['IP Addresses'], inc.Comment, inc.Starred],
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
          {inc['sort by']}: <b>{this.props.sorting}</b>
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