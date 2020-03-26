import React, { Component } from 'react';
import Toolbar from '../Users/Toolbar/Toolbar';
import Menu from '../Users/Stat-menu/Menu';
import Panel from '../Users/Panel/Panel';
import MobileTopNav from '../MainNav/Mobile/MobileTopNav';
import './MainNav.scss';

class MainNav extends Component {
  state = {
    menuHeight: 135,
    toolbarHeight: 205,
    showTopNav: false
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleTopNav);
    document.addEventListener("scroll", this.hideMenu);
    document.addEventListener("scroll", this.changeToolbarHeight);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleTopNav);
    window.removeEventListener("resize", this.hideMenu);
    document.removeEventListener("scroll", this.changeToolbarHeight);
  }

  handleTopNav = () => {
    if (document.documentElement.clientWidth < 900) {
      this.setState({ 
        menuHeight: 45,
        toolbarHeight: 115
      });
    } else {
      this.setState({ 
        menuHeight: 135,
        toolbarHeight: 205
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

  changeToolbarHeight = () => {
    if (document.documentElement.clientWidth > 900) {
      let scrollTop = window.scrollY;
      let toolbarHeight = Math.max(115, 205 - scrollTop);
      this.setState({ toolbarHeight });
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
          <Toolbar toolbarHeight={this.state.toolbarHeight} mobile={false} />
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