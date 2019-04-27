import React from 'react';

const NothingSelected = (props) => {
  return (
    <div className="modal-content delete">
      <span className="close" onClick={props.closeModal}>&times;</span>
      <div className="header">
        <h3>No file or directory selected</h3>
      </div>
      <div className="modal-footer nothing-selected">
        <button type="button" className="btn btn-danger cancel" onClick={props.closeModal}>Close</button>
      </div>
    </div>
  );
}

export default NothingSelected;