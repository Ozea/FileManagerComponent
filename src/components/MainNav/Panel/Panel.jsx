import React, { Component } from 'react';
import { getUsersList } from '../../../ControlPanelService/Users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notifications from './Notifications/Notifications';
import { Link } from "react-router-dom";
import './Panel.scss';

const { i18n, user, fileManagerKey, softaculous, firewallSystem } = window.GLOBAL.App;

class Panel extends Component {
  state = {
    smallNavigationClass: 'small-navigation hidden',
    user
  }

  componentDidMount() {
    this.getToken();
  }

  getToken = () => {
    getUsersList()
      .then(res => localStorage.setItem("token", res.data.token))
      .catch()
  }

  toggleNavigation = () => {
    this.props.showTopNav();

    if (this.state.smallNavigationClass === 'small-navigation hidden') {
      this.setState({ smallNavigationClass: 'small-navigation show' });
    } else {
      this.setState({ smallNavigationClass: 'small-navigation hidden' });
    }
  }

  className = (activeName) => {
    let path = window.location.pathname;

    if (path === activeName) {
      return "top-link active";
    }

    return "top-link";
  }

  render() {
    const { user } = this.state;

    return (
      <div className="panel-wrapper">
        <div className="top-panel">
          <div className="container left-menu">
            <div className="logo">
              <Link to="/list/user/">
                <img src="/images/logo.png" alt="LOGO" />
              </Link>
            </div>
            <div className={this.className("/list/package/")}><Link to="/list/package/">{i18n.Packages}</Link></div>
            <div className={this.className("/list/ip/")}><Link to="/list/ip/">{i18n.IP}</Link></div>
            <div className={this.className("/list/rrd/")}><Link to="/list/rrd/">{i18n.Graphs}</Link></div>
            <div className={this.className("/list/stats/")}><Link to="/list/stats/">{i18n.Statistics}</Link></div>
            <div className={this.className("/list/log/")}><Link to="/list/log/">{i18n.Log}</Link></div>
            <div className={this.className("/list/updates/")}><Link to="/list/updates/">{i18n.Updates}</Link></div>
            {firewallSystem && <div className={this.className("/list/firewall/")}><Link to="/list/firewall/">{i18n.Firewall}</Link></div>}
            {fileManagerKey && <div className="fm"><a href="/list/directory/">{i18n['File Manager']}</a></div>}
            {softaculous === "yes" && <div><a href="/list/softaculous/">{i18n.Apps}</a></div>}
            <div className={this.className("/list/server/")}><Link to="/list/server/">{i18n.Server}</Link></div>
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
          <div className="container hamburger" onClick={this.toggleNavigation}>
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
}

export default Panel;