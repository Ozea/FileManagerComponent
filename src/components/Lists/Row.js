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
    const { glyph, name, owner, permissions, size } = this.props;
    return (
      <li className={this.liClassName(this.props.active, this.props.selected)} onClick={this.handleCursor} >
        <span>{glyph}</span>
        <span className="fName">{name}</span>
        <span className="fPermissions">{permissions}</span>
        <span className="fOwner">{owner}</span>
        <span className="fSize">{size}</span>
      </li>
    );
  }
}

export default Row;