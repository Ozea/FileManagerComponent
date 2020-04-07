import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Spinner from '../../components/Spinner/Spinner';
import User from '../../components/User/User';
import { users } from '../../mocks/users';
import './Users.scss';

class Users extends Component {
  state = {
    users: [],
    loading: false,
    toggleAll: false,
    sorting: "DATE",
    order: "descending",
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
      return <div className="total">{result.length} account</div>;
    } else {
      return <div className="total">{result.length} accounts</div>;
    }
  }

  changeSorting = (sorting, order) => {
    this.setState({ 
      sorting,
      order
     });
  }

  users = () => {
    const { users, toggleAll } = this.state;
    const result = [];

    for (let i in users) {
      users[i]['NAME'] = i;
      result.push(users[i]);
    }

    return result.map((item, index) => {
      return <User data={item} toggled={toggleAll} key={index} />;
    });
  }

  toggleAll = () => {
    this.setState({ toggleAll: !this.state.toggleAll });
  }

  render() {
    return (
      <div>
        <Toolbar mobile={false} >
          <LeftButton name="Add User" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Checkbox toggleAll={this.toggleAll} />
              <Select list='usersList' />
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