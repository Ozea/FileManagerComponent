import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import InternetProtocol from '../../components/InternetProtocol/InternetProtocol';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import { bulkAction, getIpList } from '../../ControlPanelService/Ip';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import './InternetProtocols.scss';

class InternetProtocols extends Component {
  state = {
    internetProtocols: [],
    ipFav: [],
    loading: false,
    toggleAll: false,
    sorting: window.GLOBAL.App.inc.Date,
    order: "descending",
    selection: [],
    totalAmount: ''
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      getIpList()
        .then(result => {
          this.setState({
            internetProtocols: result.data.data,
            ipFav: result.data.ipFav,
            totalAmount: result.data.ipAmount,
            loading: false
          });
        })
        .catch(err => console.error(err));
    });
  }

  showNotification = text => {
    toast.error(text, {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
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
    const { internetProtocols } = this.state;
    const ipFav = { ...this.state.ipFav };
    const result = [];

    for (let i in internetProtocols) {
      internetProtocols[i]['IP'] = i;

      if (ipFav[i]) {
        internetProtocols[i]['STARRED'] = ipFav[i];
      } else {
        internetProtocols[i]['STARRED'] = 0;
      }

      result.push(internetProtocols[i]);
    }

    let sortedResult = this.sortArray(result);

    return sortedResult.map((item, index) => {
      return <InternetProtocol data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} />;
    });
  }

  checkItem = name => {
    const { selection, internetProtocols } = this.state;
    let duplicate = [...selection];
    let internetProtocolsDuplicate = internetProtocols;
    let checkedItem = duplicate.indexOf(name);

    internetProtocolsDuplicate[name]['isChecked'] = !internetProtocolsDuplicate[name]['isChecked'];

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    this.setState({ internetProtocols: internetProtocolsDuplicate, selection: duplicate });
  }

  sortArray = array => {
    const { order, sorting } = this.state;
    let sortBy = this.sortBy(sorting);

    if (order === "descending") {
      return array.sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : ((b[sortBy] < a[sortBy]) ? -1 : 0));
    } else {
      return array.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0));
    }
  }

  sortBy = sorting => {
    const { Date, IP, Domains, Netmask, Interface, Owner, Starred } = window.GLOBAL.App.inc;

    switch (sorting) {
      case Date: return 'DATE';
      case IP: return 'IP';
      case Netmask: return 'NETMASK';
      case Interface: return 'INTERFACE';
      case Domains: return 'U_WEB_DOMAINS';
      case Owner: return 'OWNER';
      case Starred: return 'STARRED';
      default: break;
    }
  }

  toggleFav = (value, type) => {
    if (type === 'add') {
      addFavorite(value, 'ip')
        .then(() => { })
        .catch(err => {
          this.showNotification(err)
        });
    } else {
      deleteFavorite(value, 'ip')
        .then(() => { })
        .catch(err => {
          this.showNotification(err)
        });
    }
  }

  toggleAll = toggled => {
    const { internetProtocols, toggledAll } = this.state;
    this.setState({ toggledAll: toggled });

    if (!toggledAll) {
      let names = [];

      for (let i in internetProtocols) {
        names.push(i);

        internetProtocols[i]['isChecked'] = true;
      }

      this.setState({ internetProtocols, selection: names });
    } else {
      for (let i in internetProtocols) {
        internetProtocols[i]['isChecked'] = false;
      }

      this.setState({ internetProtocols, selection: [] });
    }
  }

  bulk = action => {
    const { selection } = this.state;

    if (selection.length && action !== 'apply to selected') {
      this.setState({ loading: true }, () => {
        bulkAction(action, selection)
          .then(result => {
            if (result.status === 200) {
              this.showNotification(`Success`);
              this.setState({ loading: false }, () => {
                this.toggleAll(false);
              });
            }
          })
          .catch(err => console.error(err));
      });
    }
  }


  render() {
    return (
      <div className="internetProtocols">
        <Toolbar mobile={false} >
          <LeftButton name={window.GLOBAL.App.inc['Add IP']} href="/add/ip/" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='internetProtocolsList' bulkAction={this.bulk} />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="internetProtocolsList" />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        <div className="ip-wrapper">
          {this.state.loading ? <Spinner /> : this.dns()}
        </div>
        <div className="total">{this.state.totalAmount}</div>
      </div>
    );
  }
}

export default InternetProtocols;