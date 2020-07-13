import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Timer.scss';

export default class Timer extends Component {
  state = {
    myInterval: null,
    paused: false
  }

  componentDidMount() {
    this.handleTimer();
  }

  handleTimer = () => {
    if (!this.state.paused) {
      this.setState({ myInterval: setInterval(this.props.countDown, 1000), paused: false })
    } else {
      this.setState({ paused: true });
      clearInterval(this.state.myInterval)
    }
  }

  handlePause = () => {
    this.setState({ paused: !this.state.paused }, () => {
      this.handleTimer();
    });
  }

  render() {
    return (
      <div className="timer-wrapper">
        <button onClick={this.handlePause}>
          {this.state.paused ? <FontAwesomeIcon icon="play" /> : <FontAwesomeIcon icon="pause" />}
        </button>
        <div className="circle-wrapper">
          {/* <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="stroke-1" cx="15" cy="15" r="10" fill="white" style={{ strokeDashoffset: 9 + this.props.time * 4.2 }}></circle>
          </svg> */}
          <span className="seconds">{this.props.time}</span>
        </div>
      </div>
    )
  }
}