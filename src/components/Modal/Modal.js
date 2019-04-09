import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {

  onClick = () => {
    this.props.onClick();
    this.props.onClose();
  }

  modalType = () => {
    const { name, reference } = this.props;
    switch (name) {
      case 'Add file': return (<input type="text" ref={reference}></input>);
      case 'Add directory': return (<input type="text" ref={reference}></input>)
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
            <h3>{this.props.name}</h3>
          </div>
          <hr />
          <div className="modal-body">
            {this.modalType()}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger cancel" onClick={this.closeModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={this.onClick}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;