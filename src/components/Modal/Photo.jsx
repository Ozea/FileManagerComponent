import React from 'react';
import image from '../../1.jpg';

const Photo = (props) => {
  return (
    <div className="modal-content photo-preview">
      <span className="close" onClick={props.closeModal}>&times;</span>
      <img className="photo" src={image} alt="Bicycle" />
    </div>
  );
}

export default Photo;