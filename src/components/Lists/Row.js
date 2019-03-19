import React, { Component } from 'react';
import '../../App.css';

class Row extends Component {

  handleCursor = () => {
    this.props.handleCursor(this.props.name);
  }

  liClassName = (active, selected) => {
    if (this.props.activeList) {
      let isActive = active ? 'active' : '';
      let isSelected = selected ? 'selected' : '';
      return isActive.length ? isActive : isSelected;
    } else{
      let isActive = active ? 'active' : '';
      return isActive.length ? 'inactive' : null;
    }
  }

  render() {
    return (
      <li className={this.liClassName(this.props.active, this.props.selected)} onClick={this.handleCursor} >
        {this.props.glyph}
        {this.props.name}
      </li>
    );
  }
}

export default Row;