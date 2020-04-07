import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Database from '../../components/Database/Database';
import Spinner from '../../components/Spinner/Spinner';
import { databases } from '../../mocks/databases';
import './Databases.scss';

class Databases extends Component {
  state = {
    databases: [],
    loading: false,
    toggleAll: false,
    sorting: "DATE",
    order: "descending",
    total: 0
  }

  componentDidMount() {
    this.setState({
      loading: true,
      databases
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { databases } = this.state;
    let result = [];
    
    for (let i in databases) {
      result.push(databases[i]);
    }

    if ( result.length < 2 ) {
      return <div className="total">{result.length} database</div>;
    } else {
      return <div className="total">{result.length} databases</div>;
    }
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

  databases = () => {
    const { databases, toggleAll } = this.state;
    const result = [];

    for (let i in databases) {
      result.push(databases[i]);
    }

    return result.map((item, index) => {
      return <Database data={item} toggled={toggleAll} key={index} />;
    });
  }

  render() {
    return (
      <div className="databases">
        <Toolbar mobile={false} >
          <LeftButton name="Add Database" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <a href="/phpgpadmin" className="button-extra" type="submit">PHPPGADMIN</a>
              <Checkbox toggleAll={this.toggleAll} />
              <Select list='dbList' />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="dbList" />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        {this.state.loading ? <Spinner /> : this.databases()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default Databases;
