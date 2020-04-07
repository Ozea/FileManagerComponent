import React, { Component } from 'react';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './InternetProtocol.scss';

class InternetProtocol extends Component {
  render() {
    const { data, toggled } = this.props;

    return (
      <ListItem checked={false} toggled={toggled} date={data.DATE}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <br />
          <div className="stats">
            <Container className="c-1 w-35">
              <div className="ip"><span className="stat">{data.NETMASK}</span></div>
              <div className="soa"><span className="stat">{data.INTERFACE}</span></div>
            </Container>
            <Container className="c-2 w-30">
              <div>Domains: <span className="stat">{data.U_WEB_DOMAINS}</span></div>
              <div>Status: <span className="stat">{data.STATUS}</span></div>
            </Container>
            <Container className="c-3 w-35">
              <div>Owner: <span className="stat">{data.OWNER}</span></div>
              <div>Users: <span className="stat">{data.U_SYS_USERS}</span></div>
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

export default InternetProtocol;