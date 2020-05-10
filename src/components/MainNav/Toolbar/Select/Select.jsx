import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Select.scss';
import { values } from '../../../../ControlPanelService/Select';
const { select } = window.GLOBAL.App.toolbar;
const listValues = values(select);

class Select extends Component {
  state = {
    usersList: listValues.usersList,
    webList: listValues.webList,
    dnsList: listValues.dnsList,
    mailList: listValues.mailList,
    dbList: listValues.dbList,
    cronList: listValues.cronList,
    backupList: listValues.backupList,
    packagesList: listValues.packagesList,
    internetProtocolsList: listValues.internetProtocolsList,
    statisticsList: this.printUserNames,
    updatesList: listValues.updatesList,
    firewallList: listValues.firewallList,
    serverList: listValues.serverList,
    selected: '',
  };

  printUserNames = () => {
    const { users } = window.GLOBAL.App.users;
    const result = [];

    for (let i in users) {
      result.push(i);
    }

    return result;
  }

  defaultValue = () => {
    if (this.props.list === 'statisticsList') {
      return 'show per user';
    }

    return 'apply to selected';
  }

  componentDidMount() {
    const { list } = this.props;

    this.setState({ list });
  }

  renderOptions = () => {
    const { list } = this.props;
    let activeList = this.state[list];

    return activeList.map((item, index) => {
      return <option key={index} value={item.value}>{item.name}</option>
    })
  }

  handleSelect = event => {
    this.setState({ selected: event.target.value });
  }

  bulkAction = () => {
    this.props.bulkAction(this.state.selected);
  }

  render() {
    return (
      <div className="select-wrapper">
        <select className="custom-select" id="inputGroupSelect04" onChange={this.handleSelect}>
          <option defaultValue={this.defaultValue()}>{this.props.list === "statisticsList" ? select.show_per_user : select.apply_to_selected}</option>
          {this.renderOptions()}
        </select>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={this.bulkAction}>
            <FontAwesomeIcon icon="angle-right" />
          </button>
        </div>
      </div>
    );
  }
}

export default Select;