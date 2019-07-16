import React from 'react';

const AddFile = (props) => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h3 className="modal-title" >Create file:</h3>
        <button type="button" className="close" onClick={props.close} >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <input type="text" ref={props.reference}></input>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger mr-auto" onClick={props.close}>Close</button>
        <button type="button" className="btn btn-primary" onClick={props.save}>Create</button>
      </div>
    </div>
  );
}

export default AddFile;