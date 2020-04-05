import React, { Component } from 'react';
import Menu from '../MainNav/Stat-menu/Menu';
import Panel from '../MainNav/Panel/Panel';
import MobileTopNav from '../MainNav/Mobile/MobileTopNav';
import './MainNav.scss';

class MainNav extends Component {
  state = {
    menuHeight: 135,
    showTopNav: false
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleTopNav);
    document.addEventListener("scroll", this.hideMenu);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleTopNav);
    window.removeEventListener("resize", this.hideMenu);
  }

  handleTopNav = () => {
    if (document.documentElement.clientWidth < 900) {
      this.setState({ 
        menuHeight: 45
      });
    } else {
      this.setState({ 
        menuHeight: 135
      });
    }
  }

  hideMenu = () => {
    if (document.documentElement.clientWidth > 900) {
      let scrollTop = window.scrollY;
      let menuHeight = Math.max(45, 135 - scrollTop);
      this.setState({ menuHeight });
    }
  }

  showTopNav = () => {
    let showTopNav = !this.state.showTopNav;
    this.setState({ showTopNav  });
  }

  topNavClassName = () => {
    if (this.state.showTopNav) {
      return "nav-wrapper show-nav";
    } else {
      return "nav-wrapper hide-nav";
    }
  }

  topNavMobile = () => {
    if (this.state.showTopNav) {
      return "mobile-top-nav-wrapper show";
    } else {
      return "mobile-top-nav-wrapper hide";
    }
  }

  topNavigation = () => {
    if (document.documentElement.clientWidth > 900) {
      return (
        <div className={this.topNavClassName()}>
          <Menu menuHeight={this.state.menuHeight} mobile={false} />
        </div>
      );
    } else {
      return <MobileTopNav class={this.topNavMobile()}/>;
    }
  }

  render() {
    return (
      <div className="main-nav">
        <Panel showTopNav={this.showTopNav} visibleNav={this.state.showTopNav} />
        {this.topNavigation()}
      </div>
    );
  }
}

export default MainNav;