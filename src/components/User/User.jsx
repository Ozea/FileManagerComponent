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
      return <div><a href="/logout">{window.GLOBAL.App.userI18N.LOGOUT} <FontAwesomeIcon icon="user-lock" /></a></div>;
    } else {
      return <div><a href={`/login/?loginas=${user}`}>{window.GLOBAL.App.userI18N.LOGIN_AS} <FontAwesomeIcon icon="user-lock" /></a></div>;
    }
  }

  render() {
    const { data, toggled } = this.props;
    const userI18N = window.GLOBAL.App.userI18N;

    return (
      <ListItem checked={false} toggled={toggled} date={data.DATE}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <div>{data.FNAME} {data.LNAME}</div>
          <div className="stats">
            <Container className="c-1 w-30">
              <div className="bandwidth">{userI18N.BANDWIDTH} <span><span className="stat">{data.U_BANDWIDTH}</span> mb</span></div>
              <div className="disk">{userI18N.DISK}: <span><span className="stat">{data.U_DISK}</span> mb</span></div>
              <div className="sub-disk-stats">
                <div>
                  <div>{userI18N.WEB}: <span><span className="stat">{data.U_DISK_WEB}</span> mb</span></div>
                  <div>{userI18N.MAIL}: <span><span className="stat">{data.U_DISK_MAIL}</span> mb</span></div>
                </div>
                <div>
                  <div>{userI18N.DATABASES}: <span><span className="stat">{data.U_DATABASES}</span> mb</span></div>
                  <div>{userI18N.USER_DIRECTORIES}: <span><span className="stat">{data.U_DISK_DIRS}</span> mb</span></div>
                </div>
              </div>
            </Container>
            <Container className="c-2 w-40">
              <div>{userI18N.WEB_DOMAINS}: <span><span className="stat">{data.U_WEB_DOMAINS}</span> / {data.WEB_DOMAINS}</span></div>
              <div>{userI18N.DNS_DOMAINS}: <span><span className="stat">{data.U_DNS_DOMAINS}</span> / {data.DNS_DOMAINS}</span></div>
              <div>{userI18N.MAIL_DOMAINS}: <span><span className="stat">{data.U_MAIL_DOMAINS}</span>  / {data.MAIL_DOMAINS}</span></div>
              <div>{userI18N.DATABASES}: <span><span className="stat">{data.U_DATABASES}</span>  / {data.DATABASES}</span></div>
              <div>{userI18N.CRON_JOBS}: <span><span className="stat">{data.U_CRON_JOBS}</span>  / {data.CRON_JOBS}</span></div>
              <div>{userI18N.BACKUPS}: <span><span className="stat">{data.U_BACKUPS}</span>  / {data.BACKUPS}</span></div>
            </Container>
            <Container className="c-3 w-30">
              <div>{userI18N.EMAIL}: <span className="stat">{data.CONTACT}</span></div>
              <div>{userI18N.PACKAGE}: <span className="stat">{data.PACKAGE}</span></div>
              <div>{userI18N.SSH_ACCESS}: <span className="stat">{data.SHELL}</span></div>
              <div>{userI18N.IP_ADDRESSES}: <span className="stat">{data.IP_OWNED}</span></div>
              <div className="ns">{userI18N.NAME_SERVERS}: <span className="stat">{this.printNameServers(data.NS)}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          {this.printLoginActionButton(data.NAME)}
          <div><a href={`/edit/user?user=${data.NAME}`}>{userI18N.EDIT} <FontAwesomeIcon icon="pen" /></a></div>
          <div><a href={`/suspend/user?user=${data.NAME}`} >{data.spnd_action_i18n} <FontAwesomeIcon icon="lock" /></a></div>
          <div><a href="#">{userI18N.DELETE} <FontAwesomeIcon icon="times" /></a></div>
        </div>
      </ListItem>
    );
  }
}

export default User;