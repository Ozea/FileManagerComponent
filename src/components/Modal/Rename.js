import React from 'react';

const Rename = (props) => {
  return (
    <div className="modal-content">
      <span className="close" onClick={props.closeModal}>&times;</span>
      <div className="header">
        <h3>{props.name} <span className="quot">&quot;{props.fName}&quot;</span></h3>
      </div>
      <div className="modal-body">
        <input type="text" autoFocus defaultValue={props.fName} onBlur={props.onChange} ref={props.reference}></input>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger cancel" onClick={props.closeModal}>Close</button>
        <button type="button" className="btn btn-primary" onClick={props.onClick}>Save</button>
      </div>
    </div>
  );
}

export default Rename;