import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Toolbar.scss';

class Toolbar extends Component {
  className = () => {
    return this.props.toolbarHeight === 115 ? "toolbar t-shadow" : "toolbar";
  }

  style = () => {
    if (this.props.mobile) {
      return;
    }

    if (document.documentElement.clientWidth > 900) {
      return { marginTop: this.props.toolbarHeight };
    } else {
      return { marginTop: 145 };
    }
  }

  render() {
    return (
      <div className={this.className()} style={this.style()}>
        <div className="l-menu">
          <button>
            <FontAwesomeIcon icon="plus" />
          </button>
        </div>
        
        <div className="r-menu">
          <div className="input-group input-group-sm">

            <div className="input-group-prepend">
              <div className="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" id="checkbox" />
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