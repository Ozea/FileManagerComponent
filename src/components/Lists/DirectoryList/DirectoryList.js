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
    this.setCursor();
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleLiSelection);
  }

  setCursor = () => {
    const { history, data } = this.props;
    let fName = history.location.search.split('/').pop();
    let arrayIndex = data.listing.findIndex(item => item.name === fName);
    let cursor = arrayIndex === -1 ? 0 : arrayIndex;
    this.setState({ cursor });
  }

  handleCursorAfterDeletion = (prevCursor) => {
    let cursor = prevCursor - 1;
    this.setState({ cursor });
  }

  removeSelection = () => {
    this.setState({ selection: [], cursor: 0 });
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

    this.setState({ selection: result }, this.props.handleSelection(result));
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
    const { data, isActive, handleDataOnButton, modalVisible } = this.props;
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
      handleDataOnButton(this.state.cursor, name, permissions);
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
      handleDataOnButton(this.state.cursor, name, permissions);
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
    const { history: { history }, path, changePath } = this.props;
    history.push({
      pathname: '/',
      search: `?path=${path}/${name}`
    });
    changePath(name);
    FM.openDirectory(this.props.list);
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
    const { data, isActive, handleDataOnClick, modalVisible } = this.props;
    const { cursor } = this.state;
    return (
      data.listing.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name)).map((item, key) =>
        (key !== 0) ?
          (<Row key={key}
            modalVisible={modalVisible}
            selectMultiple={() => this.addToSelection(key)}
            type={item.type}
            name={item.name}
            handleDataOnClick={(name, permissions) => {
              this.setState({ cursor: key });
              handleDataOnClick(key, name, permissions);
            }}
            activeRow={key === cursor}
            cursor={key}
            selected={this.isSelected(key)}
            activeList={isActive}
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
            handleDataOnClick={(name) => {
              this.setState({ cursor: key });
              handleDataOnClick(key, name)
            }}
            activeRow={key === cursor}
            activeList={isActive} />))
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
