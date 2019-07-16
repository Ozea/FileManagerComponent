import React from 'react';

const Copy = (props) => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        {props.items > 0 ?
          <h3 className="modal-title">Copy <span className="quot">({props.items})</span>selected item(s) into:</h3> :
          <h3 className="modal-title rename">{props.name} <span className="quot">&quot;{props.fName}&quot;</span> into:</h3>}
        <button type="button" className="close" onClick={props.close} >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <input type="text" autoFocus defaultValue={props.path} onChange={props.onChange} ref={props.reference}></input>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger mr-auto" onClick={props.close}>Cancel</button>
        <button type="button" className="btn btn-primary" onClick={props.save}>Copy</button>
      </div>
    </div>
  );
}

export default Copy;