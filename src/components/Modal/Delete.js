import React from 'react';

const Delete = (props) => {
  return (
    <div className="modal-content delete">
      <span className="close" onClick={props.closeModal}>&times;</span>
      <div className="header">
        { props.items > 0 ? 
          <h3>Are you sure you want to delete <span className="quot">({props.items})</span> selected item(s)?</h3> : 
          <h3>Are you sure you want to delete <span className="quot">&quot;{props.fName}&quot;</span>?</h3>}
      </div>
      <div className="modal-footer lower">
        <button type="button" className="btn btn-danger cancel" onClick={props.closeModal}>Close</button>
        <button type="button" className="btn btn-primary" autoFocus onClick={props.onClick}>Delete</button>
      </div>
    </div>
  );
}

export default Delete;