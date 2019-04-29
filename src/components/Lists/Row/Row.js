import React, { Component } from 'react';
import './Row.scss';

class Row extends Component {

  handleClick = (e) => {
    if (e.shiftKey) {
      this.props.multipleSelectionOnClick();
    }
    this.props.handleCursor(this.props.name, this.props.permissions);
  }

  liClassName = (active, selected) => {
    if (this.props.activeList) {
      let isActive = active ? 'active' : '';
      let isSelected = selected ? 'selected' : '';
      return isActive.length ? isActive : isSelected;
    } else {
      let isActive = active ? 'active' : '';
      return isActive.length ? 'inactive' : null;
    }
  }

  sizeFormatter = (bytes, decimals) => {
    if (bytes === undefined) {
      return null;
    };

    if (bytes === 0) {
      return '0 Bytes';
    }

    let k = 1024,
      dm = decimals <= 0 ? 0 : decimals || 2,
      sizes = ['b', 'kb', 'Mb', 'GB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return (<span className="value">{parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} <span className="unit">{sizes[i]}</span></span>);
  }

  dateFormatter = (fDate) => {
    if (fDate === undefined) {
      return null;
    }
    
    let date = new Date(fDate);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let getDay = date.getDate();
    let getMonth = months[date.getMonth()];
    return (<span className="date">{getMonth} {getDay}</span>);
  }

  glyph = () => {
    const { glyph } = this.props;
    if (glyph === 'd') {
      return (<span className="glyphicon glyphicon-folder-close"></span>);
    } else if (glyph === 'f') {
      return (<span className="glyphicon glyphicon-file"></span>);
    }
  }

  render() {
    const { name, owner, permissions, size, date, time } = this.props;
    return (
      <li className={this.liClassName(this.props.active, this.props.selected)} onClick={this.handleClick} >
        <span>{this.glyph()}</span>
        <span className="fName">{name}</span>
        <span className="fPermissions">{permissions}</span>
        <span className="fOwner">{owner}</span>
        <span className="fSize">{this.sizeFormatter(size)}</span>
        <span className="fDate">{this.dateFormatter(date)}</span>
        <span className="fTime">{time}</span>
      </li>
    );
  }
}

export default Row;