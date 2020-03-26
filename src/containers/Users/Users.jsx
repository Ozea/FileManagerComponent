import React, { Component } from 'react';
import MainNav from '../../components/MainNav/MainNav';
import User from '../../components/Users/User/User';
import Spinner from '../../components/Spinner/Spinner';
import { users } from '../../mocks/users';
import './User.scss';

class Users extends Component {
  state = {
    users: [],
    loading: false
  }

  componentDidMount() {
    this.setState({
      loading: true,
      users
    }, () => this.setState({ loading: false }));
  }

  users = () => {
    const { users } = this.state;
    const result = [];

    for (let i in users) {
      users[i]['NAME'] = i;
      result.push(users[i]);
    }

    return result.map((item, index) => {
      return <User data={item} key={index} />;
    });
  }

  render() {
    return (
      <div>
        <MainNav />
        <div className="content">
          {this.state.loading ? <Spinner /> : this.users()}
        </div>
      </div>
    );
  }
}

export default Users;
