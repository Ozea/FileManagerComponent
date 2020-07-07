import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import { bulkAction, getFirewallList } from '../../ControlPanelService/Firewalls';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Firewall from '../../components/Firewall/Firewall';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import './Firewalls.scss';

const { inc } = window.GLOBAL.App;

class Firewalls extends Component {
  state = {
    firewalls: [],
    firewallFav: [],
    selection: [],
    firewallExtension: '',
    loading: false,
    toggledAll: false,
    sorting: inc.Action,
    order: "descending",
    totalAmount: ''
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      getFirewallList()
        .then(result => {
          this.setState({
            firewalls: result.data.data,
            firewallFav: result.data.firewallFav,
            firewallExtension: result.data.firewallExtension,
            totalAmount: result.data.account_amount,
            loading: false
          });
        })
        .catch(err => console.error(err));
    });
  }

  changeSorting = (sorting, order) => {
    this.setState({
      sorting,
      order
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

  firewalls = () => {
    const { firewalls } = this.state;
    const firewallFav = { ...this.state.firewallFav };
    const result = [];

    for (let i in firewalls) {
      firewalls[i]['NAME'] = i;

      if (firewallFav[i]) {
        firewalls[i]['STARRED'] = firewallFav[i];
      } else {
        firewalls[i]['STARRED'] = 0;
      }

      result.push(firewalls[i]);
    }

    let sortedResult = this.sortArray(result);

    return sortedResult.map((item, index) => {
      return <Firewall data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} />;
    });
  }

  checkItem = name => {
    const { selection, firewalls } = this.state;
    let duplicate = [...selection];
    let firewallsDuplicate = firewalls;
    let checkedItem = duplicate.indexOf(name);

    firewallsDuplicate[name]['isChecked'] = !firewallsDuplicate[name]['isChecked'];

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    this.setState({ firewalls: firewallsDuplicate, selection: duplicate });
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
    const { Action, Protocol, Port, Comment, Starred } = window.GLOBAL.App.inc;

    switch (sorting) {
      case Action: return 'ACTION';
      case Protocol: return 'PROTOCOL';
      case Port: return 'PORT';
      case inc['IP address']: return 'IP';
      case Comment: return 'COMMENT';
      case Starred: return 'STARRED';
      default: break;
    }
  }

  toggleFav = (value, type) => {
    if (type === 'add') {
      addFavorite(value, 'firewall')
        .then(() => { })
        .catch(err => {
          this.showNotification(err)
        });
    } else {
      deleteFavorite(value, 'firewall')
        .then(() => { })
        .catch(err => {
          this.showNotification(err)
        });
    }
  }

  toggleAll = toggled => {
    const { firewalls, toggledAll } = this.state;
    this.setState({ toggledAll: toggled });

    if (!toggledAll) {
      let firewallNames = [];

      for (let i in firewalls) {
        firewallNames.push(i);

        firewalls[i]['isChecked'] = true;
      }

      this.setState({ firewalls, selection: firewallNames });
    } else {
      for (let i in firewalls) {
        firewalls[i]['isChecked'] = false;
      }

      this.setState({ firewalls, selection: [] });
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
      <div className="firewalls">
        <Toolbar mobile={false} >
          <LeftButton href="/add/firewall/" name={inc['Add Rule']} showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <a href='/list/firewall/banlist/' className="button-extra" type="submit">{window.GLOBAL.App.inc['list fail2ban']}</a>
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='firewallList' />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="firewallList" />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        <div className="firewalls-wrapper">
          {this.state.loading ? <Spinner /> : this.firewalls()}
        </div>
        <div className="total">{this.state.totalAmount}</div>
      </div>
    );
  }
}

export default Firewalls;
