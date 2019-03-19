import React from 'react';
import './Menu.css';

const RightMenu = (props) => {
  return (
    <div>
      <ul className={props.class}>
        <button type="button" className="btn btn-outline-secondary">Upload</button>
        <button type="button" className="btn btn-outline-secondary">New file</button>
        <button type="button" className="btn btn-outline-secondary">New dir</button>
        <button type="button" className="btn btn-outline-secondary">Download</button>
        <button type="button" className="btn btn-outline-secondary">Rename</button>
        <button type="button" className="btn btn-outline-secondary">Rights</button>
        <button type="button" className="btn btn-outline-secondary">Copy</button>
        <button type="button" className="btn btn-outline-secondary">Move</button>
        <button type="button" className="btn btn-outline-secondary">Archive</button>
        <button type="button" className="btn btn-outline-secondary">Delete</button>
      </ul>
    </div>
  );
}

export default RightMenu;