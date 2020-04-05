import React, { Component } from 'react';
import CronJob from '../../components/CronJob/CronJob';
import Spinner from '../../components/Spinner/Spinner';
import { cronJobs } from '../../mocks/cronJobs';
import './CronJobs.scss';

class CronJobs extends Component {
  state = {
    cronJobs: [],
    loading: false
  }

  componentDidMount() {
    this.setState({
      loading: true,
      cronJobs
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { cronJobs } = this.state;
    let result = [];
    
    for (let i in cronJobs) {
      result.push(cronJobs[i]);
    }

    if ( result.length < 2 ) {
      return <div className="total">{result.length} cron job</div>;
    } else {
      return <div className="total">{result.length} cron jobs</div>;
    }
  }

  cronJobs = () => {
    const { cronJobs } = this.state;
    const result = [];

    for (let i in cronJobs) {
      result.push(cronJobs[i]);
    }

    return result.map((item, index) => {
      return <CronJob data={item} key={index} />;
    });
  }

  render() {
    return (
      <div className="cronJobs">
        {this.state.loading ? <Spinner /> : this.cronJobs()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default CronJobs;
