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
    if (this.props.cursor === 0) {
      this.props.openModal("Nothing selected");
    } else {
      this.props.openModal("Delete");
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
    if (this.props.cursor === 0){
      this.props.openModal("Nothing selected");
    } else {
      this.props.openModal("Permissions");
    }
  }

  hotKeys = (e) => {
    switch(e.keyCode){
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

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.hotKeys);
  }

  render() {
    return (
      <ul className="panel">
        <button type="button" className="btn btn-outline-secondary">Upload</button>
        <button type="button" className="btn btn-outline-secondary" onClick={this.addNewFileModal}>New file</button>
        <button type="button" className="btn btn-outline-secondary" onClick={this.addNewDirModal}>New dir</button>
        <button type="button" className="btn btn-outline-secondary">Download</button>
        <button type="button" className="btn btn-outline-secondary" onClick={this.renameHandler}>Rename</button>
        <button type="button" className="btn btn-outline-secondary" onClick={this.permissionsHandler}>Permissions</button>
        <button type="button" className="btn btn-outline-secondary">Copy</button>
        <button type="button" className="btn btn-outline-secondary">Move</button>
        <button type="button" className="btn btn-outline-secondary">Archive</button>
        <button type="button" className="btn btn-outline-secondary" onClick={this.onDeleteHandler} >Delete</button>
      </ul>
    );
  }
}

export default Menu;