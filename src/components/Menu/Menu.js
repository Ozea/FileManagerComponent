import React, { Component } from 'react';
import './Menu.scss';

class Menu extends Component {

  addNewFileModal = () => {
    this.props.openModal("Add file");
  }

  addNewDirModal = () => {
    this.props.openModal("Add directory");
  }

  onDeleteHandler = () => {
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

  renameHandler = () => {
    if (this.props.cursor === 0) {
      this.props.openModal("Nothing selected");
    } else {
      this.props.openModal("Rename");
    }
  }

  permissionsHandler = () => {
    if (this.props.cursor === 0) {
      this.props.openModal("Nothing selected");
    } else {
      this.props.openModal("Permissions");
    }
  }

  hotKeys = (e) => {
    if (this.props.modalVisible) {
      return;
    }

    switch (e.keyCode) {
      case 112: return this.addNewFileModal();
      case 113: return this.addNewDirModal();
      case 114: return this.renameHandler();
      case 115: return this.permissionsHandler();
      case 116: return this.onDeleteHandler();
      default: break;
    }
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.hotKeys);
  }

  render() {
    return (
      <div className="btn-group" role="group" aria-label="First group">
        <button type="button" className="btn btn-light">Upload</button>
        <button type="button" className="btn btn-light" onClick={this.addNewFileModal}>New file</button>
        <button type="button" className="btn btn-light" onClick={this.addNewDirModal}>New dir</button>
        <button type="button" className="btn btn-light">Download</button>
        <button type="button" className="btn btn-light" onClick={this.renameHandler}>Rename</button>
        <button type="button" className="btn btn-light" onClick={this.permissionsHandler}>Permissions</button>
        <button type="button" className="btn btn-light">Copy</button>
        <button type="button" className="btn btn-light">Move</button>
        <button type="button" className="btn btn-light">Archive</button>
        <button type="button" className="btn btn-light" onClick={this.onDeleteHandler} >Delete</button>
      </div>
    );
  }
}

export default Menu;