import React from 'react';
import './Path.scss';

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
  props.openDirectory(path);
}

const Path = (props) => {
  return (
    <div className={props.class}>
      <span className="clickable" onClick={() => openDirectory('/home/admin', props)}>/home/admin</span>
      {clickablePath(props.path, props)}
    </div>
  );
}

export default Path;