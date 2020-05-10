import React, { Component } from 'react';
import './DropdownFilter.scss';
const { sort } = window.GLOBAL.App.toolbar;

class DropdownFilter extends Component {
  state = {
    usersList: [sort.Date, sort.Username, sort.Disk, sort.Bandwidth, sort.Starred],
    webList: [sort.Date, sort.Domain, sort.IP_Address, sort.Disk, sort.Bandwidth, sort.Starred],
    dnsList: [sort.Date, sort.Expire, sort.Domain, sort.IP_Address, sort.Records, sort.Starred],
    mailList: [sort.Date, sort.Domain, sort.Accounts, sort.Disk, sort.Starred],
    dbList: [sort.Date, sort.Database, sort.Disk, sort.User, sort.Host, sort.Starred],
    cronList: [sort.Date, sort.Command, sort.Starred],
    packagesList: [sort.Date, sort.Package_Name, sort.Starred],
    internetProtocolsList: [sort.Date, sort.IP, sort.Netmask, sort.Interface, sort.Domain, sort.Owner, sort.Starred],
    firewallList: [sort.Action, sort.Protocol, sort.Port, sort.IP_Address, sort.Comment, sort.Starred],
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
          {sort.sort_by}: <b>{this.props.sorting}</b>
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