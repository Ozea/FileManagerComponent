import React, { useEffect, useState } from 'react';
import { addActiveElement, removeFocusedElement } from '../../../actions/MainNavigation/mainNavigationActions';
import { getUsersList } from '../../../ControlPanelService/Users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notifications from './Notifications/Notifications';
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import './Panel.scss';

const Panel = props => {
  const { i18n, user, fileManagerKey, softaculous, firewallSystem } = window.GLOBAL.App;
  const { activeElement, focusedElement } = useSelector(state => state.mainNavigation);
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    smallNavigationClass: 'small-navigation hidden'
  });

  useEffect(event => {
    getToken();
  }, []);

  const getToken = event => {
    getUsersList()
      .then(res => localStorage.setItem("token", res.data.token))
      .catch()
  }

  const toggleNavigation = event => {
    props.showTopNav();

    if (state.smallNavigationClass === 'small-navigation hidden') {
      setState({ ...state, smallNavigationClass: 'small-navigation show' });
    } else {
      setState({ ...state, smallNavigationClass: 'small-navigation hidden' });
    }
  }

  const className = activeName => {
    let className = 'top-link';

    if (activeName === activeElement) {
      className += ' active';
    }

    if (activeName === focusedElement) {
      className += ' focus';
    }

    return className;
  }

  const handleState = (tab, event) => {
    event.preventDefault();
    history.push(tab);
    dispatch(addActiveElement(tab));
  }

  return (
    <div className="panel-wrapper">
      <div className="top-panel">
        <div className="container left-menu">
          <div className="logo">
            <Link to="/list/user/" onClick={() =>     dispatch(addActiveElement('/list/user/'))}>
              <img src="/images/logo.png" alt="LOGO" />
            </Link>
          </div>
          <div className={className("/list/package/")}>
            <button onClick={event => handleState("/list/package/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Packages}</button>
          </div>
          <div className={className("/list/ip/")}>
            <button onClick={event => handleState("/list/ip/", event)} onKeyPress={event => event.preventDefault()}>{i18n.IP}</button>
          </div>
          <div className={className("/list/rrd/")}>
            <button onClick={event => handleState("/list/rrd/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Graphs}</button>
          </div>
          <div className={className("/list/stats/")}>
            <button onClick={event => handleState("/list/stats/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Statistics}</button>
          </div>
          <div className={className("/list/log/")}>
            <button onClick={event => handleState("/list/log/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Log}</button>
          </div>
          <div className={className("/list/updates/")}>
            <button onClick={event => handleState("/list/updates/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Updates}</button>
          </div>
          {firewallSystem && <div className={className("/list/firewall/")}>
            <button onClick={event => handleState("/list/firewall/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Firewall}</button>
          </div>}
          {fileManagerKey && <div className="fm">
            <a href="/list/directory/">{i18n['File Manager']}</a>
          </div>}
          {softaculous === "yes" && <div><a href="/list/softaculous/">{i18n.Apps}</a>
          </div>}
          <div className={className("/list/server/")}>
            <button onClick={event => handleState("/list/server/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Server}</button></div>
        </div>
        <div className="container profile-menu">
          <Notifications />
          <div><a href={`/edit/user?user=${user}`}>{user}</a></div>
          <div><a href="/logout">{i18n['Log out']}</a></div>
        </div>
      </div>

      <div className="top-panel small-device">
        <div className="container left-menu">
          <div className="logo">LOGO</div>
        </div>
        <div className="container hamburger" onClick={toggleNavigation}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <div className="container profile-menu">
          <div className="bell">
            <FontAwesomeIcon icon="bell" />
          </div>
          <div><a href={`/edit/user?user=${user}`}>{user}</a></div>
          <div><a href="/logout">{i18n['Log out']}</a></div>
        </div>
      </div>
    </div>
  );
}

export default Panel;