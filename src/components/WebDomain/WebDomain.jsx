import React, { Component } from 'react';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WebDomain.scss';

class WebDomain extends Component {
  printStat = (stat, text) => {
    if (text === 'no' || text === '') {
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
      <ListItem checked={data.isChecked} starred={data.STARRED} date={data.DATE} toggleFav={this.toggleFav} checkItem={this.checkItem}>
        <Container className="r-col w-85">
          <div className="name">
            <div>{data.NAME}</div>
            <div><span className="dns-name-span">{data.ALIAS}</span></div>
          </div>
          <div>{data.IP}</div>
          <div className="stats">
            <Container className="c-1 w-25">
              <div className="bandwidth">{inc.Bandwidth} <span><span className="stat">{data.U_BANDWIDTH}</span> mb</span></div>
              <div className="disk">{inc.Disk}: <span><span className="stat">{data.U_DISK}</span> mb</span></div>
            </Container>
            <Container className="c-2 w-45">
              <div>{inc['Web Template']}: <span className="stat">{data.TPL}</span></div>
              {this.printStat(inc['SSL Support'], data.SSL)}
              {this.printStat(inc['Web Statistics'], data.STATS)}
            </Container>
            <Container className="c-3 w-35">
              <div>Backend Support: <span className="stat">{data.BACKEND}</span></div>
              <div>{inc['Backend Template']}: <span className="stat">{data.BACKEND}</span></div>
              {this.printStat(inc['Additional FTP'], data.FTP_USER)}
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div><a href={`/edit/web?domain=${data.NAME}`}>{inc.edit} <FontAwesomeIcon icon="pen" /></a></div>
          <div><a href={`/list/web-log?domain=${data.NAME}&type=access`}>{inc['view logs']} <FontAwesomeIcon icon="list" /></a></div>
          <div><a href={`#`}>{inc.suspend} <FontAwesomeIcon icon="lock" /></a></div>
          <div><a href={`#`}>{inc.delete} <FontAwesomeIcon icon="times" /></a></div>
        </div>
      </ListItem>
    );
  }
}

export default WebDomain;