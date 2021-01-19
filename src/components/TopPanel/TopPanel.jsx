import React, { useEffect, useState } from 'react';
import { addActiveElement } from 'src/actions/MainNavigation/mainNavigationActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import './TopPanel.scss';

export default function TopPanel({ domain = '' }) {
  const { i18n } = window.GLOBAL.App;
  const [menuItems, setMenuItems] = useState([]);
  const dispatch = useDispatch();
  const mainNavigation = useSelector(state => state.mainNavigation);
  const history = useHistory();
  const user = 'admin';

  const className = cls => {
    let className = 'nav-link';

    if (mainNavigation.activeElement === cls) {
      return className += ' active';
    }

    return className;
  }

  useEffect(() => {
    const menuItems = [
      {
        href: `/list/web-log/?domain=${domain}&type=access`,
        route: '/list/web-log/access',
        name: 'AccessLog'
      },
      {
        href: `/list/web-log/?domain=${domain}&type=error`,
        route: '/list/web-log/error',
        name: 'ErrorLog'
      }
    ];

    setMenuItems(menuItems);
  }, [domain]);

  const renderMenuItems = () => {
    return menuItems.map(item => (
      <div className={className(item.route)} key={item.name}>
        <button onClick={event => handleState(item.href, event, item.route)}>{i18n[item.name]}</button>
      </div>
    ));
  }

  const handleState = (tab, event, route) => {
    event.preventDefault();
    history.push(tab);
    dispatch(addActiveElement(route));
  }

  return (
    <div className="panel-wrapper">
      <div className="top-panel">
        <div className="container left-menu">
          <div className="logo">
            <Link to="/list/user/">
              <img src="/images/logo.png" alt="LOGO" />
            </Link>
          </div>

          {
            menuItems.length && renderMenuItems()
          }

          <div className="nav-link">
            <a href={`/download/web-log/?domain=${domain ?? ''}&type=access`} target="_blank">{i18n['Download AccessLog']}</a>
          </div>

          <div className="nav-link">
            <a href={`/download/web-log/?domain=${domain ?? ''}&type=error`} target="_blank">{i18n['Download ErrorLog']}</a>
          </div>
        </div>

        <div className="container profile-menu">
          <div><a href={`/edit/user?user=${user}`}>{user}</a></div>
          <div><a href="/logout">{i18n['Log out']}</a></div>
        </div>
      </div>
    </div>
  );
}