import React from 'react';
import './Spinner.scss';

const Spinner = () => {
  return (
    <div className="wrapper">
      <div className="spinner-grow spinner"></div>
      <span className="text">Initializing...</span>
    </div>
  );
}

export default Spinner;