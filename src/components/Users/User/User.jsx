import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './User.scss';

class User extends Component {

  state = {
    toggled: false,
    starred: false
  }

  printDate = date => {
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return day + ' ' + months[month - 1] + ' ' + year;
  }

  printNameServers = servers => {
    let serversArray = servers.split(',');

    return serversArray.map(
      (server, index) => <div key={index}>{server}</div>
    );
  }

  toggleItem = (event) => {
    this.setState({ toggled: event.target.checked });
  }

  starItem = () => {
    this.setState({ starred: !this.state.starred });
  }

  className = () => {
    const { toggled, starred } = this.state;

    if (toggled && starred) {
      return "users-list toggled starred";
    } else if (toggled) {
      return "users-list toggled";
    } else if (starred) {
      return "users-list starred";
    }

    return "users-list";
  }

  render() {
    const { data } = this.props;

    return (
      <div className={this.className()}>
        <div className="l-col">
          <div className="checkbox"><input type="checkbox" onChange={(e) => this.toggleItem(e)} /></div>
          <div className="date">{this.printDate(data.DATE)}</div>
          <div onClick={this.starItem}><FontAwesomeIcon icon="star" /></div>
        </div>
        <div className="r-col">
          <div className="name">{data.NAME}</div>
          <div>{data.FNAME} {data.LNAME}</div>
          <div className="stats">
            <div className="c-1">
              <div className="bandwidth">Bandwidth <span><span className="stat">{data.U_BANDWIDTH}</span> mb</span></div>
              <div className="disk">Disk: <span><span className="stat">{data.U_DISK}</span> mb</span></div>
              <div className="sub-disk-stats">
                <div>
                  <div>Web: <span><span className="stat">{data.U_DISK_WEB}</span> mb</span></div>
                  <div>Mail: <span><span className="stat">{data.U_DISK_MAIL}</span> mb</span></div>
                </div>
                <div>
                  <div>Databases: <span><span className="stat">{data.U_DATABASES}</span> mb</span></div>
                  <div>User Directories: <span><span className="stat">{data.U_DISK_DIRS}</span> mb</span></div>
                </div>
              </div>
            </div>
            <div className="c-2">
              <div>Web Domains: <span><span className="stat">{data.U_WEB_DOMAINS}</span> / unlimited</span></div>
              <div>DNS Domains: <span><span className="stat">{data.U_DNS_DOMAINS}</span> / unlimited</span></div>
              <div>Mail Domains: <span><span className="stat">{data.U_MAIL_DOMAINS}</span>  / unlimited</span></div>
              <div>Databases: <span><span className="stat">{data.U_DATABASES}</span>  / unlimited</span></div>
              <div>Cron Jobs: <span><span className="stat">{data.U_CRON_JOBS}</span>  / unlimited</span></div>
              <div>Backups: <span><span className="stat">{data.U_BACKUPS}</span>  / {data.BACKUPS}</span></div>
            </div>
            <div className="c-3">
              <div>Email: <span className="stat">{data.CONTACT}</span></div>
              <div>Packages: <span className="stat">{data.PACKAGE}</span></div>
              <div>SSH Access: <span className="stat">{data.SHELL}</span></div>
              <div>IP Address: <span className="stat">{data.IP_OWNED}</span></div>
              <div className="ns">Name Servers: <span className="stat">{this.printNameServers(data.NS)}</span></div>
            </div>
          </div>
        </div>
        <div className="actions">
          <div>LOGOUT <FontAwesomeIcon icon="user-lock" /></div>
          <div>EDIT <FontAwesomeIcon icon="pen" /></div>
          <div>SUSPEND <FontAwesomeIcon icon="lock" /></div>
          <div>DELETE <FontAwesomeIcon icon="times" /></div>
        </div>
      </div>
    );
  }
}

export default User;