import React from 'react';

const TextArea = ({ id, name, defaultValue = '', title, optionalTitle = '', disabled = false }) => {
  return (
    <div className="form-group">
      <label className="label-wrapper" htmlFor={id}>
        {title}
        <span>{optionalTitle}</span>
      </label>
      <textarea
        className="form-control"
        id={id}
        rows="3"
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}>
      </textarea>
    </div>
  );
}

export default TextArea;