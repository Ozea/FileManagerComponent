import React, { Component } from 'react';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WebDomain.scss';

class WebDomain extends Component {
  render(){
    const { data } = this.props;

    return(
      <ListItem checked={false} toggled={false} date={data.DATE}>
        <Container className="r-col w-85">
          <div className="name">{data.ALIAS}</div>
          <div>{data.IP}</div>
          <div className="stats">
            <Container className="c-1 w-25">
              <div className="bandwidth">Bandwidth <span><span className="stat">{data.U_BANDWIDTH}</span> mb</span></div>
              <div className="disk">Disk: <span><span className="stat">{data.U_DISK}</span> mb</span></div>
            </Container>
            <Container className="c-2 w-45">
              <div>Web Template: <span className="stat">{data.TPL}</span></div>
              <div>SSL Support: <span className="stat">{data.SSL}</span></div>
              <div className="web-stats">Web Statistics</div>
            </Container>
            <Container className="c-3 w-35">
              <div>Backend Support: <span className="stat">{data.BACKEND}</span></div>
              <div>Backend Template: <span className="stat">{data.BACKEND}</span></div>
              <div className="add-ftp">Additional FTP</div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div>LOGOUT <FontAwesomeIcon icon="user-lock" /></div>
          <div>EDIT <FontAwesomeIcon icon="pen" /></div>
          <div>SUSPEND <FontAwesomeIcon icon="lock" /></div>
          <div>DELETE <FontAwesomeIcon icon="times" /></div>
        </div>
      </ListItem>
    );
  }
}

export default WebDomain;