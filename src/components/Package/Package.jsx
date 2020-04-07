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

  render() {
    const { data, toggled } = this.props;

    return (
      <ListItem checked={false} toggled={toggled} date={data.DATE}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <div>{data.FNAME} {data.LNAME}</div>
          <div className="stats">
            <Container className="c-1 w-30">
              <div>Web Template: <span className="stat">{data.WEB_TEMPLATE}</span></div>
              <div>Proxy Template: <span className="stat">{data.PROXY_TEMPLATE}</span></div>
              <div>DNS Template: <span className="stat">{data.DNS_TEMPLATE}</span></div>
              <div>SSH Access: <span className="stat">{data.SHELL}</span></div>
              <div>Web Domains: <span className="stat">{data.WEB_DOMAINS}</span></div>
              <div>Web Aliases: <span className="stat">{data.WEB_ALIASES}</span></div>
            </Container>
            <Container className="c-2 w-35">
              <div>DNS Domains: <span className="stat">{data.DNS_DOMAINS}</span></div>
              <div>DNS Records: <span className="stat">{data.DNS_RECORDS}</span></div>
              <div>Mail Domains: <span className="stat">{data.MAIL_DOMAINS}</span></div>
              <div>Mail Accounts: <span className="stat">{data.MAIL_ACCOUNTS}</span></div>
              <div>Databases: <span className="stat">{data.DATABASES}</span></div>
              <div>Cron Jobs: <span className="stat">{data.CRON_JOBS}</span></div>
            </Container>
            <Container className="c-3 w-35">
              <div>Backups: <span className="stat">{data.BACKUPS}</span></div>
              <div>Bandwidth: <span><span className="stat">{data.BANDWIDTH}</span> mb</span></div>
              <div>Disk: <span><span className="stat">{data.DISK_QUOTA}</span> mb</span></div>
              <div className="ns">Name Servers: <span className="stat">{this.printNameServers(data.NS)}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div>LOGOUT <FontAwesomeIcon icon="user-lock" /></div>
          <div>EDIT <FontAwesomeIcon icon="pen" /></div>
          <div>SUSPEND <FontAwesomeIcon icon="lock" /></div>
          <div>DELETE <FontAwesomeIcon icon="times" /></div>
        </div>
      </ListItem>
    );
  }
}

export default Package;