import React, { Component } from 'react';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Spinner from '../../components/Spinner/Spinner';
import Update from '../../components/Update/Update';
import { updates } from '../../mocks/updates';
import './Updates.scss';

class Updates extends Component {
  state = {
    updates: [],
    loading: false,
    toggleAll: false
  }

  componentDidMount() {
    this.setState({
      loading: true,
      updates
    }, () => this.setState({ loading: false }));
  }

  updates = () => {
    const { updates, toggleAll } = this.state;
    const result = [];

    for (let i in updates) {
      updates[i]['NAME'] = i;
      result.push(updates[i]);
    }

    return result.map((item, index) => {
      return <Update data={item} toggled={toggleAll} key={index} />;
    });
  }

  toggleAll = () => {
    this.setState({ toggleAll: !this.state.toggleAll });
  }

  render() {
    return (
      <div className="statistics-list updates">
        <Toolbar mobile={false} className="justify-right">
          <LeftButton name="Add Cron Job" showLeftMenu={false} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <button className="btn btn-secondary extra" type="submit">ENABLE AUTOUPDATE</button>
              <Checkbox toggleAll={this.toggleAll} />
              <Select list='statisticsList' />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        {this.state.loading ? <Spinner /> : this.updates()}
      </div>
    );
  }
}

export default Updates;