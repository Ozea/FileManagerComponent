import React, { Component } from 'react';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import { bulkAction, getPackageList, handleAction } from '../../ControlPanelService/Package';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Modal from '../../components/ControlPanel/Modal/Modal';
import Package from '../../components/Package/Package';
import Spinner from '../../components/Spinner/Spinner';
import './Packages.scss';

class Packages extends Component {
  state = {
    packages: [],
    packagesFav: [],
    loading: false,
    toggleAll: false,
    modalText: '',
    modalVisible: false,
    modalActionUrl: '',
    sorting: window.GLOBAL.App.inc.Date,
    order: "descending",
    selection: [],
    totalAmount: ''
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true }, () => {
      getPackageList()
        .then(result => {
          this.setState({
            packages: result.data.data,
            packagesFav: result.data.packagesFav,
            totalAmount: result.data.packagesAmount,
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

  packages = () => {
    const { packages } = this.state;
    const packagesFav = { ...this.state.packagesFav };
    const result = [];

    for (let i in packages) {
      packages[i]['NAME'] = i;

      if (packagesFav[i]) {
        packages[i]['STARRED'] = packagesFav[i];
      } else {
        packages[i]['STARRED'] = 0;
      }

      result.push(packages[i]);
    }

    let sortedResult = this.sortArray(result);

    return sortedResult.map((item, index) => {
      return <Package data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} handleModal={this.displayModal} />;
    });
  }

  checkItem = name => {
    const { selection, packages } = this.state;
    let duplicate = [...selection];
    let packagesDuplicate = packages;
    let checkedItem = duplicate.indexOf(name);

    packagesDuplicate[name]['isChecked'] = !packagesDuplicate[name]['isChecked'];

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    this.setState({ packages: packagesDuplicate, selection: duplicate });
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
    const { Date, Starred } = window.GLOBAL.App.inc;

    switch (sorting) {
      case Date: return 'DATE';
      case window.GLOBAL.App.inc['Package Name']: return 'NAME';
      case Starred: return 'STARRED';
      default: break;
    }
  }

  toggleFav = (value, type) => {
    const { packagesFav } = this.state;
    let packagesFavDuplicate = packagesFav;

    if (type === 'add') {
      packagesFavDuplicate[value] = 1;

      addFavorite(value, 'package')
        .then(() => {
          this.setState({ packagesFav: packagesFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      packagesFavDuplicate[value] = undefined;

      deleteFavorite(value, 'package')
        .then(() => {
          this.setState({ packagesFav: packagesFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  toggleAll = toggled => {
    const { packages } = this.state;

    this.setState({ toggledAll: toggled }, () => {
      if (this.state.toggledAll) {
        let packageNames = [];

        for (let i in packages) {
          packageNames.push(i);

          packages[i]['isChecked'] = true;
        }

        this.setState({ packages, selection: packageNames });
      } else {
        for (let i in packages) {
          packages[i]['isChecked'] = false;
        }

        this.setState({ packages, selection: [] });
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
      <div className="packages">
        <Toolbar mobile={false} >
          <LeftButton name={window.GLOBAL.App.inc['Add Package']} href="/add/package/" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='packagesList' bulkAction={this.bulk} />
              <DropdownFilter changeSorting={this.changeSorting} sorting={this.state.sorting} order={this.state.order} list="packagesList" />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        <div className="packages-wrapper">
          {this.state.loading ? <Spinner /> : this.packages()}
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

export default Packages;