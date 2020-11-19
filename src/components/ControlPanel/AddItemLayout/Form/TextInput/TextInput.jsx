import React from 'react';

const TextInput = ({ id, name, title, optionalTitle = '', defaultValue = '', disabled = false }) => {
  return (
    <div class="form-group">
      <label className="label-wrapper" htmlFor={id}>
        {title}
        <span>{optionalTitle ? `(${optionalTitle})` : ''}</span>
      </label>
      <input
        type="text"
        name={name}
        id={id}
        disabled={disabled}
        defaultValue={defaultValue}
        className="form-control" />
    </div>
  );
}

export default TextInput;