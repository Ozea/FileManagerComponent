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
    const { i18n } = window.GLOBAL.App;
    const token = localStorage.getItem("token");

    return (
      <ListItem checked={data.isChecked} date={data.DATE} starred={data.STARRED} toggleFav={this.toggleFav} checkItem={this.checkItem} suspended={data.SUSPENDED === 'yes'}>
        <Container className="r-col w-85">
          <div className="name">{data.DATABASE}</div>
          <br />
          <div className="stats">
            <Container className="c-1">
              <div className="disk">{i18n.Disk}: <span><span className="stat">{data.U_DISK}</span>{i18n.mb}</span></div>
            </Container>
            <Container className="c-2">
              <div>{i18n.User}: <span className="stat">{data.DBUSER}</span></div>
              <div>{i18n.Charset}: <span className="stat">{data.CHARSET}</span></div>
            </Container>
            <Container className="c-3">
              <div>{i18n.Host}: <span className="stat">{data.HOST}</span></div>
              <div>{i18n.Type}: <span className="stat">{data.TYPE}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div><a className="link-edit" href={`/edit/db/?database=${data.NAME}`}>{i18n.edit} <FontAwesomeIcon icon="pen" /></a></div>
          <div>
            <button
              className="link-gray"
              onClick={() => this.props.handleModal(data.suspend_conf, `/${data.SUSPENDED === 'yes' ? 'unsuspend' : 'suspend'}/db/?database=${data.NAME}&token=${token}`)}>
              {data.suspend_action}
              <FontAwesomeIcon icon={data.SUSPENDED === 'yes' ? 'unlock' : 'lock'} />
            </button>
          </div>
          <div>
            <button className="link-delete" onClick={() => this.props.handleModal(data.delete_conf, `/delete/db/?database=${data.NAME}&token=${token}`)}>
              {i18n.Delete}
              <FontAwesomeIcon icon="times" />
            </button>
          </div>
        </div>
      </ListItem>
    );
  }
}

export default Database;