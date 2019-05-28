import React from 'react';
import './Path.scss';

const Path = (props) => {
  return(
    <div className={props.class}>
      {props.path}
    </div>
  );
}

export default Path;