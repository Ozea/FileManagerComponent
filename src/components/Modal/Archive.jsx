import React from 'react';

const Archive = (props) => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        {props.items > 0 ?
          <h3 className="modal-title">Compress <span className="quot">({props.items})</span>selected item(s)?</h3> :
          <h3 className="modal-title rename">Compress <span className="quot">&quot;{props.fName}&quot;</span>?</h3>}
        <button type="button" className="close" onClick={props.close} >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      {props.items > 0 ?
          <input type="text" autoFocus defaultValue={`${props.path}`} onBlur={props.onChange} ref={props.reference}></input> :
          <input type="text" autoFocus defaultValue={`${props.path}/${props.fName}.tar.gz`} onBlur={props.onChange} ref={props.reference}></input>}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger mr-auto" onClick={props.close}>Close</button>
        <button type="button" className="btn btn-primary" onClick={props.save}>Save</button>
      </div>
    </div>
  );
}

export default Archive;