import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from '../ControlPanel/Container/Container';
import ListItem from '../ControlPanel/ListItem/ListItem';
import './ServerSys.scss';

class Server extends Component {
  printTime = seconds => {
    let hours = seconds / 60;
    let days = Math.floor(hours / 24);
    return days;
  }

  checkItem = () => {
    this.props.checkItem(this.props.data.HOSTNAME);
  }

  render() {
    const { data } = this.props;
    const token = localStorage.getItem("token");
    const { i18n } = window.GLOBAL.App;

    return (
      <ListItem checked={data.isChecked} checkItem={this.checkItem}>
        <Container className="r-col w-85">
          <div className="name">{data.HOSTNAME}</div>
          <div className="stats">
            <Container className="c-1">
              <div className="descr"><span><span className="stat">{data.OS} {data.VERSION}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {`(${data.ARCH})`}</span></div>
            </Container>
            <Container className="c-2">
              <div>{i18n['Load Average']}: <span><span className="stat">{data.LOADAVERAGE}</span></span></div>
            </Container>
            <Container className="c-3">
              <div><span>{i18n.Uptime}: <span className="stat">{this.printTime(data.UPTIME)} {i18n.days}</span></span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div><a className="link-list" href='/edit/server'>{i18n.configure} <FontAwesomeIcon icon="cogs" /></a></div>
          <div>
            <a className="link-download restart" href={`/restart/system?hostname=${data.HOSTNAME}`}>
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