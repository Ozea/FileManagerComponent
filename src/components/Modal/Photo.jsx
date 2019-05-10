import React, { Component } from 'react';
import classNames from 'classname';

class Photo extends Component {
  state = {
    activeSlide: 0,
  }

  carouselIndicators = () => {
    const gallery = this.props.gallery || [];
    return gallery.map((item, i) => {
      const imageClasses = classNames({ 'control-photo': true, 'active': i === this.state.activeSlide });
      const result = (<div data-target="#photoGallery" data-slide-to={i} key={item} className="indicator">
        <img src={require('../../' + item)} alt={i} className={imageClasses} />
      </div>);
      return result;
    });
  }

  carouselPhotos = () => {
    const gallery = this.props.gallery || [];
    return gallery.map((item, i) => (
      <div className={i === 0 ? 'carousel-item active' : 'carousel-item'} key={i}>
        <img src={require('../../' + item)} alt={i} className="photo" />
      </div>
    ));
  }

  componentDidMount() {
    // eslint-disable-next-line
    $('.carousel').on('slide.bs.carousel', this.handleSlide);
  }

  componentWillUnmount = () => {
    // eslint-disable-next-line
    $('.carousel').off('slide.bs.carousel', this.handleSlide);
  }

  handleSlide = (event) => {
    this.setState({ activeSlide: event.to });
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