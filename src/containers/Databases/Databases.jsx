import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import { bulkAction, getDatabaseList, handleAction } from '../../ControlPanelService/Db';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Modal from '../../components/ControlPanel/Modal/Modal';
import Database from '../../components/Database/Database';
import Spinner from '../../components/Spinner/Spinner';
import './Databases.scss';

class Databases extends Component {
  state = {
    databases: [],
    dbFav: [],
    loading: false,
    toggleAll: false,
    modalText: '',
    modalVisible: false,
    modalActionUrl: '',
    dbAdmin: '',
    dbAdminLink: '',
    sorting: window.GLOBAL.App.i18n.Date,
    order: "descending",
    selection: [],
    totalAmount: ''
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true }, () => {
      getDatabaseList()
        .then(result => {
          this.setState({
            databases: result.data.data,
            dbAdmin: result.data.db_admin,
            dbAdminLink: result.data.db_admin_link,
            dbFav: result.data.dbFav,
            totalAmount: result.data.domain_amount,
            loading: false
          });
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

  databases = () => {
    const { databases } = this.state;
    const result = [];
    const dbFav = { ...this.state.dbFav };

    for (let i in databases) {
      databases[i]['NAME'] = i;

      if (dbFav[i]) {
        databases[i]['STARRED'] = dbFav[i];
      } else {
        databases[i]['STARRED'] = 0;
      }

      result.push(databases[i]);
    }

    let sortedResult = this.sortArray(result);

    return sortedResult.map((item, index) => {
      return <Database data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} handleModal={this.displayModal} />;
    });
  }

  checkItem = name => {
    const { selection, databases } = this.state;
    let duplicate = [...selection];
    let dbDuplicate = databases;
    let checkedItem = duplicate.indexOf(name);

    dbDuplicate[name]['isChecked'] = !dbDuplicate[name]['isChecked'];

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    this.setState({ databases: dbDuplicate, selection: duplicate });
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
    const { Date, Database, Disk, User, Host, Starred } = window.GLOBAL.App.i18n;

    switch (sorting) {
      case Date: return 'DATE';
      case Database: return 'DATABASE';
      case Disk: return 'U_DISK';
      case User: return 'DBUSER';
      case Host: return 'HOST';
      case Starred: return 'STARRED';
      default: break;
    }
  }

  toggleFav = (value, type) => {
    const { dbFav } = this.state;
    let dbFavDuplicate = dbFav;

    if (type === 'add') {
      dbFavDuplicate[value] = 1;

      addFavorite(value, 'db')
        .then(() => {
          this.setState({ dbFav: dbFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      dbFavDuplicate[value] = undefined;

      deleteFavorite(value, 'db')
        .then(() => {
          this.setState({ dbFav: dbFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  toggleAll = toggled => {
    const { databases } = this.state;
    this.setState({ toggledAll: toggled }, () => {
      if (this.state.toggledAll) {
        let dbNames = [];

        for (let i in databases) {
          dbNames.push(i);

          databases[i]['isChecked'] = true;
        }

        this.setState({ databases, selection: dbNames });
      } else {
        for (let i in databases) {
          databases[i]['isChecked'] = false;
        }

        this.setState({ databases, selection: [] });
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

  render() {
    return (
      <div className="databases">
        <Toolbar mobile={false} >
          <LeftButton name="Add Database" href="/add/db" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <a href={this.state.dbAdminLink} className="button-extra" type="submit">{this.state.db_admin}</a>
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='dbList' bulkAction={this.bulk} />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="dbList" />
              <SearchInput handleSearchTerm={term => this.props.changeSearchTerm(term)} />
            </div>
          </div>
        </Toolbar>
        <div className="mails-wrapper">
          {this.state.loading ? <Spinner /> : this.databases()}
        </div>
        <div className="total">{this.state.totalAmount}</div>
        <Modal
          onSave={this.modalConfirmHandler}
          onCancel={this.modalCancelHandler}
          show={this.state.modalVisible}
          text={this.state.modalText} />
      </div>
    );
  }
}

export default Databases;
