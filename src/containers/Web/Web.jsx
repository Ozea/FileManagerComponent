import React, { Component } from 'react';
import { bulkAction, getWebList, handleAction } from '../../ControlPanelService/Web';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import WebDomain from '../../components/WebDomain/WebDomain';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import './Web.scss';
import Modal from '../../components/ControlPanel/Modal/Modal';

class Web extends Component {
  state = {
    webDomains: [],
    webFav: [],
    loading: false,
    toggledAll: false,
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
      getWebList()
        .then(result => {
          this.setState({
            webDomains: result.data.data,
            webFav: result.data.webFav,
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
    this.setState({ toggledAll: !this.state.toggledAll });
  }

  webDomains = () => {
    const { webDomains } = this.state;
    const webFav = { ...this.state.webFav };
    const result = [];

    for (let i in webDomains) {
      webDomains[i]['NAME'] = i;

      if (webFav[i]) {
        webDomains[i]['STARRED'] = webFav[i];
      } else {
        webDomains[i]['STARRED'] = 0;
      }

      result.push(webDomains[i]);
    }

    let sortedResult = this.sortArray(result);

    return sortedResult.map((item, index) => {
      return <WebDomain data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} handleModal={this.displayModal} />;
    });
  }

  checkItem = name => {
    const { selection, webDomains } = this.state;
    let duplicate = [...selection];
    let webDomainsDuplicate = webDomains;
    let checkedItem = duplicate.indexOf(name);

    webDomainsDuplicate[name]['isChecked'] = !webDomainsDuplicate[name]['isChecked'];

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    this.setState({ webDomains: webDomainsDuplicate, selection: duplicate });
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
    const { Date, Domain, Disk, Bandwidth, Starred } = window.GLOBAL.App.i18n;

    switch (sorting) {
      case Date: return 'DATE';
      case Domain: return 'ALIAS';
      case window.GLOBAL.App.i18n['IP Addresses']: return 'IP';
      case Disk: return 'U_DISK';
      case Bandwidth: return 'U_BANDWIDTH';
      case Starred: return 'STARRED';
      default: break;
    }
  }

  toggleFav = (value, type) => {
    const { webFav } = this.state;
    let webFavDuplicate = webFav;

    if (type === 'add') {
      webFavDuplicate[value] = 1;

      addFavorite(value, 'web')
        .then(() => {
          this.setState({ webFav: webFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      webFavDuplicate[value] = undefined;

      deleteFavorite(value, 'web')
        .then(() => {
          this.setState({ webFav: webFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
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

  toggleAll = toggled => {
    const { webDomains } = this.state;
    this.setState({ toggledAll: toggled }, () => {
      if (this.state.toggledAll) {
        let webDomainNames = [];

        for (let i in webDomains) {
          webDomainNames.push(i);

          webDomains[i]['isChecked'] = true;
        }

        this.setState({ webDomains, selection: webDomainNames });
      } else {
        for (let i in webDomains) {
          webDomains[i]['isChecked'] = false;
        }

        this.setState({ webDomains, selection: [] });
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
      <div className="web">
        <Toolbar mobile={false} >
          <LeftButton name="Add Web Domain" href="/add/web/" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='webList' bulkAction={this.bulk} />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="webList" />
              <SearchInput handleSearchTerm={term => this.props.changeSearchTerm(term)} />
            </div>
          </div>
        </Toolbar>
        <div className="web-domains-wrapper">
          {this.state.loading ? <Spinner /> : this.webDomains()}
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

export default Web;