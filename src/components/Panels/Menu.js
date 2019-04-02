import React from 'react';
import './Menu.css';

const Menu = (props) => {
  const { isActive } = props;
  return (
    <div>
      <ul className={isActive ? "active-panel panel" : "inactive-panel panel"}>
        <button type="button" className="btn btn-outline-secondary" disabled={!isActive}>Upload</button>
        <button type="button" className="btn btn-outline-secondary" disabled={!isActive} onClick={props.handleAddNewFile} >New file</button>
        <button type="button" className="btn btn-outline-secondary" disabled={!isActive} >New dir</button>
        <button type="button" className="btn btn-outline-secondary" disabled={!isActive}>Download</button>
        <button type="button" className="btn btn-outline-secondary" disabled={!isActive}>Rename</button>
        <button type="button" className="btn btn-outline-secondary" disabled={!isActive}>Rights</button>
        <button type="button" className="btn btn-outline-secondary" disabled={!isActive}>Copy</button>
        <button type="button" className="btn btn-outline-secondary" disabled={!isActive}>Move</button>
        <button type="button" className="btn btn-outline-secondary" disabled={!isActive}>Archive</button>
        <button type="button" className="btn btn-outline-secondary" disabled={!isActive} onClick={props.handleDelete} >Delete</button>
      </ul>
    </div>
  );
}

export default Menu;