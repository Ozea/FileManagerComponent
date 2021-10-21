import React, { useState } from 'react';
import { addActiveElement } from '../../../actions/MainNavigation/mainNavigationActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from 'src/actions/Session/sessionActions';
import Notifications from './Notifications/Notifications';
import { useSelector, useDispatch } from "react-redux";
import Spinner from 'src/components/Spinner/Spinner';
import { Link, useHistory } from "react-router-dom";
import './Panel.scss';

const Panel = props => {
  const { i18n } = useSelector(state => state.session);
  const session = useSelector(state => state.session);
  const { activeElement, focusedElement } = useSelector(state => state.mainNavigation);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    smallNavigationClass: 'small-navigation hidden'
  });

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
    if (window.location.pathname === tab) {
      return event.preventDefault();
    }

    dispatch(addActiveElement(tab));
  }

  const signOut = () => {
    setLoading(true);

    dispatch(logout())
      .then(() => {
        history.push('/login/');
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
            <Link to="/list/user/" onClick={() => dispatch(addActiveElement('/list/user/'))}>
              <div>
                <img src="/images/white_logo.png" alt="Logo" />
              </div>
            </Link>
          </div>
          <div className={className("/list/package/")}>
            <Link to="/list/package/" onClick={event => handleState("/list/package/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Packages}</Link>
          </div>
          <div className={className("/list/ip/")}>
            <Link to="/list/ip/" onClick={event => handleState("/list/ip/", event)} onKeyPress={event => event.preventDefault()}>{i18n.IP}</Link>
          </div>
          <div className={className("/list/rrd/")}>
            <Link to="/list/rrd/" onClick={event => handleState("/list/rrd/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Graphs}</Link>
          </div>
          <div className={className("/list/stats/")}>
            <Link to="/list/stats/" onClick={event => handleState("/list/stats/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Statistics}</Link>
          </div>
          <div className={className("/list/log/")}>
            <Link to="/list/log/" onClick={event => handleState("/list/log/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Log}</Link>
          </div>
          <div className={className("/list/updates/")}>
            <Link to="/list/updates/" onClick={event => handleState("/list/updates/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Updates}</Link>
          </div>
          {session.session.FIREWALL_SYSTEM && <div className={className("/list/firewall/")}>
            <Link to="/list/firewall/" onClick={event => handleState("/list/firewall/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Firewall}</Link>
          </div>}
          {session.session.FILEMANAGER_KEY && <div className="fm">
            <a href="/list/directory/">{i18n['File Manager']}</a>
          </div>}
          {session.session.SOFTACULOUS === "yes" && <div><a href="/softaculous/">{i18n.Apps ?? 'Apps'}</a>
          </div>}
          <div className={className("/list/server/")}>
            <Link to="/list/server/" onClick={event => handleState("/list/server/", event)} onKeyPress={event => event.preventDefault()}>{i18n.Server}</Link></div>
        </div>
        <div className="container profile-menu">
          <Notifications />
          <div><Link to={`/edit/user?user=${session.userName}`}>{session.userName}</Link></div>
          <div><button onClick={signOut}>{i18n['Log out']}</button></div>
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
          <div><Link to={`/edit/user?user=${session.userName}`}>{session.userName}</Link></div>
          <div><button onClick={signOut}>{i18n['Log out']}</button></div>
        </div>
      </div>
    </div>
  );
}

export default Panel;