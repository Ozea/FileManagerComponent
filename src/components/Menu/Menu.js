import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {

  addNewFileModal = () => {
    this.props.openModal("Add file", true);
  }

  addNewDirModal = () => {
    this.props.openModal("Add directory", true);
  }

  render() {
    const { onDelete } = this.props;
    return (
      <ul className="panel">
        <button type="button" className="btn btn-outline-secondary">Upload</button>
        <button type="button" className="btn btn-outline-secondary" onClick={this.addNewFileModal}>New file</button>
        <button type="button" className="btn btn-outline-secondary" onClick={this.addNewDirModal}>New dir</button>
        <button type="button" className="btn btn-outline-secondary">Download</button>
        <button type="button" className="btn btn-outline-secondary">Rename</button>
        <button type="button" className="btn btn-outline-secondary">Rights</button>
        <button type="button" className="btn btn-outline-secondary">Copy</button>
        <button type="button" className="btn btn-outline-secondary">Move</button>
        <button type="button" className="btn btn-outline-secondary">Archive</button>
        <button type="button" className="btn btn-outline-secondary" onClick={onDelete} >Delete</button>
      </ul>
    );
  }
}

export default Menu;