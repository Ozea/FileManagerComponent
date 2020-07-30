import React, { Component } from 'react';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import { bulkAction, getServersList, handleAction } from '../../ControlPanelService/Server';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Modal from '../../components/ControlPanel/Modal/Modal';
import ServerSys from '../../components/Server/ServerSys';
import Spinner from '../../components/Spinner/Spinner';
import Server from '../../components/Server/Server';
import './Servers.scss';

const { i18n } = window.GLOBAL.App;

class Servers extends Component {
  state = {
    servers: [],
    selection: [],
    sysInfo: {},
    modalText: '',
    modalVisible: false,
    modalActionUrl: '',
    loading: false,
    toggledAll: false,
    sorting: i18n.Action,
    order: "descending",
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true }, () => {
      getServersList()
        .then(result => {
          this.setState({
            servers: result.data.data,
            sysInfo: result.data.sys.sysinfo,
            loading: false
          });
        })
        .catch(err => console.error(err));
    });
  }

  servers = () => {
    const { servers } = this.state;
    const result = [];

    for (let i in servers) {
      servers[i]['NAME'] = i;
      result.push(servers[i]);
    }

    return result.map((item, index) => {
      return <Server data={item} key={index} checkItem={this.checkItem} handleModal={this.displayModal} />;
    });
  }

  toggleAll = toggled => {
    const { servers, sysInfo } = this.state;
    let sysInfoServer = sysInfo;

    this.setState({ toggledAll: toggled }, () => {
      if (this.state.toggledAll) {
        let serverNames = [];

        for (let i in servers) {
          serverNames.push(i);

          servers[i]['isChecked'] = true;
        }

        sysInfoServer['isChecked'] = true;
        serverNames.push(sysInfoServer.HOSTNAME);

        this.setState({ servers, selection: serverNames, sysInfo: sysInfoServer });
      } else {
        for (let i in servers) {
          servers[i]['isChecked'] = false;
        }

        sysInfoServer['isChecked'] = false;

        this.setState({ servers, selection: [], sysInfo: sysInfoServer });
      }
    });
  }

  bulk = action => {
    const { selection } = this.state;

    if (selection.length && action) {
      this.setState({ loading: true }, () => {
        bulkAction(action, selection)
          .then(result => {
            if (result.status === 200) {
              this.fetchData();
              this.toggleAll(false);
            }
          })
          .catch(err => console.error(err));
      });
    }
  }

  displayModal = (text, url) => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalText: text,
      modalActionUrl: url
    });
  }

  modalConfirmHandler = () => {
    handleAction(this.state.modalActionUrl)
      .then(() => {
        this.fetchData();
        this.modalCancelHandler();
      })
      .catch(err => console.error(err));
  }

  modalCancelHandler = () => {
    this.setState({
      modalVisible: false,
      modalText: '',
      modalActionUrl: ''
    });
  }

  checkItem = name => {
    const { selection, servers, sysInfo } = this.state;
    let duplicate = [...selection];
    let serversDuplicate = servers;
    let serverSysInfoDuplicate = sysInfo;
    let checkedItem = duplicate.indexOf(name);

    if (serversDuplicate[name]) {
      serversDuplicate[name]['isChecked'] = !serversDuplicate[name]['isChecked'];
    } else {
      serverSysInfoDuplicate['isChecked'] = !serverSysInfoDuplicate['isChecked'];
    }

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    this.setState({ servers: serversDuplicate, selection: duplicate, sysInfo: serverSysInfoDuplicate });
  }

  render() {
    return (
      <div className="servers-list">
        <Toolbar mobile={false}>
          <LeftButton href="/edit/server/" list="server" name={i18n.configure} showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <a href="/list/server/?cpu" className="button-extra">{i18n['show: CPU / MEM / NET / DISK']}</a>
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='serverList' bulkAction={this.bulk} />
              <SearchInput handleSearchTerm={term => this.props.changeSearchTerm(term)} />
            </div>
          </div>
        </Toolbar>
        {this.state.loading ? <Spinner /> :
          (
            <React.Fragment>
              <div className="sys-info">
                <ServerSys data={this.state.sysInfo} checkItem={this.checkItem} handleModal={this.displayModal} />
              </div>
              <div className="servers-wrapper">
                {this.servers()}
              </div>
            </React.Fragment>
          )
        }
        <Modal
          onSave={this.modalConfirmHandler}
          onCancel={this.modalCancelHandler}
          show={this.state.modalVisible}
          text={this.state.modalText} />
      </div>
    );
  }
}

export default Servers;