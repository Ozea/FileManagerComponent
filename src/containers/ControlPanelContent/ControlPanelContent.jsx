import React, { Component } from 'react';
import DomainNameSystems from '../DomainNameSystems/DomainNameSystems';
import InternetProtocols from '../InternetProtocols/InternetProtocols';
import Databases from '../../containers/Databases/Databases';
import CronJobs from '../../containers/CronJobs/CronJobs';
import RRDs from '../../containers/RRDs/RRDs';
import Packages from '../../containers/Packages/Packages';
import MainNav from '../../components/MainNav/MainNav';
import Users from '../../containers/Users/Users';
import { Route, Switch } from "react-router-dom";
import Web from '../../containers/Web/Web';
import Backups from '../Backups/Backups';
import './ControlPanelContent.scss';

class ControlPanelContent extends Component {
  render() {
    return (
      <div>
        <MainNav />
        <div className="content">
          <Switch>
            <Route path="/list/packages" component={Packages} />
            <Route path="/list/ip" component={InternetProtocols} />
            <Route path="/list/rrd" component={RRDs} />
            <Route path="/list/user" component={Users} />
            <Route path="/list/web" component={Web} />
            <Route path="/list/dns" component={DomainNameSystems} />
            <Route path="/list/db" component={Databases} />
            <Route path="/list/cron" component={CronJobs} />
            <Route path="/list/backup" component={Backups} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default ControlPanelContent;