import React, { Component } from 'react';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Statistic from '../../components/Statistic/Statistic';
import Spinner from '../../components/Spinner/Spinner';
import { statistics } from '../../mocks/statistics';
import './Statistics.scss';

class Statistics extends Component {
  state = {
    statistics: [],
    loading: false,
    sorting: "DATE",
    order: "descending",
    total: 0
  }

  componentDidMount() {
    this.setState({
      loading: true,
      statistics
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { statistics } = this.state;
    let result = [];

    for (let i in statistics) {
      result.push(statistics[i]);
    }

    if (result.length < 2) {
      return <div className="total">{result.length} month</div>;
    } else {
      return <div className="total">{result.length} months</div>;
    }
  }

  changeSorting = (sorting, order) => {
    this.setState({ 
      sorting,
      order
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

  render() {
    return (
      <div className="statistics-list">
        <Toolbar mobile={false} className="justify-right">
          <LeftButton name="Add Cron Job" showLeftMenu={false} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <button className="btn btn-secondary extra" type="submit">OVERALL STATISTICS</button>
              <Select list='statisticsList' />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        {this.state.loading ? <Spinner /> : this.statistics()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default Statistics;