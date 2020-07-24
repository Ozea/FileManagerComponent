import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from '../ControlPanel/Container/Container';
import ListItem from '../ControlPanel/ListItem/ListItem';
import './Server.scss';

class Server extends Component {
  isActive = status => {
    return status !== "running";
  }

  printTime = seconds => {
    let hours = seconds / 60;
    let days = Math.floor(hours / 24);
    return days;
  }

  checkItem = () => {
    this.props.checkItem(this.props.data.NAME);
  }

  render() {
    const { data } = this.props;
    const { i18n } = window.GLOBAL.App;

    return (
      <ListItem checked={data.isChecked} checkItem={this.checkItem}>
        <Container className="r-col w-85">
          <div className="server-name">{data.NAME}</div>
          <div className="stats">
            <Container className="c-1">
              <div className="descr"><span className="stat">{i18n[data.SYSTEM]}</span></div>
            </Container>
            <Container className="c-1" />
            <Container className="c-1">
              <div className="descr"><span>{i18n.CPU}: <span className="stat">{data.CPU}</span></span></div>
            </Container>
            <Container className="c-2">
              <div><span>{i18n.Memory}: <span className="stat">{data.MEM} {i18n.mb}</span></span></div>
            </Container>
            <Container className="c-3">
              <div><span>{i18n.Uptime}: <span className="stat">{this.printTime(data.RTIME)} {i18n.days}</span></span></div>
            </Container>
            <Container className="c-1" />
          </div>
        </Container>
        <div className="actions">
          <div><a className="link-download" href={`/edit/server/${data.NAME}`}>{i18n.configure} <FontAwesomeIcon icon="cogs" /></a></div>
          <div><a className="link-delete" href={`/stop/service/?srv=${data.NAME}`} >{i18n.stop} <FontAwesomeIcon icon="stop" /></a></div>
          <div>
            <a className="link-gray restart" href={`/restart/service?srv=${data.NAME}`} >
              {i18n.restart}
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-repeat" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.854 7.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L2.5 8.207l1.646 1.647a.5.5 0 0 0 .708-.708l-2-2zm13-1a.5.5 0 0 0-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708z" />
                <path fill-rule="evenodd" d="M8 3a4.995 4.995 0 0 0-4.192 2.273.5.5 0 0 1-.837-.546A6 6 0 0 1 14 8a.5.5 0 0 1-1.001 0 5 5 0 0 0-5-5zM2.5 7.5A.5.5 0 0 1 3 8a5 5 0 0 0 9.192 2.727.5.5 0 1 1 .837.546A6 6 0 0 1 2 8a.5.5 0 0 1 .501-.5z" />
              </svg>
            </a>
          </div>
        </div>
      </ListItem>
    );
  }
}

export default Server;