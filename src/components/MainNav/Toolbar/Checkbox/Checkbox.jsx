import React from 'react';
import './Checkbox.scss';

function toggleAll(props) {
  props.toggleAll();
}

const Checkbox = (props) => {
  return (
    <div className="input-group-prepend">
      <div className="input-group-text">
        <input type="checkbox" onChange={() => toggleAll(props)} aria-label="Checkbox for following text input" id="checkbox" />
      </div>
      <span className="input-group-text">
        <label htmlFor="checkbox">Toggle all</label>
      </span>
    </div>
  );
}

export default Checkbox;