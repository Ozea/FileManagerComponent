import React, { Component } from 'react';
import DomainNameSystems from '../DomainNameSystems/DomainNameSystems';
import Databases from '../../containers/Databases/Databases';
import MainNav from '../../components/MainNav/MainNav';
import Users from '../../containers/Users/Users';
import { Route, Switch } from "react-router-dom";
import Web from '../../containers/Web/Web';
import './ControlPanelContent.scss';

class ControlPanelContent extends Component {
  render() {
    return (
      <div>
        <MainNav />
        <div className="content">
          <Switch>
            <Route path="/list/user" component={Users} />
            <Route path="/list/web" component={Web} />
            <Route path="/list/dns" component={DomainNameSystems} />
            <Route path="/list/db" component={Databases} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default ControlPanelContent;