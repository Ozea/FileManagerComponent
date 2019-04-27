import React, { Component } from 'react';
import Path from '../../Path/Path';
import Row from '../Row/Row';
import '../List.css';

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
      if (i === 0) {
        return;
      }

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
      this.props.cursorChangeHandler(this.state.cursor);
      this.props.handleNameOnButton();
    }

    if (e.keyCode === 38) {
      if (cursor === 0) {
        return;
      }

      if (e.shiftKey) {
        this.addToSelection(cursor)
      }

      this.setState({ cursor: cursor - 1 });
      this.props.cursorChangeHandler(this.state.cursor);
      this.props.handleNameOnButton();
    }
  }

  rows = () => {
    const { data, isActive } = this.props;
    const { cursor } = this.state;
    return (
      data.listing.map((item, key) =>
        (key !== 0) ?
        (<Row key={key}
          multipleSelectionOnClick={() => this.addToSelection(key)}
          glyph={this.handleGlyphIcon(item.type)}
          name={item.name}
          handleCursor={(name, rights) => {
            this.setState({ cursor: key });
            this.props.cursorChangeHandler(key);
            this.props.handleNameOnClick(name, rights);
          }}
          active={key === cursor}
          selected={this.isSelected(key)}
          activeList={isActive}
          owner={item.owner}
          permissions={item.permissions}
          size={item.size} />) :
        (<Row key={key} glyph={this.handleGlyphIcon(item.type)} name=".." handleCursor={() => {this.setState({ cursor: key }); this.props.cursorChangeHandler(key)}} active={key === cursor} activeList={isActive} />))
    );
  }

  render() {
    const { isActive } = this.props;
    return (
      <div className={isActive ? "list active" : "list"} onClick={this.handleClick}>
        <Path class={isActive ? "active-path" : "path"} />
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
