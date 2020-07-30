import React, { Component } from 'react';
import DomainNameSystems from '../DomainNameSystems/DomainNameSystems';
import InternetProtocols from '../InternetProtocols/InternetProtocols';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Databases from '../../containers/Databases/Databases';
import Firewalls from '../../containers/Firewalls/Firewalls';
import { Route, Switch, Redirect } from "react-router-dom";
import CronJobs from '../../containers/CronJobs/CronJobs';
import Packages from '../../containers/Packages/Packages';
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

class ControlPanelContent extends Component {
  state = {
    searchTerm: ''
  }

  handleSearchTerm = searchTerm => {
    this.setState({ searchTerm }, () => {
      this.props.history.push({
        pathname: '/search/',
        search: `?q=${searchTerm}`
      });
    });
  }

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render() {
    return (
      <div>
        <MainNav />
        <div className="content">
          <Switch>
            <Redirect from="/" exact to="/list/user" />
            <Route path="/list/package" component={() => <Packages changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/ip" component={() => <InternetProtocols changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/rrd" component={() => <RRDs changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/stats" component={props => <Statistics {...props} changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/log" component={() => <Logs changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/updates" component={() => <Updates changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/firewall" component={() => <Firewalls changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/server" component={() => <Servers changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/user" component={() => <Users changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/web" component={() => <Web changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/dns" component={() => <DomainNameSystems changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/mail" component={() => <Mails changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/db" component={() => <Databases changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/cron" component={() => <CronJobs changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/list/backup" component={() => <Backups changeSearchTerm={this.handleSearchTerm} />} />
            <Route path="/search/" component={props => <Search {...props} changeSearchTerm={this.handleSearchTerm} searchTerm={this.state.searchTerm} />} />
          </Switch>
        </div>
        <div className="scroll-to-top">
          <button onClick={() => this.scrollToTop()}><FontAwesomeIcon icon="long-arrow-alt-up" /></button>
        </div>
      </div>
    );
  }
}

export default ControlPanelContent;