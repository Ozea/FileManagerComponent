import React, { useEffect, useState } from 'react';

const TextInput = ({ id, name, title, optionalTitle = '', onChange = () => { }, value = '', disabled = false }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  const changeCheckbox = event => {
    setInputValue(event.target.value);
    onChange(event);
  }

  return (
    <div class="form-group">
      <label className="label-wrapper" htmlFor={id}>
        {title}
        <span>{optionalTitle}</span>
      </label>
      <input
        type="text"
        name={name}
        id={id}
        onChange={changeCheckbox}
        disabled={disabled}
        value={inputValue}
        className="form-control" />
    </div>
  );
}

export default TextInput;