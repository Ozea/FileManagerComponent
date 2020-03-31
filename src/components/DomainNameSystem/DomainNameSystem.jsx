import React, { Component } from 'react';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DomainNameSystem.scss';

class DomainNameSystem extends Component {
  render() {
    const { data } = this.props;

    return (
      <ListItem checked={false} toggled={false} date={data.DATE}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME} <span className="dns-records">/ {data.RECORDS}</span></div>
          <br />
          <div className="stats">
            <Container className="c-1 w-35">
              <div className="ip">{data.IP}</div>
              <div className="soa"><span className="stat">{data.SOA}</span></div>
            </Container>
            <Container className="c-2 w-30">
              <div>TTL: <span className="stat">{data.TTL}</span></div>
              <div>Serial: <span className="stat">{data.SERIAL}</span></div>
            </Container>
            <Container className="c-3 w-35">
              <div>Template: <span className="stat">{data.TPL}</span></div>
              <div>Expire: <span className="stat">{data.EXP}</span></div>
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

export default DomainNameSystem;