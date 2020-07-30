import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchInput.scss';

const SearchInput = props => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleClick = () => {
    if (searchTerm && searchTerm !== '') {
      return props.handleSearchTerm(searchTerm);
    }

    return;
  }

  return (
    <div className="search-input-form">
      <input type="text" className="form-control" onChange={e => setSearchTerm(e.target.value)} />
      <button className="btn btn-outline-secondary" type="submit" onClick={() => handleClick()}><FontAwesomeIcon icon="search" /></button>
    </div>
  );
}

export default SearchInput;