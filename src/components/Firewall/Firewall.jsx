import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from '../ControlPanel/Container/Container';
import ListItem from '../ControlPanel/ListItem/ListItem';
import './Firewall.scss';

class Firewall extends Component {
  render() {
    const { data, toggled } = this.props;

    return (
      <ListItem checked={false} toggled={toggled} date={data.DATE}>
        <Container className="cron-jobs-list r-col w-85">
          <div className="stats">
            <Container className="cron-col w-20">
              <div><span className="stat">{data.ACTION}</span></div>
            </Container>
            <Container className="cron-col w-30">
              <div><span><span className="stat">{data.PROTOCOL}</span> / {data.COMMENT}</span></div>
            </Container>
            <Container className="cron-col w-10">
              <div></div>
            </Container>
            <Container className="cron-col w-20">
              <div><span className="stat">{data.PORT}</span></div>
            </Container>
            <Container className="cron-col w-20">
              <div><span className="stat">{data.IP}</span></div>
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

export default Firewall;