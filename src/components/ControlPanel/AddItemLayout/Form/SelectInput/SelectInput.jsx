import React from 'react';

const SelectInput = ({ options = [], id, name, title, optionalTitle = '' }) => {
  const renderOptions = () => {
    return options.map((option, index) => <option key={index} value={option}>{option}</option>);
  }

  return (
    <>
      {
        options
          ? (
            <div className="form-group">
              <label className="label-wrapper" htmlFor={id}>
                {title}
                <span>{optionalTitle ? `(${optionalTitle})` : ''}</span>
              </label>
              <select className="form-control" id={id} name={name}>
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