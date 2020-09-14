import React, { useState, useEffect } from 'react';
import { addControlPanelContentFocusedElement, removeControlPanelContentFocusedElement } from '../../actions/ControlPanelContent/controlPanelContentActions';
import { bulkAction, getBackupList, handleAction } from '../../ControlPanelService/Backup';
import * as MainNavigation from '../../actions/MainNavigation/mainNavigationActions';
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
import { useSelector, useDispatch } from 'react-redux';

const Backups = props => {
  const { i18n } = window.GLOBAL.App;
  const token = localStorage.getItem("token");
  const { controlPanelFocusedElement } = useSelector(state => state.controlPanelContent);
  const { focusedElement } = useSelector(state => state.mainNavigation);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    backups: [],
    backupFav: [],
    loading: true,
    modalText: '',
    modalVisible: false,
    modalActionUrl: '',
    toggledAll: false,
    selection: [],
    totalAmount: ''
  });

  useEffect(() => {
    dispatch(removeControlPanelContentFocusedElement());
    fetchData();

    return () => {
      dispatch(removeControlPanelContentFocusedElement());
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleContentSelection);
    window.addEventListener("keydown", handleFocusedElementShortcuts);

    return () => {
      window.removeEventListener("keydown", handleContentSelection);
      window.removeEventListener("keydown", handleFocusedElementShortcuts);
    };
  }, [controlPanelFocusedElement, focusedElement, state.backups]);

  const handleContentSelection = event => {
    if (event.keyCode === 38 || event.keyCode === 40) {
      if (focusedElement) {
        dispatch(MainNavigation.removeFocusedElement());
      }
    }

    if (event.keyCode === 38) {
      event.preventDefault();
      handleArrowUp();
    } else if (event.keyCode === 40) {
      event.preventDefault();
      handleArrowDown();
    }
  }

  const initFocusedElement = backups => {
    backups[0]['FOCUSED'] = backups[0]['NAME'];
    setState({ ...state, backups });
    dispatch(addControlPanelContentFocusedElement(backups[0]['NAME']));
  }

  const handleArrowDown = () => {
    let backups = [...state.backups];

    if (focusedElement) {
      MainNavigation.removeFocusedElement();
    }

    if (controlPanelFocusedElement === '') {
      initFocusedElement(backups);
      return;
    }

    let focusedElementPosition = backups.findIndex(backup => backup.NAME === controlPanelFocusedElement);

    if (focusedElementPosition !== backups.length - 1) {
      let nextFocusedElement = backups[focusedElementPosition + 1];
      backups[focusedElementPosition]['FOCUSED'] = '';
      nextFocusedElement['FOCUSED'] = nextFocusedElement['NAME'];
      document.getElementById(nextFocusedElement['NAME']).scrollIntoView({ behavior: "smooth", block: "center" });
      setState({ ...state, backups });
      dispatch(addControlPanelContentFocusedElement(nextFocusedElement['NAME']));
    }
  }

  const handleArrowUp = () => {
    let backups = [...state.backups];

    if (focusedElement) {
      MainNavigation.removeFocusedElement();
    }

    if (controlPanelFocusedElement === '') {
      initFocusedElement(backups);
      return;
    }

    let focusedElementPosition = backups.findIndex(backup => backup.NAME === controlPanelFocusedElement);

    if (focusedElementPosition !== 0) {
      let nextFocusedElement = backups[focusedElementPosition - 1];
      backups[focusedElementPosition]['FOCUSED'] = '';
      nextFocusedElement['FOCUSED'] = nextFocusedElement['NAME'];
      document.getElementById(nextFocusedElement['NAME']).scrollIntoView({ behavior: "smooth", block: "center" });
      setState({ ...state, backups });
      dispatch(addControlPanelContentFocusedElement(nextFocusedElement['NAME']));
    }
  }

  const handleFocusedElementShortcuts = event => {
    let isSearchInputFocused = document.querySelector('.toolbar .search-input-form input:focus');

    if (controlPanelFocusedElement && !isSearchInputFocused) {
      switch (event.keyCode) {
        case 8: return handleDelete();
        case 13: return configureRestoreSettings();
        case 68: return download();
        default: break;
      }
    }
  }

  const configureRestoreSettings = () => {
    props.history.push(`/list/backup?backup=${controlPanelFocusedElement}`);
  }

  const download = () => {
    props.history.push(`/download/backup?backup=${controlPanelFocusedElement}&token=${token}`);
  }

  const handleDelete = () => {
    const { backups } = state;
    let currentBackupData = backups.filter(backup => backup.NAME === controlPanelFocusedElement)[0];

    displayModal(currentBackupData.delete_conf, `/delete/cron/?job=${controlPanelFocusedElement}&token=${token}`);
  }

  const fetchData = () => {
    getBackupList()
      .then(result => {
        setState({
          ...state,
          backups: reformatData(result.data.data),
          backupFav: result.data.backup_fav,
          totalAmount: result.data.totalAmount,
          loading: false
        });
      })
      .catch(err => console.error(err));
  }

  const reformatData = data => {
    let backups = [];

    for (let i in data) {
      data[i]['NAME'] = i;
      data[i]['isChecked'] = false;
      data[i]['FOCUSED'] = controlPanelFocusedElement === i;
      backups.push(data[i]);
    }

    return backups;
  }

  const backups = () => {
    const { backups } = state;
    const result = [];
    const backupFav = { ...state.backupFav };

    backups.forEach(backup => {
      backup.FOCUSED = controlPanelFocusedElement === backup.NAME;

      if (backupFav[backup.NAME]) {
        backup.STARRED = backupFav[backup.NAME];
      } else {
        backup.STARRED = 0;
      }

      result.push(backup);
    });

    return result.map((item, index) => {
      return <Backup data={item} key={index} toggleFav={toggleFav} checkItem={checkItem} handleModal={displayModal} />;
    });
  }

  const checkItem = name => {
    const { selection, backups } = state;
    let duplicate = [...selection];
    let backupDuplicate = [...backups];
    let checkedItem = duplicate.indexOf(name);

    let incomingItem = backupDuplicate.findIndex(backup => backup.NAME === name);
    backupDuplicate[incomingItem].isChecked = !backupDuplicate[incomingItem].isChecked;

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    setState({ ...state, backups: backupDuplicate, selection: duplicate });
  }

  const toggleFav = (value, type) => {
    const { backupFav } = state;
    let backupFavDuplicate = backupFav;

    if (type === 'add') {
      backupFavDuplicate[value] = 1;

      addFavorite(value, 'backup')
        .then(() => {
          setState({ ...state, backupFav: backupFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      backupFavDuplicate[value] = undefined;

      deleteFavorite(value, 'backup')
        .then(() => {
          setState({ ...state, backupFav: backupFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  const toggleAll = toggled => {
    const backupsDuplicate = [...state.backups];

    if (toggled) {
      let backupNames = [];

      let backups = backupsDuplicate.map(backup => {
        backupNames.push(backup.NAME);
        backup.isChecked = true;
        return backup;
      });

      setState({ ...state, backups, selection: backupNames, toggledAll: toggled });
    } else {
      let backups = backupsDuplicate.map(backup => {
        backup.isChecked = false;
        return backup;
      });
      setState({ ...state, backups, selection: [], toggledAll: toggled });
    }
  }

  const bulk = action => {
    const { selection } = state;

    if (selection.length && action) {
      bulkAction(action, selection)
        .then(result => {
          if (result.status === 200) {
            fetchData();
            toggleAll(false);
          }
        })
        .catch(err => console.error(err));
    }
  }

  const displayModal = (text, url) => {
    setState({
      ...state,
      modalVisible: !state.modalVisible,
      modalText: text,
      modalActionUrl: url
    });
  }

  const modalConfirmHandler = () => {
    handleAction(state.modalActionUrl)
      .then(() => {
        fetchData();
        modalCancelHandler();
      })
      .catch(err => console.error(err));
  }

  const modalCancelHandler = () => {
    setState({
      ...state,
      modalVisible: false,
      modalText: '',
      modalActionUrl: ''
    });
  }

  return (
    <div className="backups">
      <Toolbar mobile={false} >
        <LeftButton name={i18n["Create Backup"]} href="/schedule/backup" showLeftMenu={true} />
        <div className="r-menu">
          <div className="input-group input-group-sm">
            <a href='/list/backup/exclusions/' className="button-extra" type="submit">{i18n['backup exclusions']}</a>
            <Checkbox toggleAll={toggleAll} toggled={state.toggledAll} />
            <Select list='backupList' bulkAction={bulk} />
            <SearchInput handleSearchTerm={term => props.changeSearchTerm(term)} />
          </div>
        </div>
      </Toolbar>
      <div className="backups-wrapper">
        {state.loading ? <Spinner /> : backups()}
      </div>
      <div className="total">{state.totalAmount}</div>
      <Modal
        onSave={modalConfirmHandler}
        onCancel={modalCancelHandler}
        show={state.modalVisible}
        text={state.modalText} />
    </div>
  );
}

export default Backups;