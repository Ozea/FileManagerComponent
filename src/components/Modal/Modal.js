import React, { Component } from 'react';
import AddFile from './AddFile';
import AddDirectory from './AddDirectory';
import Rename from './Rename';
import Delete from './Delete';
import NothingSelected from './NothingSelected';
import Permissions from './Permissions.jsx';
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
    const { name, reference, fName, rights } = this.props;
    switch (name) {
      case 'Add file': return <AddFile closeModal={this.closeModal} onClick={this.onClick} reference={reference} />;
      case 'Add directory': return <AddDirectory closeModal={this.closeModal} onClick={this.onClick} reference={reference} />;
      case 'Rename': return <Rename closeModal={this.closeModal} onClick={this.onClick} reference={reference} onChange={this.onChange} name={name} fName={fName} />;
      case 'Permissions': return <Permissions closeModal={this.closeModal} onClick={this.onClick} changePermissions={this.changePermissions} fName={fName} rights={rights} />;
      case 'Delete': return <Delete closeModal={this.closeModal} onClick={this.onClick} fName={fName} />;
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
    return (
      <div>
        {!this.props.modalVisible &&
          <div className="modal" id="modal">
            {this.content()}
          </div>}
      </div>
    );
  }
}

export default Modal;