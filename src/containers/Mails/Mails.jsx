import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import { bulkAction, getMailList, handleAction } from '../../ControlPanelService/Mail';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Modal from '../../components/ControlPanel/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import Mail from '../../components/Mail/Mail';
import './Mails.scss';

class Mails extends Component {
  state = {
    mails: [],
    mailFav: [],
    loading: false,
    toggleAll: false,
    modalText: '',
    modalVisible: false,
    modalActionUrl: '',
    webmail: '',
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
      getMailList()
        .then(result => {
          this.setState({
            mails: result.data.data,
            webmail: result.data.webmail,
            mailFav: result.data.mailFav,
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

  mails = () => {
    const { mails } = this.state;
    const result = [];
    const mailFav = { ...this.state.mailFav };

    for (let i in mails) {
      mails[i]['NAME'] = i;

      if (mailFav[i]) {
        mails[i]['STARRED'] = mailFav[i];
      } else {
        mails[i]['STARRED'] = 0;
      }

      result.push(mails[i]);
    }

    let sortedResult = this.sortArray(result);

    return sortedResult.map((item, index) => {
      return <Mail data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} handleModal={this.displayModal} />;
    });
  }

  checkItem = name => {
    const { selection, mails } = this.state;
    let duplicate = [...selection];
    let mailsDuplicate = mails;
    let checkedItem = duplicate.indexOf(name);

    mailsDuplicate[name]['isChecked'] = !mailsDuplicate[name]['isChecked'];

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    this.setState({ mails: mailsDuplicate, selection: duplicate });
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
    const { Date, Domains, Accounts, Disk, Starred } = window.GLOBAL.App.i18n;

    switch (sorting) {
      case Date: return 'DATE';
      case Domains: return 'domain_account';
      case Accounts: return 'ACCOUNTS';
      case Disk: return 'U_DISK';
      case Starred: return 'STARRED';
      default: break;
    }
  }

  toggleFav = (value, type) => {
    const { mailFav } = this.state;
    let mailFavDuplicate = mailFav;

    if (type === 'add') {
      mailFavDuplicate[value] = 1;

      addFavorite(value, 'mail')
        .then(() => {
          this.setState({ mailFav: mailFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      mailFavDuplicate[value] = undefined;

      deleteFavorite(value, 'mail')
        .then(() => {
          this.setState({ mailFav: mailFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  toggleAll = toggled => {
    const { mails } = this.state;
    this.setState({ toggledAll: toggled }, () => {
      if (this.state.toggledAll) {
        let mailNames = [];

        for (let i in mails) {
          mailNames.push(i);

          mails[i]['isChecked'] = true;
        }

        this.setState({ mails, selection: mailNames });
      } else {
        for (let i in mails) {
          mails[i]['isChecked'] = false;
        }

        this.setState({ mails, selection: [] });
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
      <div className="mails">
        <Toolbar mobile={false} >
          <LeftButton name="Add Mail Domain" href="/add/mail" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <a href={this.state.webmail} className="button-extra" type="submit">{window.GLOBAL.App.i18n['open webmail']}</a>
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='mailList' bulkAction={this.bulk} />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="mailList" />
              <SearchInput handleSearchTerm={term => this.props.changeSearchTerm(term)} />
            </div>
          </div>
        </Toolbar>
        <div className="mails-wrapper">
          {this.state.loading ? <Spinner /> : this.mails()}
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

export default Mails;