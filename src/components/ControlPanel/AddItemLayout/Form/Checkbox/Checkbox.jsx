import React from 'react';

const Checkbox = ({ name, id, title, defaultChecked = false, onChange }) => {
  return (
    <div className="form-group">
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          name={name}
          id={id}
          onChange={event => onChange(event.target.checked)}
          defaultChecked={defaultChecked} />
        <label htmlFor={id}>{title}</label>
      </div>
    </div>
  );
}

export default Checkbox;