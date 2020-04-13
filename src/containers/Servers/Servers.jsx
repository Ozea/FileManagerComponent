import React, { Component } from 'react';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import ServerSys from '../../components/Server/ServerSys';
import Spinner from '../../components/Spinner/Spinner';
import Server from '../../components/Server/Server';
import { serverSys } from '../../mocks/serverSys';
import { servers } from '../../mocks/servers';
import './Servers.scss';

class Servers extends Component {
  state = {
    servers: [],
    loading: false,
    toggleAll: false
  }

  componentDidMount() {
    this.setState({
      loading: true,
      servers
    }, () => this.setState({ loading: false }));
  }

  servers = () => {
    const { servers, toggleAll } = this.state;
    const result = [];

    for (let i in servers) {
      servers[i]['NAME'] = i;
      result.push(servers[i]);
    }

    return result.map((item, index) => {
      return <Server data={item} toggled={toggleAll} key={index} />;
    });
  }

  toggleAll = () => {
    this.setState({ toggleAll: !this.state.toggleAll });
  }

  render() {
    return (
      <div className="statistics-list servers">
        <Toolbar mobile={false}>
          <LeftButton list="server" name="Configure" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <button className="btn btn-secondary extra" type="submit">SHOW: CPU / MEM / NET / DISK</button>
              <Checkbox toggleAll={this.toggleAll} />
              <Select list='statisticsList' />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        <ServerSys data={serverSys.sysinfo} toggled={this.state.toggleAll} />
        {this.state.loading ? <Spinner /> : this.servers()}
      </div>
    );
  }
}

export default Servers;