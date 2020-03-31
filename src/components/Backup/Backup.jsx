import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import './Backup.scss';

class Backup extends Component {
  render() {
    const { data } = this.props;

    return (
      <ListItem checked={false} toggled={false} date={data.DATE}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <div className="stats">
            <Container className="c-1 w-35">
              <div>Backup Size: <span><span className="stat">{data.SIZE}</span> mb</span></div>
            </Container>
            <Container className="c-2 w-30">
              <div>Type: <span className="stat">{data.TYPE}</span></div>
            </Container>
            <Container className="c-3 w-35">
              <div>Run Time: <span className="stat">{data.RUNTIME} minute</span></div>
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

export default Backup;