import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import { bulkAction, getDnsList, handleAction } from '../../ControlPanelService/Dns';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import DomainNameSystem from '../../components/DomainNameSystem/DomainNameSystem';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Modal from '../../components/ControlPanel/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import './DomainNameSystems.scss';

const { i18n } = window.GLOBAL.App;

class DomainNameSystems extends Component {
  state = {
    domainNameSystems: [],
    dnsFav: [],
    loading: false,
    toggledAll: false,
    modalText: '',
    modalVisible: false,
    modalActionUrl: '',
    sorting: i18n.Date,
    order: "descending",
    selection: [],
    totalAmount: '',
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
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
      return <DomainNameSystem data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} handleModal={this.displayModal} />;
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
    const { Date, Expire, Domain, IP, Records, Starred } = window.GLOBAL.App.i18n;

    switch (sorting) {
      case Date: return 'DATE';
      case Expire: return 'EXP';
      case Domain: return 'NAME';
      case IP: return 'IP';
      case Records: return 'RECORDS';
      case Starred: return 'STARRED';
      default: break;
    }
  }

  toggleFav = (value, type) => {
    const { dnsFav } = this.state;
    let dnsFavDuplicate = dnsFav;

    if (type === 'add') {
      dnsFavDuplicate[value] = 1;

      addFavorite(value, 'dns')
        .then(() => {
          this.setState({ dnsFav: dnsFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      dnsFavDuplicate[value] = undefined;

      deleteFavorite(value, 'dns')
        .then(() => {
          this.setState({ dnsFav: dnsFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  toggleAll = toggled => {
    const { domainNameSystems } = this.state;
    this.setState({ toggledAll: toggled }, () => {
      if (this.state.toggledAll) {
        let dnsNames = [];

        for (let i in domainNameSystems) {
          dnsNames.push(i);

          domainNameSystems[i]['isChecked'] = true;
        }

        this.setState({ domainNameSystems, selection: dnsNames });
      } else {
        for (let i in domainNameSystems) {
          domainNameSystems[i]['isChecked'] = false;
        }

        this.setState({ domainNameSystems, selection: [] });
      }
    });
  }

  bulk = action => {
    const { selection } = this.state;

    if (selection.length && action) {
      this.setState({ loading: true }, () => {
        bulkAction(action, selection)
          .then(result => {
            if (result.status === 200) {
              this.fetchData();
              this.toggleAll(false);
            }
          })
          .catch(err => console.error(err));
      });
    }
  }

  displayModal = (text, url) => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalText: text,
      modalActionUrl: url
    });
  }

  modalConfirmHandler = () => {
    handleAction(this.state.modalActionUrl)
      .then(() => {
        this.fetchData();
        this.modalCancelHandler();
      })
      .catch(err => console.error(err));
  }

  modalCancelHandler = () => {
    this.setState({
      modalVisible: false,
      modalText: '',
      modalActionUrl: ''
    });
  }

  render() {
    return (
      <div className="dns">
        <Toolbar mobile={false} >
          <LeftButton name={i18n['Add DNS Domain']} href="/add/dns" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='dnsList' bulkAction={this.bulk} />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="dnsList" />
              <SearchInput handleSearchTerm={term => this.props.changeSearchTerm(term)} />
            </div>
          </div>
        </Toolbar>
        <div className="dns-wrapper">
          {this.state.loading ? <Spinner /> : this.dns()}
        </div>
        <div className="total">{this.state.totalAmount}</div>
        <Modal
          onSave={this.modalConfirmHandler}
          onCancel={this.modalCancelHandler}
          show={this.state.modalVisible}
          text={this.state.modalText} />
      </div>
    );
  }
}

export default DomainNameSystems;