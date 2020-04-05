import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Toolbar.scss';

class Toolbar extends Component {
  state = {
    toolbarHeight: 205
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleToolbar);
    document.addEventListener("scroll", this.changeToolbarHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleToolbar);
    document.removeEventListener("scroll", this.changeToolbarHeight);
  }

  handleToolbar = () => {
    if (document.documentElement.clientWidth < 900) {
      this.setState({
        toolbarHeight: 115
      });
    } else {
      this.setState({
        toolbarHeight: 205
      });
    }
  }

  changeToolbarHeight = () => {
    if (document.documentElement.clientWidth > 900) {
      let scrollTop = window.scrollY;
      let toolbarHeight = Math.max(115, 205 - scrollTop);
      this.setState({ toolbarHeight });
    }
  }

  className = () => {
    return this.state.toolbarHeight === 115 ? "toolbar t-shadow" : "toolbar";
  }

  leftMenuClassName = () => {
    if (!this.props.showLeftMenu) {
      return "l-menu none";
    } else {
      return "l-menu";
    }
  }

  style = () => {
    if (this.props.mobile) {
      return;
    }

    if (document.documentElement.clientWidth > 900) {
      return { marginTop: this.state.toolbarHeight };
    } else {
      return { marginTop: 145 };
    }
  }

  toggleAll = () => {
    this.props.toggleAll();
  }

  render() {
    return (
      <div className={this.className()} style={this.style()}>
        <div className={this.leftMenuClassName()}>
          <button>
            <FontAwesomeIcon icon="plus" />
            <span className="add">{this.props.buttonName}</span>
          </button>
        </div>

        <div className="r-menu">
          <div className="input-group input-group-sm">

            <div className="input-group-prepend">
              <div className="input-group-text">
                <input type="checkbox" onChange={this.toggleAll} aria-label="Checkbox for following text input" id="checkbox" />
              </div>
              <span className="input-group-text">
                <label htmlFor="checkbox">Toggle all</label>
              </span>
            </div>

            <select className="custom-select" id="inputGroupSelect04">
              <option defaultValue="Apply to selected">Apply to selected</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                <FontAwesomeIcon icon="angle-right" />
              </button>
            </div>

            <div className="btn-group">
              <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
                <div role="separator" className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Separated link</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Toolbar;