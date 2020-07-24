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
    const { i18n } = window.GLOBAL.App;
    const token = localStorage.getItem("token");

    return (
      <ListItem checked={data.isChecked} date={data.DATE} starred={data.STARRED} toggleFav={this.toggleFav} checkItem={this.checkItem} suspended={data.SUSPENDED === 'yes'}>
        <Container className="cron-jobs-list r-col w-85">
          <div className="name">{data.CMD}</div>
          <div className="stats">
            <Container className="cron-col">
              <div>{i18n.Min} <span>{data.MIN}</span></div>
            </Container>
            <Container className="cron-col">
              <div>{i18n.Hour} <span>{data.HOUR}</span></div>
            </Container>
            <Container className="cron-col">
              <div>{i18n.Day} <span>{data.DAY}</span></div>
            </Container>
            <Container className="cron-col">
              <div>{i18n.Month} <span>{data.MONTH}</span></div>
            </Container>
            <Container className="cron-col">
              <div>{i18n['Day of week']} <span>{data.WDAY}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div><a className="link-edit" href={`/edit/cron/?job=${data.JOB}`}>{i18n.edit} <FontAwesomeIcon icon="pen" /></a></div>
          <div>
            <button
              className="link-gray"
              onClick={() => this.props.handleModal(data.suspend_conf, `/${data.SUSPENDED === 'yes' ? 'unsuspend' : 'suspend'}/cron?job=${data.NAME}&token=${token}`)}>
              {data.suspend_action}
              <FontAwesomeIcon icon={data.SUSPENDED === 'yes' ? 'unlock' : 'lock'} />
            </button>
          </div>
          <div>
            <button className="link-delete" onClick={() => this.props.handleModal(data.delete_conf, `/delete/cron?job=${data.NAME}&token=${token}`)}>
              {i18n.Delete}
              <FontAwesomeIcon icon="times" />
            </button>
          </div>
        </div>
      </ListItem>
    );
  }
}

export default CronJob;