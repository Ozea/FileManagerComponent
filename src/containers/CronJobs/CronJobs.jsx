import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import { bulkAction, getCronList } from '../../ControlPanelService/Cron';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import CronJob from '../../components/CronJob/CronJob';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import './CronJobs.scss';

class CronJobs extends Component {
  state = {
    cronJobs: [],
    cronFav: [],
    loading: false,
    toggleAll: false,
    cronReports: '',
    sorting: window.GLOBAL.App.inc.Date,
    order: "descending",
    selection: [],
    totalAmount: ''
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      getCronList()
        .then(result => {
          this.setState({
            cronJobs: result.data.data,
            cronReports: result.data.cron_reports,
            cronFav: result.data.cron_fav,
            totalAmount: result.data.jobs_amount,
            loading: false
          });
        })
        .catch(err => console.error(err));
    });
  }

  showNotification = text => {
    toast.error(text, {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
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
    const { cronJobs } = this.state;
    const result = [];
    const cronFav = { ...this.state.cronFav };

    for (let i in cronJobs) {
      cronJobs[i]['NAME'] = i;

      if (cronFav[i]) {
        cronJobs[i]['STARRED'] = cronFav[i];
      } else {
        cronJobs[i]['STARRED'] = 0;
      }

      result.push(cronJobs[i]);
    }

    let sortedResult = this.sortArray(result);

    return sortedResult.map((item, index) => {
      return <CronJob data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} />;
    });
  }

  checkItem = name => {
    const { selection, cronJobs } = this.state;
    let duplicate = [...selection];
    let cronDuplicate = cronJobs;
    let checkedItem = duplicate.indexOf(name);

    cronDuplicate[name]['isChecked'] = !cronDuplicate[name]['isChecked'];

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    this.setState({ cronJobs: cronDuplicate, selection: duplicate });
  }

  sortArray = array => {
    const { order, sorting } = this.state;
    let sortBy = this.sortBy(sorting);

    if (order === "descending") {
      return array.sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : ((b[sortBy] < a[sortBy]) ? -1 : 0));
    } else {
      return array.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0));
    }
  }

  sortBy = sorting => {
    const { Date, Command, Starred } = window.GLOBAL.App.inc;

    switch (sorting) {
      case Date: return 'DATE';
      case Command: return 'CMD';
      case Starred: return 'STARRED';
      default: break;
    }
  }

  toggleFav = (value, type) => {
    if (type === 'add') {
      addFavorite(value, 'cron')
        .then(() => { })
        .catch(err => {
          this.showNotification(err)
        });
    } else {
      deleteFavorite(value, 'cron')
        .then(() => { })
        .catch(err => {
          this.showNotification(err)
        });
    }
  }

  toggleAll = toggled => {
    const { cronJobs, toggledAll } = this.state;
    this.setState({ toggledAll: toggled });

    if (!toggledAll) {
      let names = [];

      for (let i in cronJobs) {
        names.push(i);

        cronJobs[i]['isChecked'] = true;
      }

      this.setState({ cronJobs, selection: names });
    } else {
      for (let i in cronJobs) {
        cronJobs[i]['isChecked'] = false;
      }

      this.setState({ cronJobs, selection: [] });
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

  render() {
    return (
      <div className="cronJobs">
        <Toolbar mobile={false} >
          <LeftButton name={window.GLOBAL.App.inc['Add Cron Job']} href="/add/cron" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <a href='#' className="button-extra" type="submit">{this.state.cronReports}</a>
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='cronList' bulkAction={this.bulk} />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="cronList" />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        <div className="cron-wrapper">
          {this.state.loading ? <Spinner /> : this.cronJobs()}
        </div>
        <div className="total">{this.state.totalAmount}</div>
      </div>
    );
  }
}

export default CronJobs;
