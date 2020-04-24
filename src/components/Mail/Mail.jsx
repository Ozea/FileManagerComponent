import React, { Component } from 'react';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Mail.scss';

class Mail extends Component {
  printStat = (stat, text) => {
    if (text === 'no') {
      return <div className="crossed">{stat}</div>;
    }

    return <div>{stat}: <span className="stat">{text}</span></div>;
  }
  
  render() {
    const { data, toggled } = this.props;

    return (
      <ListItem checked={false} toggled={toggled} date={data.DATE}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <div className="stats">
            <Container className="c-1 w-20">
              <div className="bandwidth">Disk <span><span className="stat">{data.U_DISK}</span> mb</span></div>
            </Container>
            <Container className="c-2 w-50">
              {this.printStat('AntiVirus Support', data.ANTIVIRUS)}
              {this.printStat('DKIM', data.DKIM)}
            </Container>
            <Container className="c-3 w-30">
              {this.printStat('AntiSpam Support', data.ANTISPAM)}
              <div>Catchall mail: <span className="stat">{data.CATCHALL}</span></div>
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

export default Mail;