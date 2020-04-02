import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from '../ControlPanel/Container/Container';
import './Statistic.scss';

class Statistic extends Component {
  printDate = date => {
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return <div className="date">{day} &nbsp; {months[month - 1]} &nbsp; {year}</div>;
  }

  printName = date => {
    let newDate = new Date(date);
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return <div className="date">{months[month - 1]} &nbsp; {year}</div>;
  }

  render() {
    const { data } = this.props;

    return (
      <div className="statistic-item">
        <Container className="l-col w-15">
          {this.printDate(data.DATE)}
        </Container>
        <Container className="r-col w-85">
          <div className="name">{this.printName(data.DATE)}</div>
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
            <Container className="c-2 w-35">
              <div>Web Domains: <span className="stat">{data.U_WEB_DOMAINS}</span></div>
              <div>SSL Domains: <span className="stat">{data.U_WEB_SSL}</span></div>
              <div>Web Aliases: <span className="stat">{data.U_WEB_ALIASES}</span></div>
              <div>DNS Domains: <span className="stat">{data.U_DNS_DOMAINS}</span></div>
              <div>DNS Records: <span className="stat">{data.U_DNS_RECORDS}</span></div>
            </Container>
            <Container className="c-3 w-35">
              <div>Mail Domains: <span className="stat">{data.U_MAIL_DOMAINS}</span></div>
              <div>Mail Accounts: <span className="stat">{data.U_MAIL_ACCOUNTS}</span></div>
              <div>Databases: <span className="stat">{data.U_DATABASES}</span></div>
              <div>Cron Jobs: <span className="stat">{data.U_CRON_JOBS}</span></div>
              <div>IP Addresses: <span className="stat">{data.IP_OWNED}</span></div>
            </Container>
          </div>
        </Container>
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

export default Statistic;