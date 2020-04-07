import React, { Component } from 'react';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Spinner from '../../components/Spinner/Spinner';
import Backup from '../../components/Backup/Backup';
import { backups } from '../../mocks/backups';
import './Backups.scss';

class Backups extends Component {
  state = {
    backups: [],
    loading: false,
    toggleAll: false,
    sorting: "DATE",
    order: "descending",
    total: 0
  }

  componentDidMount() {
    this.setState({
      loading: true,
      backups
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { backups } = this.state;
    let result = [];
    
    for (let i in backups) {
      result.push(backups[i]);
    }

    if ( result.length < 2 ) {
      return <div className="total">{result.length} archive</div>;
    } else {
      return <div className="total">{result.length} archives</div>;
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

  backups = () => {
    const { backups, toggleAll } = this.state;
    const result = [];

    for (let i in backups) {
      backups[i].NAME = i;
      result.push(backups[i]);
    }

    return result.map((item, index) => {
      return <Backup data={item} toggled={toggleAll} key={index} />;
    });
  }

  render() {
    return (
      <div className="backups">
        <Toolbar mobile={false} >
          <LeftButton name="Create Backup" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <button className="btn btn-secondary" type="submit">BACKUP EXCLUSIONS</button>
              <Checkbox toggleAll={this.toggleAll} />
              <Select list='backupList' />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        {this.state.loading ? <Spinner /> : this.backups()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default Backups;