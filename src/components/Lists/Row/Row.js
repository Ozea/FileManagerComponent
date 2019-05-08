import React, { Component } from 'react';
import './Row.scss';

class Row extends Component {

  previewOnEnter = (e) => {
    const { active, name, type, activeList, modalVisible } = this.props;

    if (modalVisible) {
      return;
    }

    if (activeList && active && e.keyCode === 13) {
      this.props.preview(type, name);
    }
  }

  previewOnClick = (type, name) => {
    this.props.preview(type, name);
  }

  setPhotoGallery = (name) => {
    if ( name.match('.jpg') ){
      this.props.setGallery(name);
    }
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.previewOnEnter);
    this.setPhotoGallery(this.props.name);
  }

  onClick = (e) => {
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
    const { type, name } = this.props;
    if (type === 'd') {
      return (<span className="glyphicon glyphicon-folder-close"></span>);
    } else if (type === 'f') {
      if (name.match('.jpg') !== null) {
        return (<span className="glyphicon glyphicon-picture"></span>);
      } else if (name.match('.mp4') !== null) {
        return (<span className="glyphicon glyphicon-film"></span>);
      }
      return (<span className="glyphicon glyphicon-file"></span>);
    }
  }

  render() {
    const { name, owner, permissions, size, date, time, type, active, selected } = this.props;
    return (
      <li className={this.liClassName(active, selected)} onClick={this.onClick} >
        <span>{this.glyph()}</span>
        <span className="fName" onClick={() => this.previewOnClick(type, name)}>{name}</span>
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