import React from 'react';
import * as FM from '../../LocalAPI';

const Move = (props) => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        {props.items > 0 ?
          <h3 className="modal-title">Move <span className="quot">({props.items})</span>selected item(s) into:</h3> :
          <h3 className="modal-title rename">{props.name} <span className="quot">&quot;{FM.getDirectoryPath()}/{props.fName}&quot;</span>into:</h3>}
        <button type="button" className="close" onClick={props.close} >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <input type="text" autoFocus defaultValue={props.path} onChange={props.onChange} ref={props.reference}></input>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger mr-auto" onClick={props.close}>Close</button>
        <button type="button" className="btn btn-primary" onClick={props.save}>Save</button>
      </div>
    </div>
  );
}

export default Move;