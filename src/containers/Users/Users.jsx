import React, { Component } from 'react';
import User from '../../components/User/User';
import Spinner from '../../components/Spinner/Spinner';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import { users } from '../../mocks/users';
import './Users.scss';

class Users extends Component {
  state = {
    users: [],
    loading: false,
    toggleAll: false,
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

    if ( result.length < 2 ) {
      return <div className="total">{result.length} account</div>;
    } else {
      return <div className="total">{result.length} accounts</div>;
    }
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
        <Toolbar toggleAll={this.toggleAll} showLeftMenu={true} buttonName="Add User" mobile={false} />
        {this.state.loading ? <Spinner /> : this.users()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default Users;
