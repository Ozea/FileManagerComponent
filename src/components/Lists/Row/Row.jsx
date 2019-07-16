import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Row.scss';

class Row extends Component {

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleEnterButton);
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleEnterButton);
  }

  handleEnterButton = (e) => {
    const { activeRow, name, type, isActiveList, modalVisible, openDirectory, cursor, download, path } = this.props;

    if (modalVisible || !activeRow || !isActiveList) {
      return;
    }

    if (e.keyCode === 13) {
      if (this.isArchive(name)) {
        download();
      } else if (this.isFile(type) && cursor !== 0) {
        this.preview(path, name);
      } else if (type === "l") {
        download();
      } else {
        openDirectory(name);
      }
    }
  }

  preview = (path, name) => {
    this.props.history.push({
      pathname: '/list/directory/preview/',
      search: `?path=${path}/${name}`
    });
  }

  handleItemClick = () => {
    const { type, name, openDirectory, download, path, isActiveList } = this.props;

    if (!isActiveList) {
      return;
    }

    if (this.isArchive(name)) {
      return download();
    } else if (this.isFile(type)) {
      return this.preview(path, name);
    } else if (this.isDirectory(type)) {
      return openDirectory(name);
    } else if (type === "l" || name.match('.mp4')) {
      return download();
    }
  }

  handleClick = (e) => {
    const { name, selectMultiple, passData, permissions, cursor } = this.props;

    if (e.ctrlKey && cursor !== 0) {
      selectMultiple();
    }

    passData(name, permissions);
  }

  className = () => {
    const { activeRow, selected, isActiveList } = this.props;

    if (isActiveList) {
      let isActive = activeRow ? 'active' : '';
      let isSelected = selected ? 'selected' : '';
      return isActive.length ? isActive : isSelected;
    } else {
      let isActive = activeRow ? 'inactive' : '';
      let isSelected = selected ? 'inactive-selected' : '';
      return isActive.length ? isActive : isSelected;
    }
  }

  sizeFormatter = (bytes, decimals) => {
    if (bytes === undefined || this.props.type === "d") {
      return null;
    };

    if (bytes === "0") {
      return <span className="value">0 <span className="unit">b</span></span>;
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

    let date = new Date(fDate),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      getDay = date.getDate(),
      getMonth = months[date.getMonth()];
    return (<span className="date">{getMonth} {getDay}</span>);
  }

  glyph = () => {
    const { type, name } = this.props;

    if (this.isArchive(name)) {
      return (<span className="glyphicon glyphicon-book"></span>);
    }

    if (this.isDirectory(type)) {
      return (<span className="glyphicon glyphicon-folder-open"></span>);
    } 
    
    if (this.isFile(type)) {
      if (this.isPhoto(name)) {
        return (<span className="glyphicon glyphicon-picture"></span>);
      } else if (this.isVideo(name)) {
        return (<span className="glyphicon glyphicon-download-alt"></span>);
      } else if (name.match('.txt')) {
        return (<i className="fas fa-file-alt"></i>);
      } else if (name.match('.js')) {
        return (<i className="fab fa-js-square"></i>);
      } else if (name.match('.html')) {
        return (<i className="fab fa-html5"></i>);
      } else if (name.match('.php')) {
        return (<i className="fab fa-php"></i>);
      } if (name.match(/.scss/i)) {
        return (<i className="fab fa-sass"></i>);
      } else if (name.match(/.css/i)) {
        return (<i className="fab fa-css3"></i>);
      } else {
      return (<span className="glyphicon glyphicon-file"></span>);
      }
    } 
    
    if (type === "l") {
      return (<span className="glyphicon glyphicon-download-alt"></span>);
    }
  }

  isPhoto(name) {
    return name.match(/png|jpg|jpeg|gif/g);
  }

  isVideo(name) {
    return name.match('.mp4') !== null;
  }

  isArchive(name) {
    return name.match(/zip|tgz|tar.gz|gzip|tbz|tar.bz|gz|zip|tar|rar/g);
  }

  isDirectory(type) {
    return type === 'd';
  }

  isFile(type) {
    return type === 'f';
  }

  render() {
    const { name, owner, permissions, size, date, time } = this.props;
    return (
      <li className={this.className()} onClick={this.handleClick} >
        {this.glyph()}
        <span className="fName"><span className="name" onClick={this.handleItemClick}>{name}</span></span>
        <span className="fPermissions">{permissions}</span>
        <span className="fOwner">{owner}</span>
        <span className="fSize">{this.sizeFormatter(size)}</span>
        <span className="fDate">{this.dateFormatter(date)}</span>
        <span className="fTime">{time}</span>
      </li>
    );
  }
}

export default withRouter(Row);