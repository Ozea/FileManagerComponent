import React, { Component } from 'react';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Mail.scss';

class Mail extends Component {
  printStat = (stat, text) => {
    if (text === 'no') {
      return <div className="crossed">{stat}</div>;
    }

    return <div>{stat}: <span className="stat">{text}</span></div>;
  }

  toggleFav = (starred) => {
    if (starred) {
      this.props.toggleFav(this.props.data.NAME, 'add');
    } else {
      this.props.toggleFav(this.props.data.NAME, 'delete');
    }
  }

  checkItem = () => {
    this.props.checkItem(this.props.data.NAME);
  }

  render() {
    const { data } = this.props;
    const { inc } = window.GLOBAL.App;

    return (
      <ListItem checked={data.isChecked} date={data.DATE} starred={data.STARRED} toggleFav={this.toggleFav} checkItem={this.checkItem}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <div className="stats">
            <Container className="c-1">
              <div className="bandwidth">{inc.Disk} <span><span className="stat">{data.U_DISK}</span> mb</span></div>
            </Container>
            <Container className="c-2">
              {this.printStat(inc['AntiVirus Support'], data.ANTIVIRUS)}
              {this.printStat(inc['DKIM Support'], data.DKIM)}
            </Container>
            <Container className="c-3">
              {this.printStat(inc['AntiSpam Support'], data.ANTISPAM)}
              <div>{inc['Catchall email']}: <span className="stat">{data.CATCHALL}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div><a href={`/list/mail/?domain=${data.NAME}`}>{data.list_accounts_button} <FontAwesomeIcon icon="list" /></a></div>
          <div><a href={`/add/mail/?domain=${data.NAME}`}>{inc['add account']} <FontAwesomeIcon icon="plus" /></a></div>
          <div><a href={`/edit/mail/?domain=${data.NAME}`}>{inc.edit} <FontAwesomeIcon icon="pen" /></a></div>
          <div><a href={`#`}>{inc.suspend} <FontAwesomeIcon icon="lock" /></a></div>
          <div><a href={`#`}>{inc.delete} <FontAwesomeIcon icon="times" /></a></div>
        </div>
      </ListItem>
    );
  }
}

export default Mail;