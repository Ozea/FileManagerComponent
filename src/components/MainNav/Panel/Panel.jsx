import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import './Panel.scss';

class Panel extends Component {
  state = {
    smallNavigationClass: 'small-navigation hidden'
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

    if (path === activeName ) {
      return "top-link active";
    }

    return "top-link";
  }

  render() {
    return (
      <div className="panel-wrapper">
        <div className="top-panel">
          <div className="container left-menu">
            <div className="logo">LOGO</div>
            <div className={this.className("/list/packages")}><Link to="/list/packages">Packages</Link></div>
            <div className={this.className("/list/ip")}><Link to="/list/ip">IP</Link></div>
            <div className={this.className("/list/rrd")}><Link to="/list/rrd">Graphs</Link></div>
            <div className={this.className("/list/stats")}><Link to="/list/stats">Statistics</Link></div>
            <div className={this.className("/list/logs")}><Link to="/list/logs">Logs</Link></div>
            <div className={this.className("/list/updates")}><Link to="/list/updates">Updates</Link></div>
            <div>Firewall</div>
            <div className="fm"><Link to="/list/directory">File Manager</Link></div>
            <div><Link to="/list/softaculous">Apps</Link></div>
            <div>Server</div>
          </div>
          <div className="container profile-menu">
            <div className="bell">
              <FontAwesomeIcon icon="bell" />
            </div>
            <div>User</div>
            <div><Link to="/logout">Logout</Link></div>
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
            <div>User</div>
            <div>Logout</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Panel;