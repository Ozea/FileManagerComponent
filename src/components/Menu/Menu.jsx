import React, { Component } from 'react';
import './Menu.scss';

class Menu extends Component {

  componentDidMount = () => {
    document.addEventListener("keydown", this.hotKeys);
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.hotKeys);
  }

  newFile = () => {
    this.props.openModal("Add file");
  }

  newDirectory = () => {
    this.props.openModal("Add directory");
  }

  delete = () => {
    const { selection, openModal, cursor } = this.props;
    if (selection.length === 0) {
      if (cursor === 0) {
        openModal("Nothing selected");
      } else {
        openModal("Delete");
      }
    } else {
      openModal("Delete", selection.length);
    }
  }

  rename = () => {
    if (this.props.cursor === 0) {
      this.props.openModal("Nothing selected");
    } else {
      this.props.openModal("Rename");
    }
  }

  permissions = () => {
    if (this.props.cursor === 0) {
      this.props.openModal("Nothing selected");
    } else {
      this.props.openModal("Permissions");
    }
  }

  move = () => {
    const { selection, openModal, cursor } = this.props;
    if (selection.length === 0) {
      if (cursor === 0) {
        openModal("Nothing selected");
      } else {
        openModal("Move");
      }
    } else {
      openModal("Move", selection.length);
    }
  }

  archive = () => {
    if (this.props.cursor === 0) {
      this.props.openModal("Nothing selected");
    } else {
      this.props.openModal("Archive");
    }
  }

  extract = () => {
    if (this.props.cursor === 0) {
      this.props.openModal("Nothing selected");
    } else {
      this.props.openModal("Extract");
    }
  }

  copy = () => {
    const { selection, openModal, cursor } = this.props;
    if (selection.length === 0) {
      if (cursor === 0) {
        openModal("Nothing selected");
      } else {
        openModal("Copy");
      }
    } else {
      openModal("Copy", selection.length);
    }
  }

  hotKeys = (e) => {
    if (this.props.modalVisible) {
      return;
    }

    switch (e.keyCode) {
      case 112: return this.newFile();
      case 113: return this.newDirectory();
      case 114: return this.rename();
      case 115: return this.permissions();
      case 116: return this.delete();
      default: break;
    }
  }

  render() {
    return (
      <div className="btn-group" role="group" aria-label="First group">
        <button type="button" className="btn btn-light">Upload</button>
        <button type="button" className="btn btn-light" onClick={this.newFile}>New file</button>
        <button type="button" className="btn btn-light" onClick={this.newDirectory}>New dir</button>
        <button type="button" className="btn btn-light">Download</button>
        <button type="button" className="btn btn-light" onClick={this.rename}>Rename</button>
        <button type="button" className="btn btn-light" onClick={this.permissions}>Permissions</button>
        <button type="button" className="btn btn-light" onClick={this.copy}>Copy</button>
        <button type="button" className="btn btn-light" onClick={this.move}>Move</button>
        <button type="button" className="btn btn-light" onClick={this.archive}>Archive</button>
        {this.props.name.match('.tar.gz') ? <button type="button" className="btn btn-light" onClick={this.extract}>Extract</button> : null}
        <button type="button" className="btn btn-light" onClick={this.delete} >Delete</button>
      </div>
    );
  }
}

export default Menu;