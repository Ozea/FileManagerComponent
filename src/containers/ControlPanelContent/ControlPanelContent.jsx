import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFocusedElement, addActiveElement, removeActiveElement, removeFocusedElement } from "../../actions/MainNavigation/mainNavigationActions";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import DomainNameSystems from '../DomainNameSystems/DomainNameSystems';
import InternetProtocols from '../InternetProtocols/InternetProtocols';
import Hotkeys from '../../components/ControlPanel/Hotkeys/Hotkeys';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Databases from '../../containers/Databases/Databases';
import Firewalls from '../../containers/Firewalls/Firewalls';
import CronJobs from '../../containers/CronJobs/CronJobs';
import Packages from '../../containers/Packages/Packages';
import AddUser from '../../components/User/Add/AddUser';
import Updates from '../../containers/Updates/Updates';
import Servers from '../../containers/Servers/Servers';
import MainNav from '../../components/MainNav/MainNav';
import Statistics from '../Statistics/Statistics';
import Users from '../../containers/Users/Users';
import Mails from '../../containers/Mails/Mails';
import RRDs from '../../containers/RRDs/RRDs';
import Web from '../../containers/Web/Web';
import Backups from '../Backups/Backups';
import Search from '../Search/Search';
import Logs from '../Logs/Logs';

import './ControlPanelContent.scss';
import AddWebDomain from '../../components/WebDomain/Add/AddWebDomain';
import AddDomainNameSystem from '../../components/DomainNameSystem/Add/AddDomainNameSystem';

const ControlPanelContent = props => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [hotkeysList, setHotkeysList] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeFocusedElement());
    window.addEventListener("keyup", switchPanelTab);
    window.addEventListener("keyup", addNewObject);

    return () => {
      window.addEventListener("keyup", switchPanelTab);
      window.addEventListener("keyup", addNewObject);
    }
  }, []);

  const switchPanelTab = event => {
    let isSearchInputFocused = document.querySelector('input:focus') || document.querySelector('textarea:focus');

    if (isSearchInputFocused) {
      return;
    }

    switch (event.keyCode) {
      case 49: history.push('/list/user/'); return dispatchActiveElement('/list/user/');
      case 50: history.push('/list/web/'); return dispatchActiveElement('/list/web/');
      case 51: history.push('/list/dns/'); return dispatchActiveElement('/list/dns/');
      case 52: history.push('/list/mail/'); return dispatchActiveElement('/list/mail/');
      case 53: history.push('/list/db/'); return dispatchActiveElement('/list/db/');
      case 54: history.push('/list/cron/'); return dispatchActiveElement('/list/cron/');
      case 55: history.push('/list/backup/'); return dispatchActiveElement('/list/backup/');
      default: break;
    }
  }

  const dispatchActiveElement = tab => {
    dispatch(addActiveElement(tab));
  }

  const addNewObject = event => {
    let isSearchInputFocused = document.querySelector('input:focus') || document.querySelector('textarea:focus');

    if (isSearchInputFocused) {
      return;
    }

    if (event.keyCode === 65) {
      switch (history.location.pathname) {
        case '/list/user/': return history.push('/add/user/');
        case '/list/web/': return history.push('/add/web/');
        case '/list/dns/': return history.push('/add/dns/');
        case '/list/mail/': return history.push('/add/mail/');
        case '/list/db/': return history.push('/add/db/');
        case '/list/cron/': return history.push('/add/cron/');
        case '/list/backup/': return history.push('/add/backup/');
        case '/list/packages/': return history.push('/add/package/');
        case '/list/ip/': return history.push('/add/ip/');
        case '/list/firewall/': return history.push('/add/firewall/');
        default: break;
      }
    }
  }

  const handleSearchTerm = searchTerm => {
    setSearchTerm(searchTerm);
    history.push({
      pathname: '/search/',
      search: `?q=${searchTerm}`
    });
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div>
      <MainNav history={history} />
      <div className="content">
        <Switch>
          <Redirect from="/" exact to="/list/user" />
          <Route path="/list/package" component={props => <Packages {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/list/ip" component={props => <InternetProtocols {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/list/rrd" component={props => <RRDs {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/list/stats" component={props => <Statistics {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/list/log" component={props => <Logs {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/list/updates" component={props => <Updates {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/list/firewall" component={props => <Firewalls {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/list/server" component={props => <Servers {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/list/user" component={props => <Users {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/add/user" component={() => <AddUser />} />
          <Route path="/list/web" component={props => <Web {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/add/web" component={() => <AddWebDomain />} />
          <Route path="/list/dns" component={props => <DomainNameSystems {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/add/dns" component={() => <AddDomainNameSystem />} />
          <Route path="/list/mail" component={props => <Mails {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/list/db" component={props => <Databases {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/list/cron" component={props => <CronJobs {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/list/backup" component={props => <Backups {...props} changeSearchTerm={handleSearchTerm} />} />
          <Route path="/search/" component={props => <Search {...props} changeSearchTerm={handleSearchTerm} searchTerm={searchTerm} />} />
        </Switch>
      </div>
      <div className="fixed-buttons">
        <div className="hotkey-button">
          <button onClick={() => hotkeysList.classList.toggle('hide')}>
            <FontAwesomeIcon icon="ellipsis-h" />
          </button>
        </div>
        <div className="scroll-to-top">
          <button onClick={() => scrollToTop()}>
            <FontAwesomeIcon icon="long-arrow-alt-up" />
          </button>
        </div>
      </div>
      <Hotkeys reference={(inp) => setHotkeysList(inp)} toggleHotkeys={() => hotkeysList.classList.toggle('hide')} />
    </div>
  );
}

export default ControlPanelContent;