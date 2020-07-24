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
  const { user, topPanel, i18n } = window.GLOBAL.App;
  return (
    <div className="menu-wrapper">
      <div className={className(props.menuHeight)} style={{ height: style(props) }}>
        <div className={statClassName("/list/user/")}>
          <Link to="/list/user/">
            <h3>{i18n.USER}</h3>
            <div className="stats">
              <div><span>{i18n.users}:</span> <span>{topPanel[user].U_USERS}</span></div>
              <div><span>{i18n.spnd}:</span> <span>{topPanel[user].SUSPENDED_USERS}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/web/")}>
          <Link to="/list/web/">
            <h3>{i18n.WEB}</h3>
            <div className="stats">
              <div><span>{i18n.domains}:</span> <span>{topPanel[user].U_WEB_DOMAINS}</span></div>
              <div><span>{i18n.aliases}:</span> <span>{topPanel[user].U_WEB_ALIASES}</span></div>
              <div><span>{i18n.spnd}:</span> <span>{topPanel[user].SUSPENDED_WEB}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/dns/")}>
          <Link to="/list/dns/">
            <h3>{i18n.DNS}</h3>
            <div className="stats">
              <div><span>{i18n.domains}:</span> <span>{topPanel[user].U_DNS_DOMAINS}</span></div>
              <div><span>{i18n.records}:</span> <span>{topPanel[user].U_DNS_RECORDS}</span></div>
              <div><span>{i18n.spnd}:</span> <span>{topPanel[user].SUSPENDED_DNS}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/mail/")}>
          <Link to="/list/mail/">
            <h3>{i18n.MAIL}</h3>
            <div className="stats">
              <div><span>{i18n.domains}:</span> <span>{topPanel[user].U_MAIL_DOMAINS}</span></div>
              <div><span>{i18n.accounts}:</span> <span>{topPanel[user].U_MAIL_ACCOUNTS}</span></div>
              <div><span>{i18n.spnd}:</span> <span>{topPanel[user].SUSPENDED_MAIL}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/db/")}>
          <Link to="/list/db/">
            <h3>{i18n.DB}</h3>
            <div className="stats">
              <div><span>{i18n.databases}:</span> <span>{topPanel[user].U_DATABASES}</span></div>
              <div><span>{i18n.spnd}:</span> <span>{topPanel[user].SUSPENDED_DB}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/cron/")}>
          <Link to="/list/cron/">
            <h3>{i18n.CRON}</h3>
            <div className="stats">
              <div><span>{i18n.jobs}:</span> <span>{topPanel[user].U_CRON_JOBS}</span></div>
              <div><span>{i18n.spnd}:</span> <span>{topPanel[user].SUSPENDED_CRON}</span></div>
            </div>
          </Link>
        </div>
        <div className={statClassName("/list/backup/") + ' last'}>
          <Link to="/list/backup/">
            <h3>{i18n.BACKUP}</h3>
            <div className="stats">
              <div><span>{i18n.backups}:</span> <span>{topPanel[user].U_BACKUPS}</span></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;