import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from '../ControlPanel/Container/Container';
import ListItem from '../ControlPanel/ListItem/ListItem';
import './Firewall.scss';

class Firewall extends Component {
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

    return (
      <ListItem checked={data.isChecked} date={data.DATE} starred={data.STARRED} toggleFav={this.toggleFav} checkItem={this.checkItem}>
        <Container className="cron-jobs-list r-col w-85">
          <div className="stats">
            <Container className="cron-col">
              <div><span className="stat">{data.ACTION}</span></div>
            </Container>
            <Container className="cron-col">
              <div><span><span className="stat">{data.PROTOCOL}</span> / {data.COMMENT}</span></div>
            </Container>
            <Container className="cron-col">
              <div></div>
            </Container>
            <Container className="cron-col">
              <div><span className="stat">{data.PORT}</span></div>
            </Container>
            <Container className="cron-col">
              <div><span className="stat">{data.IP}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div><a className="link-edit" href={`/edit/firewall?rule=${data.NAME}`}>{i18n.edit} <FontAwesomeIcon icon="pen" /></a></div>
          <div><a className="link-gray" href={`/suspend/firewall?rule=${data.NAME}`} >{i18n.suspend} <FontAwesomeIcon icon="lock" /></a></div>
          <div><a className="link-delete" href="#">{i18n.Delete} <FontAwesomeIcon icon="times" /></a></div>
        </div>
      </ListItem>
    );
  }
}

export default Firewall;