import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import DomainNameSystem from '../../components/DomainNameSystem/DomainNameSystem';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import { bulkAction, getDnsList } from '../../ControlPanelService/Dns';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import './DomainNameSystems.scss';

class DomainNameSystems extends Component {
  state = {
    domainNameSystems: [],
    dnsFav: [],
    loading: false,
    toggledAll: false,
    sorting: window.GLOBAL.App.inc.Date,
    order: "descending",
    selection: [],
    totalAmount: '',
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      getDnsList()
        .then(result => {
          this.setState({
            domainNameSystems: result.data.data,
            dnsFav: result.data.dnsFav,
            totalAmount: result.data.domain_amount,
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

  toggleAll = () => {
    this.setState({ toggleAll: !this.state.toggleAll });
  }

  dns = () => {
    const { domainNameSystems } = this.state;
    const dnsFav = { ...this.state.dnsFav };
    const result = [];

    for (let i in domainNameSystems) {
      domainNameSystems[i]['NAME'] = i;

      if (dnsFav[i]) {
        domainNameSystems[i]['STARRED'] = dnsFav[i];
      } else {
        domainNameSystems[i]['STARRED'] = 0;
      }

      result.push(domainNameSystems[i]);
    }

    let sortedResult = this.sortArray(result);

    return sortedResult.map((item, index) => {
      return <DomainNameSystem data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} />;
    });
  }

  checkItem = name => {
    const { selection, domainNameSystems } = this.state;
    let duplicate = [...selection];
    let domainNameSystemsDuplicate = domainNameSystems;
    let checkedItem = duplicate.indexOf(name);

    domainNameSystemsDuplicate[name]['isChecked'] = !domainNameSystemsDuplicate[name]['isChecked'];

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    this.setState({ domainNameSystems: domainNameSystemsDuplicate, selection: duplicate });
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
    switch (sorting) {
      case 'Date': return 'DATE';
      case 'Expire': return 'EXP';
      case 'Domain': return 'NAME';
      case 'Ip': return 'IP';
      case 'Records': return 'RECORDS';
      case 'Starred': return 'STARRED';
      default: break;
    }
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

  toggleFav = (value, type) => {
    if (type === 'add') {
      addFavorite(value, 'dns')
        .then(() => { })
        .catch(err => {
          this.showNotification(err)
        });
    } else {
      deleteFavorite(value, 'dns')
        .then(() => { })
        .catch(err => {
          this.showNotification(err)
        });
    }
  }

  toggleAll = toggled => {
    const { domainNameSystems, toggledAll } = this.state;
    this.setState({ toggledAll: toggled });

    if (!toggledAll) {
      let domainNameSystemsNames = [];

      for (let i in domainNameSystems) {
        domainNameSystemsNames.push(i);

        domainNameSystems[i]['isChecked'] = true;
      }

      this.setState({ domainNameSystems, selection: domainNameSystemsNames });
    } else {
      for (let i in domainNameSystems) {
        domainNameSystems[i]['isChecked'] = false;
      }

      this.setState({ domainNameSystems, selection: [] });
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
      <div className="dns">
        <Toolbar mobile={false} >
          <LeftButton name="Add DNS Domain" href="/add/dns" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='dnsList' bulkAction={this.bulk} />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="dnsList" />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        <div className="dns-wrapper">
          {this.state.loading ? <Spinner /> : this.dns()}
        </div>
        <div className="total">{this.state.totalAmount}</div>
      </div>
    );
  }
}

export default DomainNameSystems;