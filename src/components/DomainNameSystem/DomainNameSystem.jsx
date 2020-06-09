import React, { Component } from 'react';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DomainNameSystem.scss';

class DomainNameSystem extends Component {

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
          <div className="name">{data.NAME} <span className="dns-records">/ {data.RECORDS}</span></div>
          <br />
          <div className="stats">
            <Container className="c-1 w-35">
              <div className="ip">{data.IP}</div>
              <div className="soa"><span className="stat">{data.SOA}</span></div>
            </Container>
            <Container className="c-2 w-30">
              <div>{inc.TTL}: <span className="stat">{data.TTL}</span></div>
              <div>{inc.Serial}: <span className="stat">{data.SERIAL}</span></div>
            </Container>
            <Container className="c-3 w-35">
              <div>{inc.Template}: <span className="stat">{data.TPL}</span></div>
              <div>{inc.Expire}: <span className="stat">{data.EXP}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div><a href={`/list/dns/?domain=${data.NAME}`}>{data.RECORDS_I18N} <FontAwesomeIcon icon="list" /></a></div>
          <div><a href={`/add/dns/?domain=${data.NAME}`}>{inc['add record']} <FontAwesomeIcon icon="add" /></a></div>
          <div><a href={`/edit/dns/?domain=${data.NAME}`}>{inc.edit} <FontAwesomeIcon icon="pen" /></a></div>
          <div><a href={`#`}>{inc.suspend} <FontAwesomeIcon icon="lock" /></a></div>
          <div><a href={`#`}>{inc.delete} <FontAwesomeIcon icon="times" /></a></div>
        </div>
      </ListItem>
    );
  }
}

export default DomainNameSystem;