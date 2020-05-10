import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Spinner from '../../components/Spinner/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import { users, userFav } from '../../mocks/users';
import { bulkAction } from '../../ControlPanelService/Users';
import User from '../../components/User/User';
import './Users.scss';

class Users extends Component {
  state = {
    users: [],
    loading: false,
    toggledAll: false,
    sorting: window.GLOBAL.App.toolbar.sort.Date,
    order: "descending",
    selection: [],
    total: 0
  }

  componentDidMount() {
    this.setState({
      loading: true,
      users
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { users } = this.state;
    let result = [];

    for (let i in users) {
      result.push(users[i]);
    }

    if (result.length < 2) {
      return <div className="total">{window.GLOBAL.App.userI18N.ACCOUNT}</div>;
    } else {
      return <div className="total">{window.GLOBAL.App.userI18N.ACCOUNTS}</div>;
    }
  }

  changeSorting = (sorting, order) => {
    this.setState({
      sorting,
      order
    });
  }

  showNotification = text => {
    toast.success(text, {
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
    switch (sorting) {
      case 'Date': return 'DATE';
      case 'Username': return 'NAME';
      case 'Disk': return 'U_DISK';
      case 'Bandwidth': return 'U_BANDWIDTH';
      case 'Starred': return 'STARRED';
      default: break;
    }
  }

  toggleFav = (value, type) => {
    if (type === 'add') {
      addFavorite(value, 'user')
        .then(() => {
          this.showNotification(`${value} has been added to favourites.`)
        })
        .catch(err => console.log(err));
    } else {
      deleteFavorite(value, 'user')
        .then(() => {
          this.showNotification(`${value} has been deleted from favourites.`)
        })
        .catch(err => console.log(err));
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
        <ToastContainer position="bottom-center" />
        <Toolbar mobile={false} >
          <LeftButton name="Add User" href="/add/user/" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='usersList' bulkAction={this.bulk} />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="usersList" />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        {this.state.loading ? <Spinner /> : this.users()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default Users;