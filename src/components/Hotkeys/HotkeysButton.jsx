import React from 'react';
import './Hotkeys.scss'

const HotkeysButton = (props) => {
  return (
    <div className="hotkeys-button">
      <span className="glyphicon glyphicon-option-horizontal" onClick={props.open}></span>
    </div>
  );
}

export default HotkeysButton;