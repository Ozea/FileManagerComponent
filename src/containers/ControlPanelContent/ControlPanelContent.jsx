import React, { Component } from 'react';
import './ControlPanelContent.scss';
import Users from '../../containers/Users/Users';
import Web from '../../containers/Web/Web';
import MainNav from '../../components/MainNav/MainNav';
import { Route, Switch } from "react-router-dom";

class ControlPanelContent extends Component {
  render() {
    return (
      <div>
        <MainNav />
        <div className="content">
          <Switch>
            <Route path="/list/user" component={Users} />
            <Route path="/list/web" component={Web} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default ControlPanelContent;