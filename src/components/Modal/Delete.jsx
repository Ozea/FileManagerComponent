import React from 'react';

const Delete = (props) => {
  return (
    <div className="modal-content delete">
      <div className="modal-header">
        {props.items > 0 ?
          <h3>{window.GLOBAL.App.Constants.FM_CONFIRM_DELETE_BULK} <span className="quot">({props.items})</span> ?</h3> :
          <h3>{window.GLOBAL.App.Constants.FM_CONFIRM_DELETE} <span className="quot">&quot;{props.fName}&quot;</span>?</h3>}
      </div>
      <div className="modal-footer lower">
        <button type="button" className="btn btn-danger mr-auto" onClick={props.close}>{window.GLOBAL.App.Constants.FM_CANCEL}</button>
        <button type="button" className="btn btn-primary" onClick={props.save} autoFocus>{window.GLOBAL.App.Constants.FM_DELETE}</button>
      </div>
    </div>
  );
}

export default Delete;