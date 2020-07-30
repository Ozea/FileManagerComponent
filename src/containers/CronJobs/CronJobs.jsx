import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import { bulkAction, getCronList, handleAction } from '../../ControlPanelService/Cron';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Modal from '../../components/ControlPanel/Modal/Modal';
import CronJob from '../../components/CronJob/CronJob';
import Spinner from '../../components/Spinner/Spinner';
import './CronJobs.scss';

const { i18n } = window.GLOBAL.App;

class CronJobs extends Component {
  state = {
    cronJobs: [],
    cronFav: [],
    loading: false,
    toggleAll: false,
    modalText: '',
    modalVisible: false,
    modalActionUrl: '',
    cronReports: '',
    sorting: i18n.Date,
    order: "descending",
    selection: [],
    totalAmount: ''
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true }, () => {
      getCronList()
        .then(result => {
          this.setState({
            cronJobs: result.data.data,
            cronReports: result.data.cron_reports,
            cronFav: result.data.cron_fav,
            totalAmount: result.data.totalAmount,
            loading: false
          });
          this.toggleAll(false);
        })
        .catch(err => console.error(err));
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
      return <CronJob data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} handleModal={this.displayModal} />;
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
    const { Date, Command, Starred } = window.GLOBAL.App.i18n;

    switch (sorting) {
      case Date: return 'DATE';
      case Command: return 'CMD';
      case Starred: return 'STARRED';
      default: break;
    }
  }

  toggleFav = (value, type) => {
    const { cronFav } = this.state;
    let cronFavDuplicate = cronFav;

    if (type === 'add') {
      cronFavDuplicate[value] = 1;

      addFavorite(value, 'cron')
        .then(() => {
          this.setState({ cronFav: cronFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      cronFavDuplicate[value] = undefined;

      deleteFavorite(value, 'cron')
        .then(() => {
          this.setState({ cronFav: cronFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  toggleAll = toggled => {
    const { cronJobs } = this.state;
    this.setState({ toggledAll: toggled }, () => {
      if (this.state.toggledAll) {
        let cronJobNames = [];

        for (let i in cronJobs) {
          cronJobNames.push(i);

          cronJobs[i]['isChecked'] = true;
        }

        this.setState({ cronJobs, selection: cronJobNames });
      } else {
        for (let i in cronJobs) {
          cronJobs[i]['isChecked'] = false;
        }

        this.setState({ cronJobs, selection: [] });
      }
    });
  }

  bulk = action => {
    const { selection } = this.state;

    if (selection.length && action) {
      this.setState({ loading: true }, () => {
        bulkAction(action, selection)
          .then(result => {
            if (result.status === 200) {
              this.fetchData();
              this.toggleAll(false);
            }
          })
          .catch(err => console.error(err));
      });
    }
  }

  displayModal = (text, url) => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalText: text,
      modalActionUrl: url
    });
  }

  modalConfirmHandler = () => {
    handleAction(this.state.modalActionUrl)
      .then(() => {
        this.fetchData();
        this.modalCancelHandler();
      })
      .catch(err => console.error(err));
  }

  modalCancelHandler = () => {
    this.setState({
      modalVisible: false,
      modalText: '',
      modalActionUrl: ''
    });
  }

  handleCronNotifications = () => {
    const token = localStorage.getItem("token");

    if (this.state.cronReports === 'yes') {
      handleAction(`/delete/cron/reports/?token=${token}`)
        .then(() => this.fetchData())
        .catch(err => console.error(err));
    } else {
      handleAction(`/add/cron/reports/?token=${token}`)
        .then(() => this.fetchData())
        .catch(err => console.error(err));
    }
  }

  render() {
    const { cronReports, modalVisible, modalText, totalAmount, loading, sorting, order, toggledAll } = this.state;

    return (
      <div className="cronJobs">
        <Toolbar mobile={false} >
          <LeftButton name={i18n['Add Cron Job']} href="/add/cron" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <button onClick={this.handleCronNotifications} className="button-extra" type="submit">
                {cronReports === 'yes' ? i18n['turn off notifications'] : i18n['turn on notifications']}
              </button>
              <Checkbox toggleAll={this.toggleAll} toggled={toggledAll} />
              <Select list='cronList' bulkAction={this.bulk} />
              <DropdownFilter changeSorting={this.changeSorting} sorting={sorting} order={order} list="cronList" />
              <SearchInput handleSearchTerm={term => this.props.changeSearchTerm(term)} />
            </div>
          </div>
        </Toolbar>
        <div className="cron-wrapper">
          {loading ? <Spinner /> : this.cronJobs()}
        </div>
        <div className="total">{totalAmount}</div>
        <Modal
          onSave={this.modalConfirmHandler}
          onCancel={this.modalCancelHandler}
          show={modalVisible}
          text={modalText} />
      </div>
    );
  }
}

export default CronJobs;