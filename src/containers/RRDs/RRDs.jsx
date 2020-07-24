import React, { Component } from 'react';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import { getRrdList } from '../../ControlPanelService/RRD';
import Spinner from '../../components/Spinner/Spinner';
import RRD from '../../components/RRD/RRD';
import './RRDs.scss';
import Timer from '../../components/RRD/Timer/Timer';

const { i18n } = window.GLOBAL.App;

class RRDs extends Component {
  state = {
    rrds: [],
    period: 'daily',
    periodI18N: i18n.Daily,
    time: 15,
    loading: false,
    total: 0
  }

  componentDidMount() {
    this.fetchData();
  }

  countDown = () => {
    if (this.state.time === 0) {
      this.setState({ time: 14, period: this.state.period });
    } else {
      this.setState({ time: this.state.time - 1 });
    }
  }

  fetchData = () => {
    this.setState({ loading: true }, () => {
      getRrdList()
        .then(result => {
          this.setState({
            rrds: result.data.data,
            loading: false
          });
        })
        .catch(err => console.error(err));
    });
  }

  packages = () => {
    const { rrds, period } = this.state;
    const result = [];

    for (let i in rrds) {
      rrds[i]['NAME'] = i;

      result.push(rrds[i]);
    }

    return result.map((item, index) => {
      return <RRD period={period} data={item} key={index} />;
    });
  }

  printPeriods = () => {
    const periods = [i18n.Daily, i18n.Weekly, i18n.Monthly, i18n.Yearly];

    return periods.map(period => (<div className={this.periodClass(period)} onClick={() => this.changePeriod(period)}>{period}</div>));
  }

  periodClass = period => {
    if (this.state.periodI18N === period) {
      return "period active";
    } else {
      return "period";
    }
  }

  changePeriod = period => {
    switch (period) {
      case i18n.Daily: this.setState({ period: 'daily', periodI18N: i18n.Daily, time: 15 }); break;
      case i18n.Weekly: this.setState({ period: 'weekly', periodI18N: i18n.Weekly, time: 15 }); break;
      case i18n.Monthly: this.setState({ period: 'monthly', periodI18N: i18n.Monthly, time: 15 }); break;
      case i18n.Yearly: this.setState({ period: 'yearly', periodI18N: i18n.Yearly, time: 15 }); break;
      default: break;
    }
  }

  render() {
    return (
      <div className="rrd-list">
        <Toolbar mobile={false}>
          <div className="periods-wrapper">
            {this.printPeriods()}
            <Timer time={this.state.time} countDown={this.countDown} />
          </div>
          <SearchInput />
        </Toolbar>
        <div className="rrd-wrapper">
          {this.state.loading ? <Spinner /> : this.packages()}
        </div>
      </div>
    );
  }
}

export default RRDs;