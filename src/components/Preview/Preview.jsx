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
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  }

  content = () => {
    const { location, onClose } = this.props;
    let type = location.state.type;
    if (type === 'editor') {
      return <Editor closeModal={onClose} />;
    } else if (type === 'photo') {
      return <Photo closeModal={onClose} gallery={this.props.location.state.gallery} />;
    } else if (type === 'video') {
      return <Video closeModal={onClose} />;
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