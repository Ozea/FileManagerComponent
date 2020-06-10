import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import './User.scss';

class User extends Component {
  printNameServers = servers => {
    let serversArray = servers.split(',');

    return serversArray.map(
      (server, index) => <div key={index}>{server}</div>
    );
  }

  printLoginActionButton = user => {
    let currentUser = window.GLOBAL.App.user;
    if (currentUser === user) {
      return <div><a href="/logout">{window.GLOBAL.App.inc['Log out']} <FontAwesomeIcon icon="user-lock" /></a></div>;
    } else {
      return <div><a href={`/login/?loginas=${user}`}>{window.GLOBAL.App.inc['login as']} {user} <FontAwesomeIcon icon="user-lock" /></a></div>;
    }
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

    return (
      <ListItem checked={data.isChecked} date={data.DATE} starred={data.STARRED} toggleFav={this.toggleFav} checkItem={this.checkItem}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <div>{data.FNAME} {data.LNAME}</div>
          <div className="stats">
            <Container className="c-1">
              <div className="bandwidth">{inc.Bandwidth} <span><span className="stat">{data.U_BANDWIDTH}</span> mb</span></div>
              <div className="disk">{inc.Disk}: <span><span className="stat">{data.U_DISK}</span> mb</span></div>
              <div className="sub-disk-stats">
                <div>
                  <div><span>{inc.Web}:</span> <span><b>{data.U_DISK_WEB}</b> mb</span></div>
                  <div><span>{inc.Mail}:</span> <span><b>{data.U_DISK_MAIL}</b> mb</span></div>
                </div>
                <div>
                  <div><span>{inc.Databases}:</span> <span><b>{data.U_DATABASES}</b> mb</span></div>
                  <div><span>{inc['User Directories']}:</span> <span><b>{data.U_DISK_DIRS}</b> mb</span></div>
                </div>
              </div>
            </Container>
            <Container className="c-2">
              <div><span>{inc['Web Domains']}:</span> <span><b>{data.U_WEB_DOMAINS}</b> / {data.WEB_DOMAINS}</span></div>
              <div><span>{inc['DNS Domains']}:</span> <span><b>{data.U_DNS_DOMAINS}</b> / {data.DNS_DOMAINS}</span></div>
              <div><span>{inc['Mail Domains']}:</span> <span><b>{data.U_MAIL_DOMAINS}</b> / {data.MAIL_DOMAINS}</span></div>
              <div><span>{inc.Databases}:</span> <span><b>{data.U_DATABASES}</b> / {data.DATABASES}</span></div>
              <div><span>{inc['Cron Jobs']}:</span> <span><b>{data.U_CRON_JOBS}</b> / {data.CRON_JOBS}</span></div>
              <div><span>{inc.Backups}:</span> <span><b>{data.U_BACKUPS}</b> / {data.BACKUPS}</span></div>
            </Container>
            <Container className="c-3">
              <div><span>{inc.Email}:</span> <span className="stat email">{data.CONTACT}</span></div>
              <div><span>{inc.Package}:</span> <span className="stat">{data.PACKAGE}</span></div>
              <div><span>{inc['SSH Access']}:</span> <span className="stat">{data.SHELL}</span></div>
              <div><span>{inc['IP Addresses']}:</span> <span className="stat">{data.IP_OWNED}</span></div>
              <div className="ns"><span>{inc['Name Servers']}:</span> <span className="stat">{this.printNameServers(data.NS)}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          {this.printLoginActionButton(data.NAME)}
          <div><a href={`/edit/user?user=${data.NAME}`}>{inc.edit} <FontAwesomeIcon icon="pen" /></a></div>
          <div><a href={`/suspend/user?user=${data.NAME}`} >{data.spnd_action_i18n} <FontAwesomeIcon icon="lock" /></a></div>
          <div><a href="#">{inc.Delete} <FontAwesomeIcon icon="times" /></a></div>
        </div>
      </ListItem>
    );
  }
}

export default User;