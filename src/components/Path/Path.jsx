import React from 'react';
import './Path.scss';
import Dropdown from './Dropdown/Dropdown';

function clickablePath(path, props) {
  let splitPath = path.split('/');
  splitPath.splice(0, 3);

  if (path !== '/home/admin') {
    return (
      splitPath.map(item => <span className="clickable" onClick={() => openDirectory(path.substring(0, path.lastIndexOf(item)) + item, props)}> /{item}</span>)
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
        <span className="clickable" onClick={() => openDirectory('/home/admin', props)}>/home/admin</span>
        {clickablePath(props.path, props)}
      </span>
      <Dropdown changeSorting={props.changeSorting} sortingName={props.sortingName} order={props.order} />
    </div>
  );
}

export default Path;