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

  render() {
    const { data, toggled } = this.props;

    return (
      <ListItem checked={false} toggled={toggled} date={data.DATE}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <div>{data.FNAME} {data.LNAME}</div>
          <div className="stats">
            <Container className="c-1 w-30">
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
            </Container>
            <Container className="c-2 w-40">
              <div>Web Domains: <span><span className="stat">{data.U_WEB_DOMAINS}</span> / unlimited</span></div>
              <div>DNS Domains: <span><span className="stat">{data.U_DNS_DOMAINS}</span> / unlimited</span></div>
              <div>Mail Domains: <span><span className="stat">{data.U_MAIL_DOMAINS}</span>  / unlimited</span></div>
              <div>Databases: <span><span className="stat">{data.U_DATABASES}</span>  / unlimited</span></div>
              <div>Cron Jobs: <span><span className="stat">{data.U_CRON_JOBS}</span>  / unlimited</span></div>
              <div>Backups: <span><span className="stat">{data.U_BACKUPS}</span>  / {data.BACKUPS}</span></div>
            </Container>
            <Container className="c-3 w-30">
              <div>Email: <span className="stat">{data.CONTACT}</span></div>
              <div>Packages: <span className="stat">{data.PACKAGE}</span></div>
              <div>SSH Access: <span className="stat">{data.SHELL}</span></div>
              <div>IP Address: <span className="stat">{data.IP_OWNED}</span></div>
              <div className="ns">Name Servers: <span className="stat">{this.printNameServers(data.NS)}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div>{data.NAME === 'admin' ? 'LOGOUT' : 'LOG IN'} <FontAwesomeIcon icon="user-lock" /></div>
          <div>EDIT <FontAwesomeIcon icon="pen" /></div>
          <div>SUSPEND <FontAwesomeIcon icon="lock" /></div>
          <div>DELETE <FontAwesomeIcon icon="times" /></div>
        </div>
      </ListItem>
    );
  }
}

export default User;