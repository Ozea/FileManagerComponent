import React from 'react';

const AddDirectory = (props) => {
  return (
    <div className="modal-content add">
      <span className="close" onClick={props.closeModal}>&times;</span>
      <div className="header">
        <h3>Add directory</h3>
        </div>
      <div className="modal-body">
        <input type="text" ref={props.reference} autoFocus></input>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger cancel" onClick={props.closeModal}>Close</button>
        <button type="button" className="btn btn-primary" onClick={props.onClick}>Save</button>
      </div>
    </div>
  );
}

export default AddDirectory;