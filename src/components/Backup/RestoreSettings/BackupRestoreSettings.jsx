import React, { useState, useEffect } from 'react';
import { addControlPanelContentFocusedElement, removeControlPanelContentFocusedElement } from '../../../actions/ControlPanelContent/controlPanelContentActions';
import * as MainNavigation from '../../../actions/MainNavigation/mainNavigationActions';
import SearchInput from '../../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../../components/MainNav/Toolbar/LeftButton/LeftButton';
import { getBackupDetails, bulkAction } from 'src/ControlPanelService/Backup';
import Checkbox from '../../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../../components/MainNav/Toolbar/Toolbar';
import RestoreSetting from '../RestoreSetting/RestoreSetting';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'src/components/Spinner/Spinner';
import { Link } from 'react-router-dom';

import './BackupRestoreSettings.scss';
import { Helmet } from 'react-helmet';

export default function BackupRestoreSettings(props) {
  const { i18n } = window.GLOBAL.App;
  const token = localStorage.getItem("token");
  const { controlPanelFocusedElement } = useSelector(state => state.controlPanelContent);
  const { focusedElement } = useSelector(state => state.mainNavigation);
  const dispatch = useDispatch();
  const [backupDetailsData, setBackupDetailsData] = useState([]);
  const [state, setState] = useState({
    loading: false,
    backupDetails: [],
    toggledAll: false,
    selection: [],
    totalAmount: ''
  });

  useEffect(() => {
    dispatch(removeControlPanelContentFocusedElement());
    fetchData();

    return () => dispatch(removeControlPanelContentFocusedElement());
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleContentSelection);
    window.addEventListener("keydown", handleFocusedElementShortcuts);

    return () => {
      window.removeEventListener("keydown", handleContentSelection);
      window.removeEventListener("keydown", handleFocusedElementShortcuts);
    };
  }, [controlPanelFocusedElement, focusedElement, backupDetailsData]);

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

  const initFocusedElement = backupDetails => {
    backupDetails[0]['FOCUSED'] = backupDetails[0]['NAME'];
    setBackupDetailsData(backupDetails);
    dispatch(addControlPanelContentFocusedElement(backupDetails[0]['NAME']));
  }

  const handleArrowDown = () => {
    let backupDetails = [...backupDetailsData];

    if (focusedElement) {
      MainNavigation.removeFocusedElement();
    }

    if (controlPanelFocusedElement === '') {
      initFocusedElement(backupDetails);
      return;
    }

    let nextFocusedElement = backupDetails[controlPanelFocusedElement + 1];

    if (nextFocusedElement) {
      backupDetails[controlPanelFocusedElement]['FOCUSED'] = '';
      nextFocusedElement['FOCUSED'] = nextFocusedElement['NAME'];
      document.getElementById(nextFocusedElement['NAME']).scrollIntoView({ behavior: "smooth", block: "center" });
      setBackupDetailsData(backupDetails);
      dispatch(addControlPanelContentFocusedElement(nextFocusedElement['NAME']));
    }
  }

  const handleArrowUp = () => {
    let backupDetails = [...backupDetailsData];

    if (focusedElement) {
      MainNavigation.removeFocusedElement();
    }

    if (controlPanelFocusedElement === '') {
      initFocusedElement(backupDetails);
      return;
    }

    let nextFocusedElement = backupDetails[controlPanelFocusedElement - 1];

    if (nextFocusedElement) {
      backupDetails[controlPanelFocusedElement]['FOCUSED'] = '';
      nextFocusedElement['FOCUSED'] = nextFocusedElement['NAME'];
      document.getElementById(nextFocusedElement['NAME']).scrollIntoView({ behavior: "smooth", block: "center" });
      setBackupDetailsData(backupDetails);
      dispatch(addControlPanelContentFocusedElement(nextFocusedElement['NAME']));
    }
  }

  const handleFocusedElementShortcuts = event => {
    let isSearchInputFocused = document.querySelector('input:focus') || document.querySelector('textarea:focus');

    if (controlPanelFocusedElement > 0 || controlPanelFocusedElement !== '' && !isSearchInputFocused) {
      switch (event.keyCode) {
        case 82: return handleRestore();
        default: break;
      }
    }
  }

  const handleRestore = () => {
    console.log(backupDetailsData[controlPanelFocusedElement].restoreLink);
  }

  const fetchData = () => {
    setState({ ...state, loading: true });

    getBackupDetails(props.backup)
      .then(result => {
        reformatData(result.data.data[props.backup]);
        setState({
          ...state,
          totalAmount: result.data.totalAmount,
          loading: false
        });
      })
      .catch(err => console.error(err));
  }

  const reformatData = data => {
    let reformattedData = ['WEB', 'DNS', 'MAIL', 'DB', 'UDIR', 'CRON'].reduce((acc, cat) => {
      data[cat].split(',').map(item => {
        acc.push({
          type: cat,
          name: item,
          restoreLink: `/schedule/restore/?backup=${props.backup}&type=${cat.toLowerCase()}&object=${item}&token=${token}`
        });
      });

      return acc;
    }, []);

    setBackupDetailsData(reformattedData);
  }

  const listBackups = () => {
    const backupDetails = [...backupDetailsData];
    const result = [];

    backupDetails.forEach((backupDetail, index) => {
      backupDetail.NAME = index;
      backupDetail.FOCUSED = controlPanelFocusedElement === index;
      result.push(backupDetail);
    });

    return result.map((item, index) => {
      return <RestoreSetting data={item} key={index} checkItemFunc={name => checkItem(name)} />;
    });
  }

  const checkItem = name => {
    const { selection } = state;
    let duplicate = [...selection];
    let backupDetailsDuplicate = [...backupDetailsData];
    let checkedItem = duplicate.indexOf(name);

    let incomingItem = backupDetailsDuplicate.findIndex(backupDetail => backupDetail.NAME === name);
    backupDetailsDuplicate[incomingItem].isChecked = !backupDetailsDuplicate[incomingItem].isChecked;

    if (checkedItem !== -1) {
      duplicate.splice(backupDetailsDuplicate[name]['name'], 1);
    } else {
      duplicate.push(backupDetailsDuplicate[name]['name']);
    }

    setState({ ...state, selection: duplicate });
    setBackupDetailsData(backupDetailsDuplicate);
  }

  const toggleAll = toggled => {
    const backupDetailsDuplicate = [...backupDetailsData];

    if (toggled) {
      let backupDetailNames = [];
      let backupDetails = backupDetailsDuplicate.map(backupDetail => {
        backupDetailNames.push(backupDetail.name);
        backupDetail.isChecked = true;
        return backupDetail;
      });

      setState({ ...state, selection: backupDetailNames, toggledAll: toggled });
      setBackupDetailsData(backupDetails);
    } else {
      let backupDetails = backupDetailsDuplicate.map(backupDetail => {
        backupDetail.isChecked = false;
        return backupDetail;
      });

      setState({ ...state, selection: [], toggledAll: toggled });
      setBackupDetailsData(backupDetails);
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

  return (
    <div className="mail-accounts backups-restore-settings">
      <Helmet>
        <title>{`Vesta - ${i18n.BACKUP}`}</title>
      </Helmet>
      <Toolbar mobile={false} >
        <LeftButton name={i18n['Restore All']} list="backup-details" href={`/schedule/restore/?backup=${props.backup}`} showLeftMenu={true} />
        <div className="r-menu">
          <div className="input-group input-group-sm">
            <Checkbox toggleAll={toggleAll} toggled={state.toggledAll} />
            <Select list='backupDetailList' bulkAction={bulk} />
            <SearchInput handleSearchTerm={term => props.changeSearchTerm(term)} />
          </div>
        </div>
      </Toolbar>
      {state.loading
        ? <Spinner />
        : (
          <>
            <div className="mail-accounts-wrapper">
              <div className="subtitle">
                <span>{`${i18n['Listing']}  ${props.backup}`}</span>
              </div>
              {listBackups()}
            </div>
            <div className="footer-actions-wrapper">
              <div className="total">{state.totalAmount}</div>
              <div className="back">
                <Link to="/list/backup/">{i18n['Back']}</Link>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
}