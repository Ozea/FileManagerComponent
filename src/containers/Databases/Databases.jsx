import React, { Component } from 'react';
import Database from '../../components/Database/Database';
import Spinner from '../../components/Spinner/Spinner';
import { databases } from '../../mocks/databases';
import './Databases.scss';

class Databases extends Component {
  state = {
    databases: [],
    loading: false
  }

  componentDidMount() {
    this.setState({
      loading: true,
      databases
    }, () => this.setState({ loading: false }));
  }

  databases = () => {
    const { databases } = this.state;
    const result = [];

    for (let i in databases) {
      result.push(databases[i]);
    }

    return result.map((item, index) => {
      return <Database data={item} key={index} />;
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? <Spinner /> : this.databases()}
      </div>
    );
  }
}

export default Databases;
