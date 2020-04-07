import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import DomainNameSystem from '../../components/DomainNameSystem/DomainNameSystem';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Spinner from '../../components/Spinner/Spinner';
import { domainNameSystems } from '../../mocks/dns';
import './DomainNameSystems.scss';

class DomainNameSystems extends Component {
  state = {
    domainNameSystems: [],
    loading: false,
    toggleAll: false,
    sorting: "DATE",
    order: "descending",
    total: 0
  }

  componentDidMount() {
    this.setState({
      loading: true,
      domainNameSystems
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { domainNameSystems } = this.state;
    let result = [];
    
    for (let i in domainNameSystems) {
      result.push(domainNameSystems[i]);
    }

    if ( result.length < 2 ) {
      return <div className="total">{result.length} domain</div>;
    } else {
      return <div className="total">{result.length} domains</div>;
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
    const { domainNameSystems, toggleAll } = this.state;
    const result = [];

    for (let i in domainNameSystems) {
      domainNameSystems[i].NAME = i;
      result.push(domainNameSystems[i]);
    }

    return result.map((item, index) => {
      return <DomainNameSystem data={item} toggled={toggleAll} key={index} />;
    });
  }

  render() {
    return (
      <div className="dns">
        <Toolbar mobile={false} >
          <LeftButton name="Add DNS Domain" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Checkbox toggleAll={this.toggleAll} />
              <Select list='dnsList' />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="dnsList" />
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

export default DomainNameSystems;