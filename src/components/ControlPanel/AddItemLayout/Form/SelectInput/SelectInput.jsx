import React from 'react';

const SelectInput = ({ options = [], id, name, title, optionalTitle = '', selected = '', onChange }) => {
  const renderOptions = () => {
    return options.map((option, index) => <option key={index} selected={selected === option} value={option}>{option}</option>);
  }

  return (
    <>
      {
        options
          ? (
            <div className="form-group select-group">
              <label className="label-wrapper" htmlFor={id}>
                {title}
                <span>{optionalTitle}</span>
              </label>
              <select className="form-control" id={id} name={name} onChange={event => onChange(event.target.value)}>
                {renderOptions()}
              </select>
            </div>
          )
          : null
      }
    </>
  );
}

export default SelectInput;