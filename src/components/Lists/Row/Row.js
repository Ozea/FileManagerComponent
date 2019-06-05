import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as FM from '../../../LocalAPI';
import './Row.scss';

class Row extends Component {

  handleEnterButton = (e) => {
    const { activeRow, name, type, activeList, modalVisible, preview, openDirectory, cursor } = this.props;
    if (modalVisible || !activeRow || !activeList) {
      return;
    }

    if (e.keyCode === 13) {
      if (type === 'f' && cursor !== 0) {
        preview(type, name);
      } else {
        openDirectory(name);
      }
    }
  }

  handleDoubleClick = () => {
    const { type, name, preview, openDirectory, cursor } = this.props;
    if (type === 'f' && cursor !== 0) {
      return preview(type, name);
    } else {
      return openDirectory(name);
    }
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleEnterButton);
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleEnterButton);
  }

  onClick = (e) => {
    const { name, type, selectMultiple, handleDataOnClick, history, permissions, cursor } = this.props;
    if (e.shiftKey && cursor !== 0) {
      selectMultiple();
    }

    handleDataOnClick(name, permissions);

    if (type === 'f') {
      history.push({
        pathname: '/',
        search: `?path=${FM.getDirectoryPath()}/${name}`
      });
    }
  }

  liClassName = () => {
    const { activeRow, selected, activeList } = this.props;
    if (activeList) {
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
    if (name.match('.tar.gz')) {
      return (<span className="glyphicon glyphicon-book"></span>);
    }

    if (type === 'd') {
      return (<span className="glyphicon glyphicon-folder-open"></span>);
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
    const { name, owner, permissions, size, date, time } = this.props;
    return (
      <li className={this.liClassName()} onClick={this.onClick} >
        {this.glyph()}
        <span className="fName" onDoubleClick={this.handleDoubleClick}>{name}</span>
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