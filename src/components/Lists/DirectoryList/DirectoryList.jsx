import React, { Component } from 'react';
import Path from '../../Path/Path';
import Row from '../Row/Row';
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

  moveCursorOnPreviousRow = (prevCursor) => {
    let cursor = prevCursor - 1;
    let { name, permissions } = this.props.data.listing[cursor];
    this.props.passData(cursor, name, permissions);
    this.setState({ cursor });
  }

  removeSelection = () => {
    this.setState({ selection: [], cursor: 0 });
    let { name, permissions } = this.props.data.listing[this.state.cursor];
    this.props.passData(this.state.cursor, name, permissions);
  }

  toggleActiveList = () => {
    const { history: { history }, path, list, onClick, changePath, isActive } = this.props;

    if (!isActive) {
      onClick(list);
      changePath(path);
      history.push({
        pathname: '/list/directory/',
        search: `?path=${path}`
      });
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
      if (i === "") {
        return;
      }

      result.push(i)
    }

    this.setState({ selection: result });
    this.props.passSelection(result);
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
        let name = data.listing[cursor].name;
        this.addToSelection(name);
      }

      this.setState({ cursor: cursor + 1 });
      const { name, permissions } = data.listing[this.state.cursor];
      passData(this.state.cursor, name, permissions);
      this.props.changePath(this.props.path);
    }

    if (e.keyCode === 38) {
      if (cursor === 0) {
        return;
      }

      if (e.shiftKey) {
        let name = data.listing[cursor].name;
        this.addToSelection(name);
      }

      this.setState({ cursor: cursor - 1 });
      const { name, permissions } = data.listing[this.state.cursor];
      passData(this.state.cursor, name, permissions);
      this.props.changePath(this.props.path);
    }
  }

  openDirectory = (name) => {
    const { history: { history }, path, addToPath, openDirectory } = this.props;
    history.push({
      pathname: '/list/directory/',
      search: `?path=${path}/${name}`
    });
    addToPath(name);
    openDirectory();
    this.setState({ cursor: 0 });
  }

  openCertainDirectory = (path) => {
    const { history: { history }, openCertainDirectory, changePath } = this.props;

    history.push({
      pathname: '/list/directory/',
      search: `?path=${path}`
    });
    changePath(path);
    openCertainDirectory(path);
  }

  moveBack = () => {
    if (this.props.path === '/home/admin') {
      return;
    }

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
    const { data, isActive, passData, modalVisible, path, download, history: { history } } = this.props;
    const { cursor } = this.state;
    return (
      data.listing.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name)).map((item, key) =>
        (key !== 0 && data.listing.length !== 0) ?
          (<Row key={key}
            modalVisible={modalVisible}
            selectMultiple={() => this.addToSelection(item.name)}
            type={item.type}
            name={item.name}
            passData={(name, permissions) => {
              this.setState({ cursor: key });
              passData(key, name, permissions);
            }}
            activeRow={key === cursor}
            cursor={key}
            selected={this.isSelected(item.name)}
            isActiveList={isActive}
            owner={item.owner}
            permissions={item.permissions}
            size={item.size}
            date={item.date}
            time={item.time}
            path={path}
            history={history}
            download={download}
            openDirectory={this.openDirectory}
            preview={this.preview} />) :
          (<Row key={key}
            modalVisible={modalVisible}
            type={item.type}
            path={path}
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
        <Path class={isActive ? "active-path" : "path"} path={path} openDirectory={this.openCertainDirectory} />
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
