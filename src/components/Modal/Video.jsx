import React from 'react';
import video from '../../2.mp4';

const Video = (props) => {
  return (
    <div className="modal-content video-preview">
      <span className="close" onClick={props.closeModal}>&times;</span>
      <video className="video-fluid z-depth-1 video" autoPlay loop controls>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}

export default Video;