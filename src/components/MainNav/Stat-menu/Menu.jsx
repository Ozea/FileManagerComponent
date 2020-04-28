import React from 'react';
import { users } from '../../../mocks/users';
import { Link } from "react-router-dom";
import './Menu.scss';

function className(height) {
  if (height === 35) {
    return "menu-stat shadow";
  } else {
    return "menu-stat";
  }
}

function style({ menuHeight, mobile }) {
  if (mobile) {
    return;
  }

  if (document.documentElement.clientWidth > 900) {
    return menuHeight
  } else {
    return 45;
  }
}

function statClassName(activeName) {
  let path = window.location.pathname;

  if (path === activeName) {
    return "stat l-active";
  }

  return "stat";
}

const Menu = (props) => {
  let usersAmount = Object.keys(users).length;
  let user = window.GLOBAL.App.user;
  return (
    <div className="menu-wrapper">
      <div className={className(props.menuHeight)} style={{ height: style(props) }}>
        <div className={statClassName("/list/user/")}>
          <Link to="/list/user/">
            <h3>User</h3>
            <div className="stats">
              <div>users: <span>{usersAmount}</span></div>
              <div>suspended: <span>{users[user].SUSPENDED_USERS}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/web/")}>
          <Link to="/list/web/">
            <h3>Web</h3>
            <div className="stats">
              <div>domains: <span>{users[user].U_WEB_DOMAINS}</span></div>
              <div>aliases: <span>{users[user].U_WEB_ALIASES}</span></div>
              <div>suspended: <span>{users[user].SUSPENDED_WEB}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/dns/")}>
          <Link to="/list/dns/">
            <h3>Dns</h3>
            <div className="stats">
              <div>domains: <span>{users[user].U_DNS_DOMAINS}</span></div>
              <div>records: <span>{users[user].U_DNS_RECORDS}</span></div>
              <div>suspended: <span>{users[user].SUSPENDED_DNS}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/mail/")}>
          <Link to="/list/mail/">
            <h3>Mail</h3>
            <div className="stats">
              <div>domains: <span>{users[user].U_MAIL_DOMAINS}</span></div>
              <div>accounts: <span>{users[user].U_MAIL_ACCOUNTS}</span></div>
              <div>suspended: <span>{users[user].SUSPENDED_MAIL}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/db/")}>
          <Link to="/list/db/">
            <h3>Db</h3>
            <div className="stats">
              <div>databases: <span>{users[user].U_DATABASES}</span></div>
              <div>suspended: <span>{users[user].SUSPENDED_DB}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/cron/")}>
          <Link to="/list/cron/">
            <h3>Cron</h3>
            <div className="stats">
              <div>jobs: <span>{users[user].U_CRON_JOBS}</span></div>
              <div>suspended: <span>{users[user].SUSPENDED_CRON}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/backup/") + ' last'}>
          <Link to="/list/backup/">
            <h3>Backup</h3>
            <div className="stats">
              <div>backups: <span>{users[user].U_BACKUPS}</span></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;