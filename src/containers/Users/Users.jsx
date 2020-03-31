import React, { Component } from 'react';
import User from '../../components//User/User';
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
        {this.state.loading ? <Spinner /> : this.users()}
      </div>
    );
  }
}

export default Users;
