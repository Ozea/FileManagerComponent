import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from '../ControlPanel/Container/Container';
import ListItem from '../ControlPanel/ListItem/ListItem';
import { Link } from 'react-router-dom';
import './WebDomain.scss';

class WebDomain extends Component {
  printStat = (stat, text) => {
    if (text === 'no' || text === '') {
      return <div className="crossed">{stat}</div>;
    }

    return <div>{stat}: <span className="stat">{text}</span></div>;
  }

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

  handleSuspend = token => {
    let suspendedStatus = this.props.data.SUSPENDED === 'yes' ? 'unsuspend' : 'suspend';
    this.props.handleModal(this.props.data.spnd_confirmation, `/${suspendedStatus}/web?domain=${this.props.data.NAME}&token=${token}`);
  }

  handleDelete = token => {
    this.props.handleModal(this.props.data.delete_confirmation, `/delete/web/?domain=${this.props.data.NAME}&token=${token}`);
  }

  render() {
    const { data } = this.props;
    const { i18n } = window.GLOBAL.App;
    const token = localStorage.getItem("token");

    return (
      <ListItem
        id={data.NAME}
        checked={data.isChecked}
        starred={data.STARRED}
        date={data.DATE}
        toggleFav={this.toggleFav}
        checkItem={this.checkItem}
        suspended={data.SUSPENDED === 'yes'}
        focused={data.FOCUSED} >
        <Container className="r-col w-85">
          <div className="name">
            <div>{data.NAME}</div>
            <div><span className="dns-name-span">{data.ALIAS}</span></div>
          </div>
          <div>{data.IP}</div>
          <div className="stats">
            <Container className="c-1 w-25">
              <div className="bandwidth">{i18n.Bandwidth} <span><span className="stat">{data.U_BANDWIDTH}</span>{i18n.mb}</span></div>
              <div className="disk">{i18n.Disk}: <span><span className="stat">{data.U_DISK}</span>{i18n.mb}</span></div>
            </Container>
            <Container className="c-2 w-45">
              <div>{i18n['Web Template']}: <span className="stat">{data.TPL}</span></div>
              {this.printStat(i18n['SSL Support'], data.SSL)}
              {this.printStat(i18n['Web Statistics'], data.STATS)}
            </Container>
            <Container className="c-3 w-35">
              <div>Backend Support: <span className="stat">{data.BACKEND}</span></div>
              <div>{i18n['Backend Template']}: <span className="stat">{data.BACKEND}</span></div>
              {this.printStat(i18n['Additional FTP'], data.FTP_USER)}
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div>
            <Link className="link-edit" to={`/edit/web?domain=${data.NAME}`}>
              {i18n.edit}
              {data.FOCUSED ? <span className="shortcut-button html-unicode">&#8617;</span> : <FontAwesomeIcon icon="pen" />}
            </Link>
          </div>
          <div>
            <a className="link-gray" href={`/list/web-log?domain=${data.NAME}&type=access`}>
              {i18n['view logs']}
              {data.FOCUSED ? <span className="shortcut-button">L</span> : <FontAwesomeIcon icon="list" />}
            </a>
          </div>
          {
            data.STATS && (
              <div>
                <a className="link-gray" href={`http://${NAME}/vstats/`}>
                  {i18n['open webstats']}
                  {data.FOCUSED ? <span className="shortcut-button">L</span> : <FontAwesomeIcon icon="list" />}
                </a>
              </div>
            )
          }
          <div>
            <button
              className="link-gray"
              onClick={() => this.handleSuspend(token)}>
              {i18n[data.spnd_action]}
              {data.FOCUSED ? <span className="shortcut-button">S</span> : <FontAwesomeIcon icon={data.SUSPENDED === 'yes' ? 'unlock' : 'lock'} />}
            </button>
          </div>
          <div>
            <button className="link-delete" onClick={() => this.handleDelete(token)}>
              {i18n.Delete}
              {data.FOCUSED ? <span className="shortcut-button del">Del</span> : <FontAwesomeIcon icon="times" />}
            </button>
          </div>
        </div>
      </ListItem>
    );
  }
}

export default WebDomain;