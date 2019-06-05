import React from 'react';

const Extract = (props) => {
  let nameArray = props.fName.split('.');
  let name = nameArray.splice(0, nameArray.length - 2).join('.');
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h3 className="modal-title rename">Extract <span className="quot">&quot;{props.fName}&quot;</span></h3>
        <button type="button" className="close" onClick={props.closeModal} >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <input type="text" autoFocus defaultValue={`${name}`} onBlur={props.onChange} ref={props.reference}></input>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger mr-auto" onClick={props.closeModal}>Close</button>
        <button type="button" className="btn btn-primary" onClick={props.onClick}>Save</button>
      </div>
    </div>
  );
}

export default Extract;