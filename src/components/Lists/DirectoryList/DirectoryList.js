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

  handleLiSelection = (e) => {
    const { data, isActive, handleDataOnButton } = this.props;
    const { cursor } = this.state;

    if (!isActive) {
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
      handleDataOnButton(cursor);
    }

    if (e.keyCode === 38) {
      if (cursor === 0) {
        return;
      }

      if (e.shiftKey) {
        this.addToSelection(cursor);
      }

      this.setState({ cursor: cursor - 1 });
      handleDataOnButton(cursor);
    }
  }

  rows = () => {
    const { data, isActive, handleDataOnClick, handleDataOnButton } = this.props;
    const { cursor } = this.state;
    return (
      data.listing.map((item, key) =>
        (key !== 0) ?
          (<Row key={key}
            multipleSelectionOnClick={() => this.addToSelection(key)}
            glyph={item.type}
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
            time={item.time} />) :
          (<Row key={key}
            multipleSelectionOnClick={() => this.addToSelection(key)}
            glyph={item.type}
            name=".."
            handleCursor={() => {
              this.setState({ cursor: key });
              handleDataOnButton(key)
            }}
            active={key === cursor}
            activeList={isActive} />))
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
