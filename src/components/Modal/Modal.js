import React, { Component } from 'react';
import AddFile from './AddFile';
import AddDirectory from './AddDirectory';
import Rename from './Rename';
import Delete from './Delete';
import NothingSelected from './NothingSelected';
import Permissions from './Permissions.jsx';
import Move from './Move';
import Archive from './Archive';
import Extract from './Extract';
import './Modal.scss';

class Modal extends Component {

  onClick = () => {
    this.props.onClick();
    this.props.onClose();
  }

  hotkeys = (e) => {
    if (e.keyCode === 27) {
      this.props.onClose();
    } else if (e.keyCode === 13) {
      this.props.onClick();
      this.props.onClose();
    }
  }

  changePermissions = (permissions) => {
    this.props.onChangePermissions(permissions);
  }

  onChange = (e) => {
    this.props.onChangeValue(e.target.value);
  }

  content = () => {
    const { type, reference, fName, permissions, items, path } = this.props;
    switch (type) {
      case 'Extract': return <Extract closeModal={this.closeModal} onClick={this.onClick} reference={reference} onChange={this.onChange} name={type} fName={fName} />;
      case 'Archive': return <Archive closeModal={this.closeModal} onClick={this.onClick} reference={reference} onChange={this.onChange} name={type} fName={fName} />;
      case 'Move': return <Move closeModal={this.closeModal} onClick={this.onClick} reference={reference} onChange={this.onChange} name={type} path={path} fName={fName} />;
      case 'Add file': return <AddFile closeModal={this.closeModal} onClick={this.onClick} reference={reference} />;
      case 'Add directory': return <AddDirectory closeModal={this.closeModal} onClick={this.onClick} reference={reference} />;
      case 'Rename': return <Rename closeModal={this.closeModal} onClick={this.onClick} reference={reference} onChange={this.onChange} name={type} fName={fName} />;
      case 'Permissions': return <Permissions closeModal={this.closeModal} onClick={this.onClick} changePermissions={this.changePermissions} fName={fName} permissions={permissions} />;
      case 'Delete': return <Delete closeModal={this.closeModal} onClick={this.onClick} fName={fName} items={items} />;
      case 'Nothing selected': return <NothingSelected closeModal={this.closeModal} />;
      default:
        break;
    }
  }

  closeModal = () => {
    this.props.onClose();
  }

  closeOutside = (e) => {
    let modal = document.getElementById("modal");
    if (e.target === modal) {
      this.props.onClose();
    }
  }

  componentDidMount = () => {
    window.addEventListener("click", this.closeOutside);
    document.addEventListener("keydown", this.hotkeys);
  }

  componentWillUnmount = () => {
    window.removeEventListener("click", this.closeOutside);
    document.removeEventListener("keydown", this.hotkeys);
  }

  render() {
    const { modalVisible } = this.props;

    return (
      <div>

        {!modalVisible &&
          <div className="modal" id="modal">
            {this.content()}
          </div>}
      </div>
    );
  }
}

export default Modal;