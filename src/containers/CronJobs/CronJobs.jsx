import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import CronJob from '../../components/CronJob/CronJob';
import Spinner from '../../components/Spinner/Spinner';
import { cronJobs } from '../../mocks/cronJobs';
import './CronJobs.scss';

class CronJobs extends Component {
  state = {
    cronJobs: [],
    loading: false,
    toggleAll: false,
    sorting: "DATE",
    order: "descending",
    total: 0
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

  changeSorting = (sorting, order) => {
    this.setState({ 
      sorting,
      order
     });
  }

  toggleAll = () => {
    this.setState({ toggleAll: !this.state.toggleAll });
  }

  cronJobs = () => {
    const { cronJobs, toggleAll } = this.state;
    const result = [];

    for (let i in cronJobs) {
      result.push(cronJobs[i]);
    }

    return result.map((item, index) => {
      return <CronJob data={item} toggled={toggleAll} key={index} />;
    });
  }

  render() {
    return (
      <div className="cronJobs">
        <Toolbar mobile={false} >
          <LeftButton name="Add Cron Job" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <button className="btn btn-secondary extra" type="submit">TURN ON NOTIFICATIONS</button>
              <Checkbox toggleAll={this.toggleAll} />
              <Select list='cronList' />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="cronList" />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        {this.state.loading ? <Spinner /> : this.cronJobs()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default CronJobs;
