import React, { Component } from 'react';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { getStatisticsList } from '../../ControlPanelService/Statistics';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Statistic from '../../components/Statistic/Statistic';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import './Statistics.scss';

class Statistics extends Component {
  state = {
    statistics: [],
    users: [],
    totalAmount: '',
    loading: false,
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { search } = this.props.location;
    let user = search ? search.split('=')[1] : '';

    this.setState({ loading: true }, () => {
      getStatisticsList(user)
        .then(result => {
          this.setState({
            statistics: result.data.data,
            users: result.data.users,
            totalAmount: result.data.statsAmount,
            loading: false
          });
        })
        .catch(err => console.error(err));
    });
  }

  statistics = () => {
    const { statistics } = this.state;
    const result = [];

    for (let i in statistics) {
      statistics[i]['DATE'] = i;
      result.push(statistics[i]);
    }

    return result.map((item, index) => {
      return <Statistic data={item} key={index} />;
    });
  }

  bulkAction = value => {
    let user = value !== ( window.GLOBAL.App.i18n['show per user'] || '' ) ? `?user=${value}` : '';
    this.props.history.push({ search: user });
    this.fetchData();
  };

  render() {
    return (
      <div className="statistics-list">
        <Toolbar mobile={false} className="justify-right">
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Link to="/list/stats/" className="button-extra" type="submit">{window.GLOBAL.App.i18n['Overall Statistics']}</Link>
              <Select list='statisticsList' users={this.state.users} bulkAction={this.bulkAction} />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        <div className="statistics-wrapper">
          {this.state.loading ? <Spinner /> : this.statistics()}
        </div>
        <div className="total">{this.state.totalAmount}</div>
      </div>
    );
  }
}

export default Statistics;