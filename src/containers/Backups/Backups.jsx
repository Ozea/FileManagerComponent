import React, { Component } from 'react';
import { bulkAction, getBackupList, handleAction } from '../../ControlPanelService/Backup';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Modal from '../../components/ControlPanel/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import Backup from '../../components/Backup/Backup';
import './Backups.scss';

class Backups extends Component {
  state = {
    backups: [],
    backupFav: [],
    loading: false,
    modalText: '',
    modalVisible: false,
    modalActionUrl: '',
    toggleAll: false,
    selection: [],
    totalAmount: ''
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true }, () => {
      getBackupList()
        .then(result => {
          this.setState({
            backups: result.data.data,
            backupFav: result.data.backup_fav,
            totalAmount: result.data.jobs_amount,
            loading: false
          });
        })
        .catch(err => console.error(err));
    });
  }

  toggleAll = () => {
    this.setState({ toggleAll: !this.state.toggleAll });
  }

  backups = () => {
    const { backups } = this.state;
    const result = [];
    const backupFav = { ...this.state.backupFav };

    for (let i in backups) {
      backups[i]['NAME'] = i;

      if (backupFav[i]) {
        backups[i]['STARRED'] = backupFav[i];
      } else {
        backups[i]['STARRED'] = 0;
      }

      result.push(backups[i]);
    }

    return result.map((item, index) => {
      return <Backup data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} handleModal={this.displayModal} />;
    });
  }

  checkItem = name => {
    const { selection, backups } = this.state;
    let duplicate = [...selection];
    let backupDuplicate = backups;
    let checkedItem = duplicate.indexOf(name);

    backupDuplicate[name]['isChecked'] = !backupDuplicate[name]['isChecked'];

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    this.setState({ backups: backupDuplicate, selection: duplicate });
  }

  toggleFav = (value, type) => {
    const { backupFav } = this.state;
    let backupFavDuplicate = backupFav;

    if (type === 'add') {
      backupFavDuplicate[value] = 1;

      addFavorite(value, 'backup')
        .then(() => {
          this.setState({ backupFav: backupFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      backupFavDuplicate[value] = undefined;

      deleteFavorite(value, 'backup')
        .then(() => {
          this.setState({ backupFav: backupFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  toggleAll = toggled => {
    const { backups } = this.state;
    this.setState({ toggledAll: toggled }, () => {
      if (this.state.toggledAll) {
        let backupNames = [];

        for (let i in backups) {
          backupNames.push(i);

          backups[i]['isChecked'] = true;
        }

        this.setState({ backups, selection: backupNames });
      } else {
        for (let i in backups) {
          backups[i]['isChecked'] = false;
        }

        this.setState({ backups, selection: [] });
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
      <div className="backups">
        <Toolbar mobile={false} >
          <LeftButton name={window.GLOBAL.App.inc["Create Backup"]} href="/schedule/backup" showLeftMenu={true} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <a href='/list/backup/exclusions/' className="button-extra" type="submit">{window.GLOBAL.App.inc['backup exclusions']}</a>
              <Checkbox toggleAll={this.toggleAll} toggled={this.state.toggledAll} />
              <Select list='backupList' bulkAction={this.bulk} />
              <SearchInput />
            </div>
          </div>
        </Toolbar>
        <div className="backups-wrapper">
          {this.state.loading ? <Spinner /> : this.backups()}
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

export default Backups;