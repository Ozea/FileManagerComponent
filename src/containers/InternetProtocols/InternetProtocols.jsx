import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import InternetProtocol from '../../components/InternetProtocol/InternetProtocol';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import { internetProtocols } from '../../mocks/internetProtocols';
import Spinner from '../../components/Spinner/Spinner';
import './InternetProtocols.scss';

class InternetProtocols extends Component {
  state = {
    internetProtocols: [],
    loading: false,
    toggleAll: false,
    sorting: "DATE",
    order: "descending",
    total: 0
  }

  componentDidMount() {
    this.setState({
      loading: true,
      internetProtocols
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { internetProtocols } = this.state;
    let result = [];

    for (let i in internetProtocols) {
      result.push(internetProtocols[i]);
    }

    if (result.length < 2) {
      return <div className="total">{result.length} IP address</div>;
    } else {
      return <div className="total">{result.length} IP addresses</div>;
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

  dns = () => {
    const { internetProtocols, toggleAll } = this.state;
    const result = [];

    for (let i in internetProtocols) {
      internetProtocols[i].NAME = i;
      result.push(internetProtocols[i]);
    }

    return result.map((item, index) => {
      return <InternetProtocol data={item} toggled={toggleAll} key={index} />;
    });
  }

  render() {
    return (
      <div className="internetProtocols">
        <Toolbar mobile={false} >
          <LeftButton name="Add IP Address" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Checkbox toggleAll={this.toggleAll} />
              <Select list='internetProtocolsList' />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="internetProtocolsList" />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        {this.state.loading ? <Spinner /> : this.dns()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default InternetProtocols;