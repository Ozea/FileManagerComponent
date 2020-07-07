import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import './Panel.scss';

class Panel extends Component {
  state = {
    smallNavigationClass: 'small-navigation hidden',
    user: window.GLOBAL.App.user
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
    const { topPanel, fileManagerKey, softaculous, firewallSystem } = window.GLOBAL.App;

    return (
      <div className="panel-wrapper">
        <div className="top-panel">
          <div className="container left-menu">
            <div className="logo">LOGO</div>
            <div className={this.className("/list/package/")}><Link to="/list/package/">{topPanel.PACKAGES}</Link></div>
            <div className={this.className("/list/ip/")}><Link to="/list/ip/">{topPanel.IP}</Link></div>
            <div className={this.className("/list/rrd/")}><Link to="/list/rrd/">{topPanel.GRAPHS}</Link></div>
            <div className={this.className("/list/stats/")}><Link to="/list/stats/">{topPanel.STATISTICS}</Link></div>
            <div className={this.className("/list/log/")}><Link to="/list/log/">{topPanel.LOG}</Link></div>
            <div className={this.className("/list/updates/")}><Link to="/list/updates/">{topPanel.UPDATES}</Link></div>
            {firewallSystem && <div className={this.className("/list/firewall/")}><Link to="/list/firewall/">{topPanel.FIREWALL}</Link></div>}
            {fileManagerKey && <div className="fm"><a href="/list/directory/">{topPanel.FILE_MANAGER}</a></div>}
            {softaculous === "yes" && <div><a href="/list/softaculous/">{topPanel.APPS}</a></div>}
            <div className={this.className("/list/server/")}><Link to="/list/server">{topPanel.SERVER}</Link></div>
          </div>
          <div className="container profile-menu">
            <div className="bell">
              <FontAwesomeIcon icon="bell" />
            </div>
            <div><a href={`/edit/user?user=${user}`}>{user}</a></div>
            <div><a href="/logout">{window.GLOBAL.App.userI18N.LOG_OUT}</a></div>
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
            <div><a href="/logout">{window.GLOBAL.App.userI18N.LOG_OUT}</a></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Panel;