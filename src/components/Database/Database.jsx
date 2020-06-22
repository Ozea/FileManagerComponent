import React, { Component } from 'react';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Database extends Component {

  toggleFav = (starred) => {
    if (starred) {
      this.props.toggleFav(this.props.data.NAME, 'add');
    } else {
      this.props.toggleFav(this.props.data.NAME, 'delete');
    }
  }

  checkItem = () => {
    this.props.checkItem(this.props.data.NAME);
  }

  render() {
    const { data } = this.props;
    const { inc } = window.GLOBAL.App;

    return (
      <ListItem checked={data.isChecked} date={data.DATE} starred={data.STARRED} toggleFav={this.toggleFav} checkItem={this.checkItem}>
        <Container className="r-col w-85">
          <div className="name">{data.DATABASE}</div>
          <br />
          <div className="stats">
            <Container className="c-1">
              <div className="disk">{inc.Disk}: <span><span className="stat">{data.U_DISK}</span> mb</span></div>
            </Container>
            <Container className="c-2">
              <div>{inc.User}: <span className="stat">{data.DBUSER}</span></div>
              <div>{inc.Charset}: <span className="stat">{data.CHARSET}</span></div>
            </Container>
            <Container className="c-3">
              <div>{inc.Host}: <span className="stat">{data.HOST}</span></div>
              <div>{inc.Type}: <span className="stat">{data.TYPE}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div><a className="link-edit" href={`/edit/db/?domain=${data.NAME}`}>{inc.edit} <FontAwesomeIcon icon="pen" /></a></div>
          <div><a className="link-gray" href={`#`}>{inc.suspend} <FontAwesomeIcon icon="lock" /></a></div>
          <div><a className="link-delete" href={`#`}>{inc.delete} <FontAwesomeIcon icon="times" /></a></div>
        </div>
      </ListItem>
    );
  }
}

export default Database;