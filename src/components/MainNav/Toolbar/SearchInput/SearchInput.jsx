import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchInput.scss';

const SearchInput = () => {
  return (
    <div className="search-input-form">
      <input type="text" className="form-control" />
      <button className="btn btn-outline-secondary" type="submit"><FontAwesomeIcon icon="search" /></button>
    </div>
  );
}

export default SearchInput;