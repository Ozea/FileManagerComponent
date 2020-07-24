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
    const { i18n } = window.GLOBAL.App;
    const token = localStorage.getItem("token");

    return (
      <ListItem checked={data.isChecked} date={data.DATE} starred={data.STARRED} toggleFav={this.toggleFav} checkItem={this.checkItem}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <div className="stats">
            <Container className="c-1">
              <div>{i18n['Backup Size']}: <span><span className="stat">{data.SIZE}</span>{i18n.mb}</span></div>
            </Container>
            <Container className="c-2">
              <div>{i18n.Type}: <span className="stat">{data.TYPE}</span></div>
            </Container>
            <Container className="c-3">
              <div>{i18n['Run Time']}: <span className="stat">{data.RUNTIME} minute</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          {data.UPDATED === 'no' && <div><a href={`/update/vesta/?pkg=${data.NAME}`}>{i18n.update} <FontAwesomeIcon icon="wrench" /></a></div>}
          <div><a className="link-download" href={`/download/backup/?backup=${data.NAME}`}>{i18n.download} <FontAwesomeIcon icon={faFileDownload} /></a></div>
          <div><a className="link-list" href={`/list/backup/?backup=${data.NAME}`}>{i18n['configure restore settings']} <FontAwesomeIcon icon="list" /></a></div>
          <div>
            <button className="link-delete" onClick={() => this.props.handleModal(data.delete_conf, `/delete/backup?backup=${data.NAME}&token=${token}`)}>
              {i18n.Delete}
              <FontAwesomeIcon icon="times" />
            </button>
          </div>
        </div>
      </ListItem>
    );
  }
}

export default Backup;