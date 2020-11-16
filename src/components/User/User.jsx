import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from '../ControlPanel/Container/Container';
import ListItem from '../ControlPanel/ListItem/ListItem';
import './User.scss';

const { i18n } = window.GLOBAL.App;

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
      return (
        <div>
          <a href="/logout">{i18n['Log out']}
            {this.props.data.FOCUSED ? <span className="shortcut-button">L</span> : <FontAwesomeIcon icon="user-lock" />}
          </a>
        </div>
      );
    } else {
      return (
        <div>
          <a href={`/login/?loginas=${user}`}>{i18n['login as']} {user}
            {this.props.data.FOCUSED ? <span className="shortcut-button">L</span> : <FontAwesomeIcon icon="user-lock" />}
          </a>
        </div>
      );
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

  handleSuspend = token => {
    let suspendedStatus = this.props.data.SUSPENDED === 'yes' ? 'unsuspend' : 'suspend';
    this.props.handleModal(this.props.data.spnd_conf, `/${suspendedStatus}/user?user=${this.props.data.NAME}&token=${token}`);
  }

  handleDelete = token => {
    this.props.handleModal(this.props.data.delete_conf, `/delete/user/?user=${this.props.data.NAME}&token=${token}`);
  }

  render() {
    const { data } = this.props;
    const token = localStorage.getItem("token");

    return (
      <ListItem
        id={data.NAME}
        date={data.DATE}
        checked={data.isChecked}
        starred={data.STARRED}
        toggleFav={this.toggleFav}
        checkItem={this.checkItem}
        focused={data.FOCUSED}
        suspended={data.SUSPENDED === 'yes'}>

        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <div>{data.FNAME} {data.LNAME}</div>
          <div className="stats">
            <Container className="c-1">
              <div className="bandwidth">{i18n.Bandwidth} <span><span className="stat">{data.U_BANDWIDTH}</span> {i18n.mb}</span></div>
              <div className="disk">{i18n.Disk}: <span><span className="stat">{data.U_DISK}</span> {i18n.mb}</span></div>
              <div className="sub-disk-stats">
                <div>
                  <div><span>{i18n.Web}:</span> <span><b>{data.U_DISK_WEB}</b> {i18n.mb}</span></div>
                  <div><span>{i18n.Mail}:</span> <span><b>{data.U_DISK_MAIL}</b> {i18n.mb}</span></div>
                </div>
                <div>
                  <div><span>{i18n.Databases}:</span> <span><b>{data.U_DATABASES}</b> {i18n.mb}</span></div>
                  <div><span>{i18n['User Directories']}:</span> <span><b>{data.U_DISK_DIRS}</b> {i18n.mb}</span></div>
                </div>
              </div>
            </Container>
            <Container className="c-2">
              <div><span>{i18n['Web Domains']}:</span> <span><b>{data.U_WEB_DOMAINS}</b> / {data.WEB_DOMAINS}</span></div>
              <div><span>{i18n['DNS Domains']}:</span> <span><b>{data.U_DNS_DOMAINS}</b> / {data.DNS_DOMAINS}</span></div>
              <div><span>{i18n['Mail Domains']}:</span> <span><b>{data.U_MAIL_DOMAINS}</b> / {data.MAIL_DOMAINS}</span></div>
              <div><span>{i18n.Databases}:</span> <span><b>{data.U_DATABASES}</b> / {data.DATABASES}</span></div>
              <div><span>{i18n['Cron Jobs']}:</span> <span><b>{data.U_CRON_JOBS}</b> / {data.CRON_JOBS}</span></div>
              <div><span>{i18n.Backups}:</span> <span><b>{data.U_BACKUPS}</b> / {data.BACKUPS}</span></div>
            </Container>
            <Container className="c-3">
              <div><span>{i18n.Email}:</span> <span className="stat email">{data.CONTACT}</span></div>
              <div><span>{i18n.Package}:</span> <span className="stat">{data.PACKAGE}</span></div>
              <div><span>{i18n['SSH Access']}:</span> <span className="stat">{data.SHELL}</span></div>
              <div><span>{i18n['IP Addresses']}:</span> <span className="stat">{data.IP_OWNED}</span></div>
              <div className="ns"><span>{i18n['Name Servers']}:</span> <span className="stat">{this.printNameServers(data.NS)}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          {this.printLoginActionButton(data.NAME)}
          <div>
            <a href={`/edit/user?user=${data.NAME}`}>{i18n.edit}
              {this.props.data.FOCUSED ? <span className="shortcut-button html-unicode">&#8617;</span> : <FontAwesomeIcon icon="pen" />}
            </a>
          </div>
          <div>
            <button
              className="link-gray"
              onClick={() => this.handleSuspend(token)}>
              {data.spnd_action}
              {this.props.data.FOCUSED ? <span className="shortcut-button">S</span> : <FontAwesomeIcon icon={data.SUSPENDED === 'yes' ? 'unlock' : 'lock'} />}
            </button>
          </div>
          <div>
            <button className="link-delete" onClick={() => this.handleDelete(token)}>
              {i18n.Delete}
              {this.props.data.FOCUSED ? <span className="shortcut-button del">Del</span> : <FontAwesomeIcon icon="times" />}
            </button>
          </div>
        </div>
      </ListItem>
    );
  }
}

export default User;