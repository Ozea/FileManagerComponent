import React, { Component } from 'react';
import AddFile from './AddFile';
import AddDirectory from './AddDirectory';
import Rename from './Rename';
import Delete from './Delete';
import NothingSelected from './NothingSelected';
import Permissions from './Permissions.jsx';
import Photo from './Photo.jsx';
import Video from './Video.jsx';
import classNames from 'classname';
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
    const { type, reference, fName, permissions, items, gallery } = this.props;
    switch (type) {
      case 'Video': return <Video closeModal={this.closeModal} />;
      case 'Photo': return <Photo closeModal={this.closeModal} gallery={gallery} />;
      case 'Add file': return <AddFile closeModal={this.closeModal} onClick={this.onClick} reference={reference} />;
      case 'Add directory': return <AddDirectory closeModal={this.closeModal} onClick={this.onClick} reference={reference} />;
      case 'Rename': return <Rename closeModal={this.closeModal} onClick={this.onClick} reference={reference} onChange={this.onChange} name={type} fName={fName} />;
      case 'Permissions': return <Permissions closeModal={this.closeModal} onClick={this.onClick} changePermissions={this.changePermissions} fName={fName} permissions={permissions} />;
      case 'Delete': return <Delete closeModal={this.closeModal} onClick={this.onClick} fName={fName} items={items}/>;
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
    const { type, modalVisible } = this.props;
    const modalClasses = classNames({
      "modal": true,
      "preview-modal": type === 'Video' || type === 'Photo'
    });

    return (
      <div>
        {!modalVisible &&
          <div className={modalClasses} id="modal">
            {this.content()}
          </div>}
      </div>
    );
  }
}

export default Modal;