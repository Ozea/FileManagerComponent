import React, { Component } from 'react';
import { bulkAction, getUpdatesList, enableAutoUpdate, disableAutoUpdate } from '../../ControlPanelService/Updates';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Spinner from '../../components/Spinner/Spinner';
import Update from '../../components/Update/Update';
import './Updates.scss';

const { i18n } = window.GLOBAL.App;

class Updates extends Component {
  state = {
    updates: [],
    selection: [],
    autoUpdate: '',
    token: '',
    loading: false,
    toggleAll: false
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true }, () => {
      getUpdatesList()
        .then(result => {
          this.setState({
            updates: result.data.data,
            token: result.data.token,
            autoUpdate: result.data.autoUpdate,
            loading: false
          });
        })
        .catch(err => console.error(err));
    });
  }

  updates = () => {
    const { updates } = this.state;
    const result = [];

    for (let i in updates) {
      updates[i]['NAME'] = i;
      result.push(updates[i]);
    }

    return result.map((item, index) => {
      return <Update data={item} key={index} checkItem={this.checkItem} />;
    });
  }

  toggleAll = () => {
    this.setState({ toggleAll: !this.state.toggleAll });
  }

  checkItem = name => {
    const { selection, updates } = this.state;
    let duplicate = [...selection];
    let updatesDuplicate = updates;
    let checkedItem = duplicate.indexOf(name);

    updatesDuplicate[name]['isChecked'] = !updatesDuplicate[name]['isChecked'];

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    this.setState({ updates: updatesDuplicate, selection: duplicate });
  }

  toggleAll = toggled => {
    const { updates } = this.state;

    this.setState({ toggledAll: toggled }, () => {
      if (this.state.toggledAll) {
        let updateNames = [];

        for (let i in updates) {
          updateNames.push(i);

          updates[i]['isChecked'] = true;
        }

        this.setState({ updates, selection: updateNames });
      } else {
        for (let i in updates) {
          updates[i]['isChecked'] = false;
        }

        this.setState({ updates, selection: [] });
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
              this.setState({ loading: false }, () => {
                this.toggleAll(false);
              });
            }
          })
          .catch(err => console.error(err));
      });
    }
  }

  handleAutoUpdate = () => {
    if (this.state.autoUpdate === 'Enabled') {
      disableAutoUpdate()
        .then(() => this.fetchData())
        .catch(err => console.error(err));
    } else {
      enableAutoUpdate()
        .then(() => this.fetchData())
        .catch(err => console.error(err));
    }
  }

  printAutoUpdateButtonName = () => {
    if (this.state.autoUpdate === 'Enabled') {
      return i18n['disable autoupdate'];
    } else {
      return i18n['enable autoupdate'];
    }
  }

  render() {
    return (
      <div className="statistics-list updates">
        <Toolbar mobile={false} className="justify-right">
          <LeftButton name="Add Cron Job" showLeftMenu={false} />
          <div className="r-menu">
            <div className="input-group input-group-sm">
              <button onClick={this.handleAutoUpdate} className="button-extra">{this.printAutoUpdateButtonName()}</button>
              <Checkbox toggleAll={this.toggleAll} />
              <Select list='updatesList' bulkAction={this.bulk} />
              <SearchInput handleSearchTerm={term => this.props.changeSearchTerm(term)} />
            </div>
          </div>
        </Toolbar>
        {this.state.loading ? <Spinner /> : this.updates()}
      </div>
    );
  }
}

export default Updates;