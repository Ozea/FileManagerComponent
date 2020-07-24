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
    const { i18n } = window.GLOBAL.App;
    const token = localStorage.getItem("token");

    return (
      <ListItem checked={data.isChecked} starred={data.STARRED} date={data.DATE} toggleFav={this.toggleFav} checkItem={this.checkItem} suspended={data.SUSPENDED === 'yes'}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME} <span className="dns-records">/ {data.RECORDS}</span></div>
          <br />
          <div className="stats">
            <Container className="c-1 w-35">
              <div className="ip">{data.IP}</div>
              <div className="soa"><span className="stat">{data.SOA}</span></div>
            </Container>
            <Container className="c-2 w-30">
              <div>{i18n.TTL}: <span className="stat">{data.TTL}</span></div>
              <div>{i18n.Serial}: <span className="stat">{data.SERIAL}</span></div>
            </Container>
            <Container className="c-3 w-35">
              <div>{i18n.Template}: <span className="stat">{data.TPL}</span></div>
              <div>{i18n.Expire}: <span className="stat">{data.EXP}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div><a className="link-gray" href={`/list/dns/?domain=${data.NAME}`}>{data.RECORDS_I18N} <FontAwesomeIcon icon="list" /></a></div>
          <div><a className="link-edit" href={`/add/dns/?domain=${data.NAME}`}>{i18n['add record']} <FontAwesomeIcon icon="add" /></a></div>
          <div><a className="link-edit" href={`/edit/dns/?domain=${data.NAME}`}>{i18n.edit} <FontAwesomeIcon icon="pen" /></a></div>
          <div>
            <button
              className="link-gray"
              onClick={() => this.props.handleModal(data.suspend_conf, `/${data.SUSPENDED === 'yes' ? 'unsuspend' : 'suspend'}/dns?domain=${data.NAME}&token=${token}`)}>
              {data.suspend_action}
              <FontAwesomeIcon icon={data.SUSPENDED === 'yes' ? 'unlock' : 'lock'} />
            </button>
          </div>
          <div>
            <button className="link-delete" onClick={() => this.props.handleModal(data.delete_conf, `/delete/dns?domain=${data.NAME}&token=${token}`)}>
              {i18n.Delete}
              <FontAwesomeIcon icon="times" />
            </button>
          </div>
        </div>
      </ListItem>
    );
  }
}

export default DomainNameSystem;