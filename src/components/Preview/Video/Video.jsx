import React from 'react';
import video from '../../../2.mp4';
import './Video.scss';

const Video = (props) => {
  return (
    <div className="video-preview">
      <span className="close" onClick={props.closeModal}>&times;</span>
      <video className="video" loop controls>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}

export default Video;