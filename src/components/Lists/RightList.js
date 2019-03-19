import React, { Component } from 'react';
import Head from '../Path';
import Row from './Row';
import RightMenu from '../Panels/RightMenu';
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
    const isSelected = this.state.cursor === i;
    if (!this.props.isActive && isSelected) {
      return 'inactive';
    } else {
      return (this.state.selection.indexOf(i) !== -1, isSelected ? 'active' : null);
    }
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

  handleLiSelection = () => {
    const { cursor } = this.state;
    const { data } = this.props;

    document.onkeydown = (e) => {
      if (e.keyCode === 40) {
        if (cursor === data.listing.length - 1) {
          return;
        }
        if (e.shiftKey) {
          this.addToSelection(cursor + 1)
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
      // console.log({code: e.keyCode, shift: e.shiftKey, ctrl: e.ctrlKey});
    }
  }

  render() {
    let className = this.props.isActive ? "right-list active" : "right-list"
    return (
      <div className={className} onClick={this.handleClick}>
        {/* {this.handleLiSelection()} */}
        <Head class={this.props.isActive ? "active-head" : "head"} />
        <RightMenu class={this.props.isActive ? "active-panel panel" : "inactive-panel panel"} />
        <ul>
          {this.props.data.listing.map((item, key) =>
            <Row key={key}
              glyph={this.handleGlyphIcon(item.type)}
              name={item.name}
              handleCursor={() => this.setState({ cursor: key })}
              active={key === this.state.cursor}
              selected={this.isSelected(key)}
              activeList={this.props.isActive} />)}
        </ul>
      </div>
    );
  }
}

export default RightList;