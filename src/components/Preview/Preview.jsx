import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Editor from './Editor/Editor';
import Photo from './Photo/Photo';
import Video from './Video/Video';

class Preview extends Component {

  componentDidMount = () => {
    document.addEventListener("keydown", this.hotkeys);
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.hotkeys);
  }

  hotkeys = (e) => {
    if (e.keyCode === 121) {
      this.props.onClose();
    }
  }

  onClose = (history) => {
    let lastOpenedDirectory = history.location.search.substring(6, history.location.search.lastIndexOf('/'));
    history.push({
      pathname: '/list/directory',
      search: `?path=${lastOpenedDirectory}`
    })
  }

  content = () => {
    const { location } = this.props;
    let split = location.search.split('/');
    let name = split[split.length - 1];

    if (location.pathname !== '/list/directory/preview/') {
      return;
    }

    if (name.match('.mp4')) {
      return <Video closeModal={this.onClose} />;
    } else if (name.match(/png|jpg|jpeg|gif/g)) {
      return <Photo closeModal={this.onClose} close={this.onClose} path={location.search} activeImage={name} />;
    } else {
      return <Editor close={this.onClose} name={name} />;
    }
  }

  render() {
    return (
      <div>
        {this.content()}
      </div>
    );
  }
}

export default withRouter(Preview);