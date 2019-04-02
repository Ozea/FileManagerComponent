import React, { Component } from 'react';
import Head from '../Path';
import Row from './Row';
import Menu from '../Panels/Menu';
import '../../App.css';

class RightList extends Component {
  state = {
    selection: [],
    cursor: 0
  }

  handleClick = () => {
    this.props.onClick(this.props.list);
  }

  isSelected = (i) => {
    return this.state.selection.indexOf(i) !== -1;
  }

  handleGlyphIcon = (type) => {
    switch (type) {
      case 'd': return (
        <span className="glyphicon glyphicon-folder-close"></span>
      );
      case 'f': return (
        <span className="glyphicon glyphicon-file"></span>
      );
      default:
        break;
    }
  }

  addToSelection(i) {
    const { selection } = this.state;
    const result = [...selection];
    const duplicate = selection.indexOf(i);
    if (duplicate !== -1) {
      result.splice(duplicate, 1);
    } else {
      result.push(i)
    }

    this.setState({ selection: result });
  }

  handleLiSelection = (e) => {
    const { data, isActive } = this.props;
    const { cursor } = this.state;

    if (!isActive) {
      return;
    }

    if (e.keyCode === 40) {
      if (cursor === data.listing.length - 1) {
        return;
      }
      if (e.shiftKey) {
        this.addToSelection(cursor)
      }

      this.setState({ cursor: cursor + 1 });
    }

    if (e.keyCode === 38) {
      if (cursor === 0) {
        return;
      }
      if (e.shiftKey) {
        this.addToSelection(cursor - 1)
      }

      this.setState({ cursor: cursor - 1 });
    }
  }

  deleteSelectedFile = () => {
    this.props.deleteFile(this.state.cursor);
  }

  addNewFile = () => {
    this.props.addNewFile();
  }

  componentDidMount = () => {
    document.addEventListener("keydown", (e) => this.handleLiSelection(e));
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", (e) => this.handleLiSelection(e));
  }

  render() {
    const { isActive, data } = this.props;
    const { cursor } = this.state;
    let className = isActive ? "right-list active" : "right-list"
    return (
      <div className={className} onClick={this.handleClick}>
        <Head class={isActive ? "active-head" : "head"} />
        <Menu 
          handleDelete={this.deleteSelectedFile}
          handleAddNewFile={this.addNewFile}
          isActive={isActive} />
        <div className="list-container">
          <ul>
            {data.listing.map((item, key) =>
              <Row key={key}
              glyph={this.handleGlyphIcon(item.type)}
              name={item.name}
              handleCursor={() => this.setState({ cursor: key })}
              active={key === cursor}
              selected={this.isSelected(key)}
              activeList={isActive}
              owner={item.owner}
              permissions={item.permissions}
              size={item.size} />)}
          </ul>
        </div>
      </div>
    );
  }
}

export default RightList;