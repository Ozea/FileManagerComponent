import React from 'react';

const NothingSelected = (props) => {
  return (
    <div className="modal-content nothing-selected">
      <div className="header">
        <h3>No file or directory selected</h3>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger mr-auto" onClick={props.closeModal}>Close</button>
      </div>
    </div>
  );
}

export default NothingSelected;