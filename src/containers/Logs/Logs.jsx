import React, { Component } from 'react';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Spinner from '../../components/Spinner/Spinner';
import Log from '../../components/Log/Log';
import { logs } from '../../mocks/logs';
import './Logs.scss';

class Logs extends Component {
  state = {
    logs: [],
    loading: false,
    total: 0
  }

  componentDidMount() {
    this.setState({
      loading: true,
      logs
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { logs } = this.state;
    let result = [];

    for (let i in logs) {
      result.push(logs[i]);
    }

    if (result.length < 2) {
      return <div className="total">{result.length} log record</div>;
    } else {
      return <div className="total">{result.length} log records</div>;
    }
  }

  logs = () => {
    const { logs } = this.state;
    const result = [];

    for (let i in logs) {
      result.push(logs[i]);
    }

    return result.map((item, index) => {
      return <Log data={item} key={index} />;
    });
  }

  render() {
    return (
      <div className="logs-list">
        <Toolbar mobile={false} className="justify-right">
          <LeftButton name="Add Cron Job" showLeftMenu={false} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        {this.state.loading ? <Spinner /> : this.logs()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default Logs;