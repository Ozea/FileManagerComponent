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
          <div className="name">{data.NAME}</div>
          <div className="stats">
            <Container className="c-1">
              <div className="bandwidth">{i18n.Disk} <span><span className="stat">{data.U_DISK}</span>{i18n.mb}</span></div>
            </Container>
            <Container className="c-2">
              {this.printStat(i18n['AntiVirus Support'], data.ANTIVIRUS)}
              {this.printStat(i18n['DKIM Support'], data.DKIM)}
            </Container>
            <Container className="c-3">
              {this.printStat(i18n['AntiSpam Support'], data.ANTISPAM)}
              <div>{i18n['Catchall email']}: <span className="stat">{data.CATCHALL}</span></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div><a className="link-gray" href={`/list/mail/?domain=${data.NAME}`}>{data.list_accounts_button} <FontAwesomeIcon icon="list" /></a></div>
          <div><a className="link-edit" href={`/add/mail/?domain=${data.NAME}`}>{i18n['add account']} <FontAwesomeIcon icon="plus" /></a></div>
          <div><a className="link-edit" href={`/edit/mail/?domain=${data.NAME}`}>{i18n.edit} <FontAwesomeIcon icon="pen" /></a></div>
          <div>
            <button
              className="link-gray"
              onClick={() => this.props.handleModal(data.suspend_conf, `/${data.SUSPENDED === 'yes' ? 'unsuspend' : 'suspend'}/mail?domain=${data.NAME}&token=${token}`)}>
              {data.suspend_action}
              <FontAwesomeIcon icon={data.SUSPENDED === 'yes' ? 'unlock' : 'lock'} />
            </button>
          </div>
          <div>
            <button className="link-delete" onClick={() => this.props.handleModal(data.delete_conf, `/delete/mail?domain=${data.NAME}&token=${token}`)}>
              {i18n.Delete}
              <FontAwesomeIcon icon="times" />
            </button>
          </div>
        </div>
      </ListItem>
    );
  }
}

export default Mail;