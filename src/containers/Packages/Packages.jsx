import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Package from '../../components/Package/Package';
import Spinner from '../../components/Spinner/Spinner';
import { packages } from '../../mocks/packages';
import './Packages.scss';

class Packages extends Component {
  state = {
    packages: [],
    loading: false,
    toggleAll: false,
    sorting: "DATE",
    order: "descending",
    total: 0
  }

  componentDidMount() {
    this.setState({
      loading: true,
      packages
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { packages } = this.state;
    let result = [];
    
    for (let i in packages) {
      result.push(packages[i]);
    }

    if ( result.length < 2 ) {
      return <div className="total">{result.length} package</div>;
    } else {
      return <div className="total">{result.length} packages</div>;
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

  packages = () => {
    const { packages, toggleAll } = this.state;
    const result = [];

    for (let i in packages) {
      packages[i]['NAME'] = i;
      result.push(packages[i]);
    }

    return result.map((item, index) => {
      return <Package data={item} toggled={toggleAll} key={index} />;
    });
  }

  render() {
    return (
      <div className="packages">
        <Toolbar mobile={false} >
          <LeftButton name="Add Package" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Checkbox toggleAll={this.toggleAll} />
              <Select list='packagesList' />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="packagesList" />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        {this.state.loading ? <Spinner /> : this.packages()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default Packages;
