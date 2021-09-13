import React, { useEffect, useState } from 'react';
import { addActiveElement } from 'src/actions/MainNavigation/mainNavigationActions';
import { logout } from 'src/actions/Session/sessionActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

import './TopPanel.scss';

export default function TopPanel({ domain = '' }) {
  const mainNavigation = useSelector(state => state.mainNavigation);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { i18n } = window.GLOBAL.App;
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(state => state.session);

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

  const signOut = () => {
    setLoading(true);

    dispatch(logout())
      .then(() => {
        setLoading(false);
      },
        error => {
          setLoading(false);
          console.error(error);
        });
  }

  return (
    <div className="panel-wrapper">
      {loading && <Spinner />}

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
            <Link to={`/download/web-log/?domain=${domain ?? ''}&type=access`} target="_blank">{i18n['Download AccessLog']}</Link>
          </div>

          <div className="nav-link">
            <Link to={`/download/web-log/?domain=${domain ?? ''}&type=error`} target="_blank">{i18n['Download ErrorLog']}</Link>
          </div>
        </div>

        <div className="container profile-menu">
          <div><Link to={`/edit/user?user=${userName}`}>{userName}</Link></div>
          <div><button onClick={signOut}>{i18n['Log out']}</button></div>
        </div>
      </div>
    </div>
  );
}