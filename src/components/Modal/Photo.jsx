import React, { Component } from 'react';

class Photo extends Component {
  carouselIndicators = () => {
    const gallery = this.props.gallery || [];
    return gallery.map((item, i) => (
      <div data-target="#photoGallery" data-slide-to={i} key={i} className="indicator active">
        <img src={require('../../' + item)} alt={i} className="control-photo" />
      </div>
    ));
  }

  carouselPhotos = () => {
    const gallery = this.props.gallery || [];
    return gallery.map((item, i) => (
      <div className={i === 0 ? 'carousel-item active' : 'carousel-item'} key={item}>
        <img src={require('../../' + item)} alt={i} className="photo" />
      </div>
    ));
  }

  render() {
    return (
      <div className="modal-content photo-preview">
        <div id="photoGallery" className="carousel slide" data-ride="carousel">
          <span className="close" onClick={this.props.closeModal}>&times;</span>
          <div className="carousel-inner">
            {this.carouselPhotos()}
          </div>
          <div className="carousel-indicators">
            {this.carouselIndicators()}
          </div>
          <a className="carousel-control-prev" href="#photoGallery" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#photoGallery" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}

export default Photo;