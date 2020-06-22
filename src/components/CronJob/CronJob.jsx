import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import './CronJob.scss';

class CronJob extends Component {
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
        <Container className="cron-jobs-list r-col w-85">
          <div className="name">{data.CMD}</div>
          <div className="stats">
            <Container className="cron-col">
              <div>{inc.Min} <span>{data.MIN}</span></div>
            </Container>
            <Container className="cron-col">
              <div>{inc.Hour} <span>{data.HOUR}</span></div>
            </Container>
            <Container className="cron-col">
              <div>{inc.Day} <span>{data.DAY}</span></div>
            </Container>
            <Container className="cron-col">
              <div>{inc.Month} <span>{data.MONTH}</span></div>
            </Container>
            <Container className="cron-col">
              <div>{inc['Day of week']} <span>{data.WDAY}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div><a className="link-edit" href={`/edit/cron/?job=${data.JOB}`}>{inc.edit} <FontAwesomeIcon icon="pen" /></a></div>
          <div><a className="link-delete" href={`#`}>{inc.delete} <FontAwesomeIcon icon="times" /></a></div>
        </div>
      </ListItem>
    );
  }
}

export default CronJob;