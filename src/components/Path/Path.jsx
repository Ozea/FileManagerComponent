import React from 'react';
import './Path.scss';
import Dropdown from './Dropdown/Dropdown';

function clickablePath(props) {
  let path = props.path;
  let splitPath = props.path.split('/');
  splitPath.splice(0, 3);

  if (path !== window.GLOBAL.ROOT_DIR) {
    return (
      splitPath.map(item => <span className="clickable" onClick={() => openDirectory(path.substring(0, path.lastIndexOf(item)) + item, props)}>&nbsp;/&nbsp;{item}</span>)
    );
  }
}

function openDirectory(path, props) {
  if (!props.isActive) {
    return;
  } else {
    props.openDirectory(path);
  }
}

const Path = (props) => {
  return (
    <div className={props.class}>
      <span className="clickable-path">
        <span className="clickable" onClick={() => openDirectory(window.GLOBAL.ROOT_DIR, props)}>{window.GLOBAL.ROOT_DIR}</span>
        {clickablePath(props)}
      </span>
      <Dropdown changeSorting={props.changeSorting} sorting={props.sorting} order={props.order} isActive={props.isActive} />
    </div>
  );
}

export default Path;