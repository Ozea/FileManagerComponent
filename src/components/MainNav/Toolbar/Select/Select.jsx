import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Select.scss';

class Select extends Component {
  state = {
    usersList: ['rebuild', 'rebuild web', 'rebuild dns', 'rebuild mail', 'rebuild db', 'rebuild cron', 'rebuild counters', 'suspend', 'unsuspend', 'delete'],
    webList: ['suspend', 'unsuspend', 'delete'],
    dnsList: ['suspend', 'unsuspend', 'delete'],
    mailList: ['suspend', 'unsuspend', 'delete'],
    dbList: ['suspend', 'unsuspend', 'delete'],
    cronList: ['turn on notifications', 'suspend', 'unsuspend', 'delete'],
    backupList: ['delete'],
    packagesList: ['delete'],
    internetProtocolsList: ['reread IP', 'delete'],
    statisticsList: ['admin'],
    updatesList: ['update'],
    firewallList: ['delete'],
    serverList: ['stop', 'start', 'restart'],
  }

  defaultValue = () => {
    if (this.props.list === 'statisticsList') {
      return 'Show per user';
    }

    return 'Apply to selected';
  }

  componentDidMount() {
    const { list } = this.props;

    this.setState({ list });
  }

  renderOptions = () => {
    const { list } = this.props;
    let activeList = this.state[list];

    return activeList.map((item, index) => {
      return <option key={index} value={item}>{item}</option>
    })
  }

  render() {
    return (
      <div className="select-wrapper">
        <select className="custom-select" id="inputGroupSelect04">
          <option defaultValue={this.defaultValue()}>Apply to selected</option>
          {this.renderOptions()}
        </select>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            <FontAwesomeIcon icon="angle-right" />
          </button>
        </div>
      </div>
    );
  }
}

export default Select;