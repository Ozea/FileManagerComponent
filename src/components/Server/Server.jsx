import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from '../ControlPanel/Container/Container';
import ListItem from '../ControlPanel/ListItem/ListItem';
import './Server.scss';

class Server extends Component {
  isActive = status => {
    return status !== "running";
  }

  printTime = seconds => {
    let hours = seconds / 60;
    let days = Math.floor(hours / 24);
    return days;
  }

  render() {
    const { data, toggled } = this.props;

    return (
      <ListItem checked={false} toggled={toggled} date={false} stopped={this.isActive(data.STATE)}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <div className="stats">
            <Container className="c-1 w-35">
              <div className="descr"><span className="stat">{data.SYSTEM}</span></div>
            </Container>
            <Container className="c-1 w-15">
              <div className="descr"><span>CPU: <span className="stat">{data.CPU}</span></span></div>
            </Container>
            <Container className="c-2 w-20">
              <div><span>Memory: <span className="stat">{data.MEM} mb</span></span></div>
            </Container>
            <Container className="c-3 w-30">
              <div><span>Uptime: <span className="stat">{this.printTime(data.RTIME)} days</span></span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div>LOGOUT <FontAwesomeIcon icon="user-lock" /></div>
          <div>EDIT <FontAwesomeIcon icon="pen" /></div>
          <div>SUSPEND <FontAwesomeIcon icon="lock" /></div>
          <div>DELETE <FontAwesomeIcon icon="times" /></div>
        </div>
      </ListItem>
    );
  }
}

export default Server;