import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import './Package.scss';

class Package extends Component {
  printNameServers = servers => {
    let serversArray = servers.split(',');

    return serversArray.map(
      (server, index) => <div key={index}>{server}</div>
    );
  }

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
    const token = localStorage.getItem("token");

    return (
      <ListItem checked={data.isChecked} date={data.DATE} starred={data.STARRED} toggleFav={this.toggleFav} checkItem={this.checkItem}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <div>{data.FNAME} {data.LNAME}</div>
          <div className="stats">
            <Container className="c-1 w-30">
              <div>{inc['Web Template']}: <span><span className="stat">{data.WEB_TEMPLATE}</span></span></div>
              <div>{inc['Proxy Template']}: <span><span className="stat">{data.PROXY_TEMPLATE}</span></span></div>
              <div>{inc['DNS Template']}: <span><span className="stat">{data.DNS_TEMPLATE}</span></span></div>
              <div>{inc['SSH Access']}: <span><span className="stat">{data.SHELL}</span></span></div>
              <div>{inc['Web Domains']}: <span><span className="stat">{data.WEB_DOMAINS}</span></span></div>
              <div>{inc['Web Aliases']}: <span><span className="stat">{data.WEB_ALIASES}</span></span></div>
            </Container>
            <Container className="c-2 w-35">
              <div>{inc['DNS domains']}: <span><span className="stat">{data.DNS_DOMAINS}</span></span></div>
              <div>{inc['DNS records']}: <span><span className="stat">{data.DNS_RECORDS}</span></span></div>
              <div>{inc['Mail Domains']}: <span><span className="stat">{data.MAIL_DOMAINS}</span></span></div>
              <div>{inc['Mail Accounts']}: <span><span className="stat">{data.MAIL_ACCOUNTS}</span></span></div>
              <div>{inc.Databases}: <span><span className="stat">{data.DATABASES}</span></span></div>
              <div>{inc['Cron Jobs']}: <span><span className="stat">{data.CRON_JOBS}</span></span></div>
            </Container>
            <Container className="c-3 w-35">
              <div><span>{inc.Backups}:</span> <span><span className="stat">{data.BACKUPS}</span></span></div>
              <div><span>{inc.Bandwidth}:</span> <span><span><span className="stat">{data.BANDWIDTH}</span> {inc.mb}</span></span></div>
              <div><span>{inc.Disk}:</span> <span><span><span className="stat">{data.DISK_QUOTA}</span> {inc.mb}</span></span></div>
              <div className="ns"><span>{inc['Name Servers']}:</span> <span><span className="stat">{this.printNameServers(data.NS)}</span></span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div><a className="link-edit" href={`/edit/package/?package=${data.NAME}`}>{inc.edit} <FontAwesomeIcon icon="pen" /></a></div>
          <div>
            <button className="link-delete" onClick={() => this.props.handleModal(data.delete_conf, `/delete/package?package=${data.NAME}&token=${token}`)}>
              {inc.Delete}
              <FontAwesomeIcon icon="times" />
            </button>
          </div>
        </div>
      </ListItem>
    );
  }
}

export default Package;