import React, { Component } from 'react';
import Path from '../../Path/Path';
import Row from '../Row/Row';
import * as FM from '../../../LocalAPI';
import '../List.scss';

class DirectoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: [],
      cursor: 0
    }
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleLiSelection);
    document.addEventListener("keydown", this.moveBackOnBackspace);
    this.setCursorOnWindowLoad();
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleLiSelection);
    document.removeEventListener("keydown", this.moveBackOnBackspace);
  }

  moveBackOnBackspace = (e) => {
    if (e.keyCode === 8 && !this.props.modalVisible && this.props.isActive) {
      this.moveBack();
    }
  }

  setCursorOnWindowLoad = () => {
    const { history, data, passData, isActive } = this.props;
    let fName = history.location.search.split('/').pop();
    let arrayIndex = data.listing.findIndex(item => item.name === fName);
    let cursor = arrayIndex === -1 ? 0 : arrayIndex;
    let permissions = data.listing[cursor].permissions;
    if (isActive) {
      this.setState({ cursor });
      passData(cursor, fName, permissions);
    }
  }

  moveCursorOnPreviousRow = (prevCursor) => {
    let cursor = prevCursor - 1;
    let { name, permissions} = this.props.data.listing[cursor];
    this.props.passData(cursor, name, permissions);
    this.setState({ cursor });
  }

  removeSelection = () => {
    this.setState({ selection: [], cursor: 0 });
    let { name, permissions } = this.props.data.listing[this.state.cursor];
    this.props.passData(this.state.cursor, name, permissions);
  }

  toggleActiveList = () => {
    if (!this.props.isActive) {
      this.props.onClick(this.props.list);
    }
  }

  isSelected = (i) => {
    return this.state.selection.indexOf(i) !== -1;
  }

  addToSelection(i) {
    const { selection } = this.state;
    const result = [...selection];
    const duplicate = selection.indexOf(i);
    if (duplicate !== -1) {
      result.splice(duplicate, 1);
    } else {
      if (i === 0) {
        return;
      }

      result.push(i)
    }

    this.setState({ selection: result });
    this.props.passSelection(result);
  }

  changeQuery = (name, type) => {
    if (type === 'f') {
      this.props.history.history.push({
        pathname: '/',
        search: `?path=${FM.getDirectoryPath()}/${name === '' ? '..' : name}`
      });
    }
  }

  handleLiSelection = (e) => {
    const { data, isActive, passData, modalVisible } = this.props;
    const { cursor } = this.state;

    if (!isActive || modalVisible) {
      return;
    }

    if (e.keyCode === 40) {
      if (cursor === data.listing.length - 1) {
        return;
      }

      if (e.shiftKey) {
        this.addToSelection(cursor);
      }

      this.setState({ cursor: cursor + 1 });
      const { name, type, permissions } = data.listing[this.state.cursor];
      passData(this.state.cursor, name, permissions);
      this.changeQuery(name, type);
    }

    if (e.keyCode === 38) {
      if (cursor === 0) {
        return;
      }

      if (e.shiftKey) {
        this.addToSelection(cursor);
      }

      this.setState({ cursor: cursor - 1 });
      const { name, type, permissions } = data.listing[this.state.cursor];
      passData(this.state.cursor, name, permissions);
      this.changeQuery(name, type);
    }
  }

  preview = (type, name) => {
    const { history } = this.props.history;
    if (type === 'f') {
      if (name.match('.jpg')) {
        return history.push({ pathname: `/preview`, search: `?path=${FM.getDirectoryPath()}/${name}`, state: { type: 'photo', gallery: this.getPhotos() } });
      } else if (name.match('.mp4')) {
        return history.push({ pathname: `/preview`, search: `?path=${FM.getDirectoryPath()}/${name}`, state: { type: 'video' } });
      } else {
        return history.push({ pathname: `/preview`, search: `?path=${FM.getDirectoryPath()}/${name}`, state: { type: 'editor' } });
      }
    }
  }

  openDirectory = (name) => {
    const { history: { history }, path, addToPath, list } = this.props;
    history.push({
      pathname: '/',
      search: `?path=${path}/${name}`
    });
    addToPath(name);
    FM.openDirectory(list);
    this.setState({ cursor: 0 });
  }

  moveBack = () => {
    this.props.moveBack();
    this.setState({ cursor: 0 });
  }

  getPhotos = () => {
    const { data: { listing } } = this.props;
    return listing.filter(this.isPhoto).map(item => item.name);
  }

  isPhoto = (item) => {
    return item.name.match('.jpg');
  }

  rows = () => {
    const { data, isActive, passData, modalVisible } = this.props;
    const { cursor } = this.state;
    return (
      data.listing.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name)).map((item, key) =>
        (key !== 0) ?
          (<Row key={key}
            modalVisible={modalVisible}
            selectMultiple={() => this.addToSelection(key)}
            type={item.type}
            name={item.name}
            passData={(name, permissions) => {
              this.setState({ cursor: key });
              passData(key, name, permissions);
            }}
            activeRow={key === cursor}
            cursor={key}
            selected={this.isSelected(key)}
            isActiveList={isActive}
            owner={item.owner}
            permissions={item.permissions}
            size={item.size}
            date={item.date}
            time={item.time}
            openDirectory={this.openDirectory}
            preview={this.preview} />) :
          (<Row key={key}
            modalVisible={modalVisible}
            type={item.type}
            name=".."
            cursor={key}
            passData={(name) => {
              this.setState({ cursor: key });
              passData(key, name)
            }}
            activeRow={key === cursor}
            openDirectory={this.moveBack}
            isActiveList={isActive} />))
    );
  }

  render() {
    const { isActive, path } = this.props;
    return (
      <div className={isActive ? "list active" : "list"} onClick={this.toggleActiveList}>
        <Path class={isActive ? "active-path" : "path"} path={path} />
        <div className="head">
          <span className="permissions">Permissions</span>
          <span className="owner">Owner</span>
          <span className="size">Size</span>
          <span className="date">Date</span>
          <span className="time">Time</span>
          <span className="name">Name</span>
        </div>
        <div className="list-container">
          <ul>
            {this.rows()}
          </ul>
        </div>
      </div>
    );
  }
}

export default DirectoryList;
