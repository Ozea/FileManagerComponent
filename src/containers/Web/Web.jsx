import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import WebDomain from '../../components/WebDomain/WebDomain';
import { getWebList } from '../../ControlPanelService/Web';
import Spinner from '../../components/Spinner/Spinner';
import { web, webFavs } from '../../mocks/web';
import './Web.scss';

class Web extends Component {
  state = {
    webDomains: [],
    loading: false,
    toggleAll: false,
    sorting: "DATE",
    order: "descending",
    total: 0
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      getWebList()
        .then(result => {
          this.setState({ webDomains: result.data[0], loading: false });
        })
        .catch(err => console.error(err));
    });
  }

  totalAmount = () => {
    const { webDomains } = this.state;
    let result = [];

    for (let i in webDomains) {
      result.push(webDomains[i]);
    }

    if (result.length < 2) {
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

  webDomains = () => {
    const { webDomains, toggleAll } = this.state;
    const result = [];

    for (let i in webDomains) {
      webDomains[i]['NAME'] = i;

      // if (webFavs[i]) {
      //   webDomains[i]['STARRED'] = webFavs[i];
      // }

      result.push(webDomains[i]);
    }

    return result.map((item, index) => {
      return <WebDomain data={item} toggled={toggleAll} key={index} />;
    });
  }

  render() {
    return (
      <div className="web">
        <Toolbar mobile={false} >
          <LeftButton name="Add Web Domain" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Checkbox toggleAll={this.toggleAll} />
              <Select list='webList' />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="webList" />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        {this.state.loading ? <Spinner /> : this.webDomains()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default Web;