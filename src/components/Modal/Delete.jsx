import React from 'react';

const Delete = (props) => {
  return (
    <div className="modal-content delete">
      <div className="modal-header">
        {props.items > 0 ?
          <h3>Are you sure you want to delete <span className="quot">({props.items})</span> selected item(s)?</h3> :
          <h3>Are you sure you want to delete <span className="quot">&quot;{props.fName}&quot;</span>?</h3>}
        <button type="button" className="close" onClick={props.close} >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-footer lower">
        <button type="button" className="btn btn-danger mr-auto" onClick={props.close}>Cancel</button>
        <button type="button" className="btn btn-primary" onClick={props.save} autoFocus>Delete</button>
      </div>
    </div>
  );
}

export default Delete;