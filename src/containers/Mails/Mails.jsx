import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import Mail from '../../components/Mail/Mail';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Spinner from '../../components/Spinner/Spinner';
import { mails } from '../../mocks/mails';
import './Mails.scss';

class Mails extends Component {
  state = {
    mails: [],
    loading: false,
    toggleAll: false,
    sorting: "DATE",
    order: "descending",
    total: 0
  }

  componentDidMount() {
    this.setState({
      loading: true,
      mails
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { mails } = this.state;
    let result = [];
    
    for (let i in mails) {
      result.push(mails[i]);
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

  mails = () => {
    const { mails, toggleAll } = this.state;
    const result = [];

    for (let i in mails) {
      mails[i].NAME = i;
      result.push(mails[i]);
    }

    return result.map((item, index) => {
      return <Mail data={item} toggled={toggleAll} key={index} />;
    });
  }

  render() {
    return (
      <div className="mails">
        <Toolbar mobile={false} >
          <LeftButton name="Add DNS Domain" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <a href="/webmail" className="button-extra" type="submit">OPEN WEBMAIL</a>
              <Checkbox toggleAll={this.toggleAll} />
              <Select list='mailList' />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="mailList" />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        {this.state.loading ? <Spinner /> : this.mails()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default Mails;