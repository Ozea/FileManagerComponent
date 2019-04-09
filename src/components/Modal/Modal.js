import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {

  onClick = () => {
    this.props.onClick();
    this.props.onClose();
  }

  modalBody = () => {
    const { name, reference } = this.props;
    switch (name) {
      case 'Add file': return (<input type="text" ref={reference}></input>);
      case 'Add directory': return (<input type="text" ref={reference}></input>)
      case 'Delete': return null;
      case 'Nothing selected': return null;
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

  modalName = () => {
    if (this.props.name === 'Delete') {
      return <h3>Are you sure you want to delete this file?</h3>;
    } else if (this.props.name === 'Nothing selected') {
      return <h3>No such file or directory selected</h3>;
    } else {
      return <h3>{this.props.name}</h3>
    }
  }

  modalFooter = () => {
    switch (this.props.name) {
      case 'Delete': return (
        <div className="modal-footer">
          <button type="button" className="btn btn-danger cancel" onClick={this.closeModal}>Close</button>
          <button type="button" className="btn btn-primary" onClick={this.onClick}>Delete</button>
        </div>
      );
      case 'Nothing selected': return (
        <div className="modal-footer">
          <button type="button" className="btn btn-danger cancel" onClick={this.closeModal}>Close</button>
        </div>);
      default: return (
        <div className="modal-footer">
          <button type="button" className="btn btn-danger cancel" onClick={this.closeModal}>Close</button>
          <button type="button" className="btn btn-primary" onClick={this.onClick}>Save</button>
        </div>);
    }
  }

  componentDidMount = () => {
    window.addEventListener("click", this.closeOutside);
  }

  componentWillUnmount = () => {
    window.removeEventListener("click", this.closeOutside);
  }

  render() {
    const style = !this.props.modalVisible ? { display: "block" } : { display: "none" };
    return (
      <div className="modal" id="modal" style={style}>
        <div className="modal-content">
          <span className="close" onClick={this.closeModal}>&times;</span>
          <div className="header">
            {this.modalName()}
          </div>
          {this.props.name !== 'Delete' || 'Nothing selected' ? null : <hr/>}
          <div className="modal-body">
            {this.modalBody()}
          </div>
          {this.modalFooter()}
        </div>
      </div>
    );
  }
}

export default Modal;