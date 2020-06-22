import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListItem from '../ControlPanel/ListItem/ListItem';
import Container from '../ControlPanel/Container/Container';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
import './Backup.scss';

class Backup extends Component {
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
          <div className="name">{data.NAME}</div>
          <div className="stats">
            <Container className="c-1">
              <div>{inc['Backup Size']}: <span><span className="stat">{data.SIZE}</span> mb</span></div>
            </Container>
            <Container className="c-2">
              <div>{inc.Type}: <span className="stat">{data.TYPE}</span></div>
            </Container>
            <Container className="c-3">
              <div>{inc['Run Time']}: <span className="stat">{data.RUNTIME} minute</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          {data.UPDATED === 'no' && <div><a href={`/update/vesta/?pkg=${data.NAME}`}>{inc.update} <FontAwesomeIcon icon="wrench" /></a></div>}
          <div><a className="link-download" href={`/download/backup/?backup=${data.NAME}`}>{inc.download} <FontAwesomeIcon icon={faFileDownload} /></a></div>
          <div><a className="link-list" href={`/list/backup/?backup=${data.NAME}`}>{inc['configure restore settings']} <FontAwesomeIcon icon="list" /></a></div>
          <div><a className="link-delete" href={`#`}>{inc.delete} <FontAwesomeIcon icon="times" /></a></div>
        </div>
      </ListItem>
    );
  }
}

export default Backup;