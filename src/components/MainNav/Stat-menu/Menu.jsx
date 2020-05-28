import React from 'react';
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
  const { user, panel, statMenu } = window.GLOBAL.App;
  return (
    <div className="menu-wrapper">
      <div className={className(props.menuHeight)} style={{ height: style(props) }}>
        <div className={statClassName("/list/user/")}>
          <Link to="/list/user/">
            <h3>{statMenu.USER}</h3>
            <div className="stats">
              <div><span>{statMenu.users}:</span> <span>{panel[user].U_USERS}</span></div>
              <div><span>{statMenu.spnd}:</span> <span>{panel[user].SUSPENDED_USERS}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/web/")}>
          <Link to="/list/web/">
            <h3>{statMenu.WEB}</h3>
            <div className="stats">
              <div><span>{statMenu.domains}:</span> <span>{panel[user].U_WEB_DOMAINS}</span></div>
              <div><span>{statMenu.aliases}:</span> <span>{panel[user].U_WEB_ALIASES}</span></div>
              <div><span>{statMenu.spnd}:</span> <span>{panel[user].SUSPENDED_WEB}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/dns/")}>
          <Link to="/list/dns/">
            <h3>{statMenu.DNS}</h3>
            <div className="stats">
              <div><span>{statMenu.domains}:</span> <span>{panel[user].U_DNS_DOMAINS}</span></div>
              <div><span>{statMenu.records}:</span> <span>{panel[user].U_DNS_RECORDS}</span></div>
              <div><span>{statMenu.spnd}:</span> <span>{panel[user].SUSPENDED_DNS}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/mail/")}>
          <Link to="/list/mail/">
            <h3>{statMenu.MAIL}</h3>
            <div className="stats">
              <div><span>{statMenu.domains}:</span> <span>{panel[user].U_MAIL_DOMAINS}</span></div>
              <div><span>{statMenu.accounts}:</span> <span>{panel[user].U_MAIL_ACCOUNTS}</span></div>
              <div><span>{statMenu.spnd}:</span> <span>{panel[user].SUSPENDED_MAIL}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/db/")}>
          <Link to="/list/db/">
            <h3>{statMenu.DB}</h3>
            <div className="stats">
              <div><span>{statMenu.databases}:</span> <span>{panel[user].U_DATABASES}</span></div>
              <div><span>{statMenu.spnd}:</span> <span>{panel[user].SUSPENDED_DB}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/cron/")}>
          <Link to="/list/cron/">
            <h3>{statMenu.CRON}</h3>
            <div className="stats">
              <div><span>{statMenu.jobs}:</span> <span>{panel[user].U_CRON_JOBS}</span></div>
              <div><span>{statMenu.spnd}:</span> <span>{panel[user].SUSPENDED_CRON}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/backup/") + ' last'}>
          <Link to="/list/backup/">
            <h3>{statMenu.BACKUP}</h3>
            <div className="stats">
              <div><span>{statMenu.backups}:</span> <span>{panel[user].U_BACKUPS}</span></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;