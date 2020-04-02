import React, { Component } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import Statistic from '../../components/Statistic/Statistic';
import { statistics } from '../../mocks/statistics';
import './Statistics.scss';

class Statistics extends Component {
  state = {
    statistics: [],
    loading: false,
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

    if ( result.length < 2 ) {
      return <div className="total">{result.length} month</div>;
    } else {
      return <div className="total">{result.length} months</div>;
    }
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
    return(
      <div className="statistics-list">
        <div className="packages">
        {this.state.loading ? <Spinner /> : this.statistics()}
        {this.totalAmount()}
      </div>
      </div>
    );
  }
}

export default Statistics;