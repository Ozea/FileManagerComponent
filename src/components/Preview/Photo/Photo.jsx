import React, { Component } from 'react';
import classNames from 'classname';
import * as FM from '../../../LocalAPI';
import './Photo.scss';
import Spinner from '../../Spinner/Spinner';

class Photo extends Component {
  state = {
    activeSlide: 0,
    photoGallery: [],
    loading: false
  }

  encodePath = (path) => {
    let splitPath = path.split('/');
    splitPath.splice(splitPath.length - 1, 1);
    splitPath.splice(0, 1);
    return splitPath.join('%2F');
  }

  formatPath = (path) => {
    let splitPath = path.split('/');
    splitPath.splice(splitPath.length - 1, 1);
    return splitPath.join('/');
  }

  carouselIndicators = () => {
    const gallery = this.state.photoGallery;
    return gallery.map((item, i) => {
      const imageClasses = classNames({ 'control-photo': true, 'active': i === this.state.activeSlide });
      const result = (<div data-target="#photoGallery" data-slide-to={i} key={item} className="indicator">
        <img src={`https://r5.vestacp.com:8083/view/file/${this.formatPath(this.props.path)}/${item}&raw=true`} alt={i} className={imageClasses} />
      </div>);
      return result;
    });
  }

  carouselPhotos = () => {
    const gallery = this.state.photoGallery || [];
    return gallery.map((item, i) => (
      <div className={i === 0 ? 'carousel-item active' : 'carousel-item'} key={i}>
        <div className="d-flex align-items-center justify-content-center min-vh-100">
          <img src={`https://r5.vestacp.com:8083/view/file/${this.formatPath(this.props.path)}/${item}&raw=true`} alt={i} />
        </div>
      </div>
    ));
  }

  setPhotoGallery = () => {
    this.setState({ loading: true }, () => {
      console.log(`Path = ${this.props.path}, Encoded path = ${this.encodePath(this.props.path)}`);
      FM.getDataFromServer(`https://r5.vestacp.com:8083/file_manager/fm_api.php?dir=%2F${this.encodePath(this.props.path)}&action=cd`)
        .then(result => {
          let photoGallery = [...this.state.photoGallery];
          console.log(result.data.listing);
          result.data.listing.filter(item => item.name.match('.png') ? photoGallery.push(item.name) : null)
          this.setState({ photoGallery, loading: false })
          console.log(this.state.photoGallery);
        })
    })
  }

  componentDidMount() {
    this.setPhotoGallery();
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
      <div>
        {this.state.loading ? <Spinner /> :
          <div id="photoGallery" className="carousel slide" data-ride="carousel">
            <span className="close" onClick={this.props.close}>&times;</span>
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
        }
      </div>
    );
  }
}

export default Photo;