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
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleLiSelection);
  }

  removeSelection = () => {
    this.setState({ selection: [], cursor: 0 });
  }

  onClick = () => {
    this.props.onClick(this.props.list);
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
        search: `?path=/home/admin/${name === '' ? '..' : name}`
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
      handleDataOnButton(this.state.cursor);
      let name = data.listing[this.state.cursor].name;
      let type = data.listing[this.state.cursor].type;
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
      handleDataOnButton(this.state.cursor);
      let name = data.listing[this.state.cursor].name;
      let type = data.listing[this.state.cursor].type;
      this.changeQuery(name, type);
    }
  }

  preview = (type, name) => {
    const { history } = this.props.history;
    if (type === 'f') {
      if (name.match('.jpg')) {
        return history.push({ pathname: `/preview`, search: `?path=/home/admin/${name}`, state: { gallery: this.getPhotos(), type: 'photo' } });
      } else if (name.match('.mp4')) {
        return history.push({ pathname: `/preview`, search: `?path=/home/admin/${name}`, state: { type: 'video' } });
      } else {
        return history.push({ pathname: `/preview`, search: `?path=/home/admin/${name}`, state: { type: 'editor' } });
      }
    }
  }

  getPhotos = () => {
    const { data: { listing } } = this.props;
    return listing.filter(this.isPhoto).map(item => item.name);
  }

  isPhoto = (item) => {
    return item.name.match('.jpg');
  }

  rows = () => {
    const { data, isActive, handleDataOnClick, handleDataOnButton, modalVisible } = this.props;
    const { cursor } = this.state;
    return (
      data.listing.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name)).map((item, key) =>
        (key !== 0) ?
          (<Row key={key}
            modalVisible={modalVisible}
            multipleSelectionOnClick={() => this.addToSelection(key)}
            type={item.type}
            name={item.name}
            handleCursor={(name, rights) => {
              this.setState({ cursor: key });
              handleDataOnButton(key);
              handleDataOnClick(name, rights);
            }}
            active={key === cursor}
            selected={this.isSelected(key)}
            activeList={isActive}
            owner={item.owner}
            permissions={item.permissions}
            size={item.size}
            date={item.date}
            time={item.time}
            preview={this.preview} />) :
          (<Row key={key}
            modalVisible={modalVisible}
            multipleSelectionOnClick={() => this.addToSelection(key)}
            type={item.type}
            name=".."
            handleCursor={() => {
              this.setState({ cursor: key });
              handleDataOnButton(key)
            }}
            active={key === cursor}
            activeList={isActive}
            preview={this.preview} />))
    );
  }

  render() {
    const { isActive } = this.props;
    return (
      <div className={isActive ? "list active" : "list"} onClick={this.onClick}>
        <Path class={isActive ? "active-path" : "path"} />
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
