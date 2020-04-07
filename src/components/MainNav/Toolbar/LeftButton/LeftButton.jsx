import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LeftButton.scss';

function leftMenuClassName(props) {
  if (!props.showLeftMenu) {
    return "l-menu none";
  } else {
    return "l-menu";
  }
}

const LeftButton = (props) => {
  return (
    <div className={leftMenuClassName(props)}>
      <button>
        <FontAwesomeIcon icon="plus" />
        <span className="add">{props.name}</span>
      </button>
    </div>
  );
}

export default LeftButton;