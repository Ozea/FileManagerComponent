import React, { Component } from 'react';
import './Row.scss';

class Row extends Component {

  handleClick = (e) => {
    if (e.shiftKey){
      this.props.multipleSelectionOnClick();
    }
    this.props.handleCursor(this.props.name, this.props.permissions);
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

  glyph = () => {
    const { glyph } = this.props;
    if (glyph === 'd') {
      return ( <span className="glyphicon glyphicon-folder-close"></span> );
    } else if (glyph === 'f'){
      return ( <span className="glyphicon glyphicon-file"></span> );
    }
  }

  render() {
    const { name, owner, permissions, size } = this.props;
    return (
      <li className={this.liClassName(this.props.active, this.props.selected)} onClick={this.handleClick} >
        <span>{this.glyph()}</span>
        <span className="fName">{name}</span>
        <span className="fPermissions">{permissions}</span>
        <span className="fOwner">{owner}</span>
        <span className="fSize">{size}</span>
      </li>
    );
  }
}

export default Row;