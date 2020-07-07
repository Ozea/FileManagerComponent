import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import { bulkAction, getUsersList } from '../../ControlPanelService/Users';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import User from '../../components/User/User';
import './Users.scss';

const { inc } = window.GLOBAL.App;

class Users extends Component {
  state = {
    users: [],
    userFav: [],
    loading: false,
    toggledAll: false,
    sorting: inc.Date,
    order: "descending",
    selection: [],
    totalAmount: ''
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      getUsersList()
        .then(result => {
          this.setState({
            users: result.data.data,
            userFav: result.data.userFav,
            totalAmount: result.data.account_amount,
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

  users = () => {
    const { users } = this.state;
    const result = [];
    const userFav = { ...this.state.userFav };

    for (let i in users) {
      users[i]['NAME'] = i;

      if (userFav[i]) {
        users[i]['STARRED'] = userFav[i];
      } else {
        users[i]['STARRED'] = 0;
      }

      result.push(users[i]);
    }

    let sortedResult = this.sortArray(result);

    return sortedResult.map((item, index) => {
      return <User data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} />;
    });
  }

  checkItem = name => {
    const { selection, users } = this.state;
    let duplicate = [...selection];
    let usersDuplicate = users;
    let checkedItem = duplicate.indexOf(name);

    usersDuplicate[name]['isChecked'] = !usersDuplicate[name]['isChecked'];

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    this.setState({ users: usersDuplicate, selection: duplicate });
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
    const { Date, Username, Disk, Bandwidth, Starred } = window.GLOBAL.App.inc;

    switch (sorting) {
      case Date: return 'DATE';
      case Username: return 'NAME';
      case Disk: return 'U_DISK';
      case Bandwidth: return 'U_BANDWIDTH';
      case Starred: return 'STARRED';
      default: break;
    }
  }

  toggleFav = (value, type) => {
    if (type === 'add') {
      addFavorite(value, 'user')
        .then(() => { })
        .catch(err => {
          this.showNotification(err)
        });
    } else {
      deleteFavorite(value, 'user')
        .then(() => { })
        .catch(err => {
          this.showNotification(err)
        });
    }
  }

  toggleAll = toggled => {
    const { users, toggledAll } = this.state;
    this.setState({ toggledAll: toggled });

    if (!toggledAll) {
      let userNames = [];

      for (let i in users) {
        userNames.push(i);

        users[i]['isChecked'] = true;
      }

      this.setState({ users, selection: userNames });
    } else {
      for (let i in users) {
        users[i]['isChecked'] = false;
      }

      this.setState({ users, selection: [] });
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
      <div>
        <Toolbar mobile={false} >
          <LeftButton name={inc['Add User']} href="/add/user/" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='usersList' bulkAction={this.bulk} />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="usersList" />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        <div className="users-wrapper">
          {this.state.loading ? <Spinner /> : this.users()}
        </div>
        <div className="total">{this.state.totalAmount}</div>
      </div>
    );
  }
}

export default Users;