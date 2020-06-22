import React, { Component } from 'react';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import { bulkAction, getBackupList } from '../../ControlPanelService/Backup';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Spinner from '../../components/Spinner/Spinner';
import Backup from '../../components/Backup/Backup';
import { toast } from 'react-toastify';
import './Backups.scss';

class Backups extends Component {
  state = {
    backups: [],
    backupFav: [],
    loading: false,
    toggleAll: false,
    selection: [],
    totalAmount: ''
  }

  componentDidMount() {
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
      return <Backup data={item} key={index} toggleFav={this.toggleFav} checkItem={this.checkItem} />;
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
    if (type === 'add') {
      addFavorite(value, 'backup')
        .then(() => { })
        .catch(err => {
          this.showNotification(err)
        });
    } else {
      deleteFavorite(value, 'backup')
        .then(() => { })
        .catch(err => {
          this.showNotification(err)
        });
    }
  }

  toggleAll = toggled => {
    const { backups, toggledAll } = this.state;
    this.setState({ toggledAll: toggled });

    if (!toggledAll) {
      let names = [];

      for (let i in backups) {
        names.push(i);

        backups[i]['isChecked'] = true;
      }

      this.setState({ backups, selection: names });
    } else {
      for (let i in backups) {
        backups[i]['isChecked'] = false;
      }

      this.setState({ backups, selection: [] });
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
      <div className="backups">
        <Toolbar mobile={false} >
          <LeftButton name={window.GLOBAL.App.inc["Create Backup"]} href="/add/backup" showLeftMenu={true} />
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
      </div>
    );
  }
}

export default Backups;