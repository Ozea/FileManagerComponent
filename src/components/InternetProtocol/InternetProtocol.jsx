import React, { Component } from 'react';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './InternetProtocol.scss';

class InternetProtocol extends Component {
  toggleFav = (starred) => {
    if (starred) {
      this.props.toggleFav(this.props.data.IP, 'add');
    } else {
      this.props.toggleFav(this.props.data.IP, 'delete');
    }
  }

  checkItem = () => {
    this.props.checkItem(this.props.data.IP);
  }

  render() {
    const { data } = this.props;
    const { inc } = window.GLOBAL.App;

    return (
      <ListItem checked={data.isChecked} date={data.DATE} starred={data.STARRED} toggleFav={this.toggleFav} checkItem={this.checkItem} >
        <Container className="r-col w-85">
          <div className="name">{data.IP}</div>
          <br />
          <div className="stats">
            <Container className="c-1 w-35">
              <div className="ip"><span className="stat">{data.NETMASK}</span></div>
              <div className="soa"><span className="stat">{data.INTERFACE}</span></div>
            </Container>
            <Container className="c-2 w-30">
              <div>{inc.Domains}: <span className="stat">{data.U_WEB_DOMAINS}</span></div>
              <div>{inc.Status}: <span className="stat">{data.STATUS}</span></div>
            </Container>
            <Container className="c-3 w-35">
              <div>{inc.Owner}: <span className="stat">{data.OWNER}</span></div>
              <div>{inc.Users}: <span className="stat">{data.U_SYS_USERS.replace(',', ', ')}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div><a className="link-edit" href={`/edit/ip/?ip=${data.IP}`}>{inc.edit} <FontAwesomeIcon icon="pen" /></a></div>
          <div><a className="link-delete" href={`#`}>{inc.delete} <FontAwesomeIcon icon="times" /></a></div>
        </div>
      </ListItem>
    );
  }
}

export default InternetProtocol;