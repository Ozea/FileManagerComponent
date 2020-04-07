import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import './CronJob.scss';

class CronJob extends Component {
  render() {
    const { data, toggled } = this.props;

    return (
      <ListItem checked={false} toggled={toggled} date={data.DATE}>
        <Container className="cron-jobs-list r-col w-85">
          <div className="name">{data.CMD}</div>
          <div className="stats">
            <Container className="cron-col w-20">
              <div>Min <span>{data.MIN}</span></div>
            </Container>
            <Container className="cron-col w-20">
              <div>Hour <span>{data.HOUR}</span></div>
            </Container>
            <Container className="cron-col w-20">
              <div>Day <span>{data.DAY}</span></div>
            </Container>
            <Container className="cron-col w-20">
              <div>Month <span>{data.MONTH}</span></div>
            </Container>
            <Container className="cron-col w-20">
              <div>Day of week <span>{data.WDAY}</span></div>
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

export default CronJob;