import React, { Component } from 'react';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import { bulkAction, getServersList } from '../../ControlPanelService/Server';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
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
    loading: false,
    toggledAll: false,
    sorting: i18n.Action,
    order: "descending",
  }

  componentDidMount() {
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
      return <Server data={item} key={index} checkItem={this.checkItem} />;
    });
  }

  toggleAll = toggled => {
    const { servers, toggledAll } = this.state;
    this.setState({ toggledAll: toggled });

    if (!toggledAll) {
      let serverNames = [];

      for (let i in servers) {
        serverNames.push(i);

        servers[i]['isChecked'] = true;
      }

      this.setState({ servers, selection: serverNames });
    } else {
      for (let i in servers) {
        servers[i]['isChecked'] = false;
      }

      this.setState({ servers, selection: [] });
    }
  }

  bulk = action => {
    const { selection } = this.state;

    if (selection.length && action !== 'apply to selected') {
      this.setState({ loading: true }, () => {
        bulkAction(action, selection)
          .then(result => {
            if (result.status === 200) {
              this.showNotification(`Success`);
              this.setState({ loading: false }, () => {
                this.toggleAll(false);
              });
            }
          })
          .catch(err => console.error(err));
      });
    }
  }

  checkItem = name => {
    const { selection, servers } = this.state;
    let duplicate = [...selection];
    let serversDuplicate = servers;
    let checkedItem = duplicate.indexOf(name);

    serversDuplicate[name]['isChecked'] = !serversDuplicate[name]['isChecked'];

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    this.setState({ servers: serversDuplicate, selection: duplicate });
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
              <Select list='serverList' />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        <div className="sys-info">
          <ServerSys data={this.state.sysInfo} />
        </div>
        <div className="servers-wrapper">
          {this.state.loading ? <Spinner /> : this.servers()}
        </div>
      </div>
    );
  }
}

export default Servers;