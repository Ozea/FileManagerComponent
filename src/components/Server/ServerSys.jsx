import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from '../ControlPanel/Container/Container';
import ListItem from '../ControlPanel/ListItem/ListItem';
import './ServerSys.scss';

class Server extends Component {
  printTime = seconds => {
    let hours = seconds / 60;
    let days = Math.floor(hours / 24);
    return days;
  }

  render() {
    const { data, toggled } = this.props;

    return (
      <ListItem checked={false} toggled={toggled} date={false}>
        <Container className="r-col w-85">
          <div className="server-name">{data.HOSTNAME}</div>
          <div className="stats">
            <Container className="c-1 w-40">
              <div className="descr"><span><span className="stat">{data.OS} {data.VERSION}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {`(${data.ARCH})`}</span></div>
            </Container>
            <Container className="c-2 w-30">
              <div>Load Average: <span><span className="stat">{data.LOADAVERAGE}</span></span></div>
            </Container>
            <Container className="c-3 w-30">
              <div><span>Uptime: <span className="stat">{this.printTime(data.UPTIME)} days</span></span></div>
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