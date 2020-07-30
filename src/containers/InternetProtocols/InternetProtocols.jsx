import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import { bulkAction, getIpList, handleAction } from '../../ControlPanelService/Ip';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import InternetProtocol from '../../components/InternetProtocol/InternetProtocol';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Modal from '../../components/ControlPanel/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import './InternetProtocols.scss';

class InternetProtocols extends Component {
  state = {
    internetProtocols: [],
    ipFav: [],
    loading: false,
    toggleAll: false,
    modalText: '',
    modalVisible: false,
    modalActionUrl: '',
    sorting: window.GLOBAL.App.i18n.Date,
    order: "descending",
    selection: [],
    totalAmount: ''
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true }, () => {
      getIpList()
        .then(result => {
          this.setState({
            internetProtocols: result.data.data,
            ipFav: result.data.ipFav,
            totalAmount: result.data.totalAmount,
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
    const { internetProtocols } = this.state;
    const ipFav = { ...this.state.ipFav };
    const result = [];

    for (let i in internetProtocols) {
      internetProtocols[i]['NAME'] = i;

      if (ipFav[i]) {
        internetProtocols[i]['STARRED'] = ipFav[i];
      } else {
        internetProtocols[i]['STARRED'] = 0;
      }

      result.push(internetProtocols[i]);
    }

    let sortedResult = this.sortArray(result);

    return sortedResult.map((item, index) => {
      return <InternetProtocol data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} handleModal={this.displayModal} />;
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
    const { Date, IP, Domains, Netmask, Interface, Owner, Starred } = window.GLOBAL.App.i18n;

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
    const { ipFav } = this.state;
    let ipFavDuplicate = ipFav;

    if (type === 'add') {
      ipFavDuplicate[value] = 1;

      addFavorite(value, 'ip')
        .then(() => {
          this.setState({ ipFav: ipFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      ipFavDuplicate[value] = undefined;

      deleteFavorite(value, 'ip')
        .then(() => {
          this.setState({ ipFav: ipFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  toggleAll = toggled => {
    const { internetProtocols } = this.state;

    this.setState({ toggledAll: toggled }, () => {
      if (this.state.toggledAll) {
        let ipNames = [];

        for (let i in internetProtocols) {
          ipNames.push(i);

          internetProtocols[i]['isChecked'] = true;
        }

        this.setState({ internetProtocols, selection: ipNames });
      } else {
        for (let i in internetProtocols) {
          internetProtocols[i]['isChecked'] = false;
        }

        this.setState({ internetProtocols, selection: [] });
      }
    });
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
      <div className="internetProtocols">
        <Toolbar mobile={false} >
          <LeftButton name={window.GLOBAL.App.i18n['Add IP']} href="/add/ip/" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='internetProtocolsList' bulkAction={this.bulk} />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="internetProtocolsList" />
              <SearchInput handleSearchTerm={term => this.props.changeSearchTerm(term)} />
            </div>
          </div>
        </Toolbar>
        <div className="ip-wrapper">
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

export default InternetProtocols;