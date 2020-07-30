import React, { Component } from 'react';
import { getLogsList } from '../../ControlPanelService/Logs';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Spinner from '../../components/Spinner/Spinner';
import Log from '../../components/Log/Log';
import './Logs.scss';

class Logs extends Component {
  state = {
    logs: [],
    totalAmount: '',
    loading: false,
    total: 0
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      getLogsList()
        .then(result => {
          this.setState({
            logs: result.data.data,
            totalAmount: result.data.logsAmount,
            loading: false
          });
        })
        .catch(err => console.error(err));
    });
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
              <SearchInput handleSearchTerm={term => this.props.changeSearchTerm(term)} />
            </div>
          </div>
        </Toolbar>
        <div className="statistics-wrapper">
          {this.state.loading ? <Spinner /> : this.logs()}
        </div>
        <div className="total">{this.state.totalAmount}</div>
      </div>
    );
  }
}

export default Logs;