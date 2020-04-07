import React, { Component } from 'react';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Database extends Component {
  render() {
    const { data, toggled } = this.props;

    return (
      <ListItem checked={false} toggled={toggled} date={data.DATE}>
        <Container className="r-col w-85">
          <div className="name">{data.DATABASE}</div>
          <br />
          <div className="stats">
            <Container className="c-1 w-25">
              <div className="disk">Disk: <span><span className="stat">{data.U_DISK}</span> mb</span></div>
            </Container>
            <Container className="c-2 w-45">
              <div>User: <span className="stat">{data.DBUSER}</span></div>
              <div>Charset: <span className="stat">{data.CHARSET}</span></div>
            </Container>
            <Container className="c-3 w-30">
              <div>Host: <span className="stat">{data.HOST}</span></div>
              <div>Type: <span className="stat">{data.TYPE}</span></div>
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

export default Database;