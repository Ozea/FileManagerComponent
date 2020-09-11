import React, { useState, useEffect } from 'react';
import { addControlPanelContentFocusedElement, removeControlPanelContentFocusedElement } from '../../actions/ControlPanelContent/controlPanelContentActions';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import { bulkAction, getMailList, handleAction } from '../../ControlPanelService/Mail';
import * as MainNavigation from '../../actions/MainNavigation/mainNavigationActions';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Modal from '../../components/ControlPanel/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import Mail from '../../components/Mail/Mail';
import './Mails.scss';

import { useSelector, useDispatch } from 'react-redux';

const Mails = props => {
  const { i18n } = window.GLOBAL.App;
  const token = localStorage.getItem("token");
  const { controlPanelFocusedElement } = useSelector(state => state.controlPanelContent);
  const { focusedElement } = useSelector(state => state.mainNavigation);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    mails: [],
    mailFav: [],
    loading: true,
    toggleAll: false,
    modalText: '',
    modalVisible: false,
    modalActionUrl: '',
    webMail: '',
    sorting: i18n.Date,
    order: "descending",
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
  }, [controlPanelFocusedElement, focusedElement, state.mails]);

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

  const initFocusedElement = mails => {
    mails[0]['FOCUSED'] = mails[0]['NAME'];
    setState({ ...state, mails });
    dispatch(addControlPanelContentFocusedElement(mails[0]['NAME']));
  }

  const handleArrowDown = () => {
    let mails = [...state.mails];

    if (focusedElement) {
      MainNavigation.removeFocusedElement();
    }

    if (controlPanelFocusedElement === '') {
      initFocusedElement(mails);
      return;
    }

    let focusedElementPosition = mails.findIndex(mail => mail.NAME === controlPanelFocusedElement);

    if (focusedElementPosition !== mails.length - 1) {
      let nextFocusedElement = mails[focusedElementPosition + 1];
      mails[focusedElementPosition]['FOCUSED'] = '';
      nextFocusedElement['FOCUSED'] = nextFocusedElement['NAME'];
      document.getElementById(nextFocusedElement['NAME']).scrollIntoView({ behavior: "smooth", block: "center" });
      setState({ ...state, mails });
      dispatch(addControlPanelContentFocusedElement(nextFocusedElement['NAME']));
    }
  }

  const handleArrowUp = () => {
    let mails = [...state.mails];

    if (focusedElement) {
      MainNavigation.removeFocusedElement();
    }

    if (controlPanelFocusedElement === '') {
      initFocusedElement(mails);
      return;
    }

    let focusedElementPosition = mails.findIndex(mail => mail.NAME === controlPanelFocusedElement);

    if (focusedElementPosition !== 0) {
      let nextFocusedElement = mails[focusedElementPosition - 1];
      mails[focusedElementPosition]['FOCUSED'] = '';
      nextFocusedElement['FOCUSED'] = nextFocusedElement['NAME'];
      document.getElementById(nextFocusedElement['NAME']).scrollIntoView({ behavior: "smooth", block: "center" });
      setState({ ...state, mails });
      dispatch(addControlPanelContentFocusedElement(nextFocusedElement['NAME']));
    }
  }

  const handleFocusedElementShortcuts = event => {
    let isSearchInputFocused = document.querySelector('.toolbar .search-input-form input:focus');

    if (controlPanelFocusedElement && !isSearchInputFocused) {
      switch (event.keyCode) {
        case 8: return handleDelete();
        case 13: return handleEdit();
        case 76: return handleLogs();
        case 78: return handleAddRecord();
        case 83: return handleSuspend();
        default: break;
      }
    }
  }

  const handleAddRecord = () => {
    props.history.push(`/add/mail/?domain=${controlPanelFocusedElement}`);
  }

  const handleLogs = () => {
    props.history.push(`/list/mail?domain=${controlPanelFocusedElement}&type=access`);
  }

  const handleEdit = () => {
    props.history.push(`/edit/mail?domain=${controlPanelFocusedElement}`);
  }

  const handleSuspend = () => {
    const { mails } = state;
    let currentMailData = mails.filter(mail => mail.NAME === controlPanelFocusedElement)[0];
    let suspendedStatus = currentMailData.SUSPENDED === 'yes' ? 'unsuspend' : 'suspend';

    displayModal(currentMailData.suspend_conf, `/${suspendedStatus}/mail?domain=${controlPanelFocusedElement}&token=${token}`);
  }

  const handleDelete = () => {
    const { mails } = state;
    let currentMailData = mails.filter(mail => mail.NAME === controlPanelFocusedElement)[0];

    displayModal(currentMailData.delete_conf, `/delete/mail/?domain=${controlPanelFocusedElement}&token=${token}`);
  }

  const fetchData = () => {
    getMailList()
      .then(result => {
        setState({
          mails: reformatData(result.data.data),
          webMail: result.data.webMail,
          mailFav: result.data.mailFav,
          totalAmount: result.data.totalAmount,
          loading: false
        });
      })
      .catch(err => console.error(err));
  }

  const reformatData = data => {
    let mails = [];

    for (let i in data) {
      data[i]['NAME'] = i;
      data[i]['FOCUSED'] = controlPanelFocusedElement === i;
      mails.push(data[i]);
    }

    return mails;
  }

  const changeSorting = (sorting, order) => {
    setState({
      ...state,
      sorting,
      order
    });
  }

  const mails = () => {
    const { mails } = state;
    const mailFav = { ...state.mailFav };
    const result = [];

    mails.forEach(mail => {
      mail.FOCUSED = controlPanelFocusedElement === mail.NAME;

      if (mailFav[mail.NAME]) {
        mail.STARRED = mailFav[mail.NAME];
      } else {
        mail.STARRED = 0;
      }

      result.push(mail);
    });
    let sortedResult = sortArray(result);

    return sortedResult.map((item, index) => {
      return <Mail data={item} key={index} toggleFav={toggleFav} checkItem={checkItem} handleModal={displayModal} />;
    });
  }

  const checkItem = name => {
    const { selection, mails } = state;
    let duplicate = [...selection];
    let mailsDuplicate = mails;
    let checkedItem = duplicate.indexOf(name);

    mailsDuplicate[name]['isChecked'] = !mailsDuplicate[name]['isChecked'];

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    setState({ ...state, mails: mailsDuplicate, selection: duplicate });
  }

  const sortArray = array => {
    const { order, sorting } = state;
    let sortingColumn = sortBy(sorting);

    if (order === "descending") {
      return array.sort((a, b) => (a[sortingColumn] < b[sortingColumn]) ? 1 : ((b[sortingColumn] < a[sortingColumn]) ? -1 : 0));
    } else {
      return array.sort((a, b) => (a[sortingColumn] > b[sortingColumn]) ? 1 : ((b[sortingColumn] > a[sortingColumn]) ? -1 : 0));
    }
  }

  const sortBy = sorting => {
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

  const toggleFav = (value, type) => {
    const { mailFav } = state;
    let mailFavDuplicate = mailFav;

    if (type === 'add') {
      mailFavDuplicate[value] = 1;

      addFavorite(value, 'mail')
        .then(() => {
          setState({ ...state, mailFav: mailFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      mailFavDuplicate[value] = undefined;

      deleteFavorite(value, 'mail')
        .then(() => {
          setState({ ...state, mailFav: mailFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  const toggleAll = toggled => {
    const { mails } = state;
    setState({ ...state, toggledAll: toggled });

    if (state.toggledAll) {
      let mailNames = [];

      for (let i in mails) {
        mailNames.push(i);

        mails[i]['isChecked'] = true;
      }

      setState({ ...state, mails, selection: mailNames });
    } else {
      for (let i in mails) {
        mails[i]['isChecked'] = false;
      }

      setState({ ...state, mails, selection: [] });
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
    <div className="mails">
      <Toolbar mobile={false} >
        <LeftButton name="Add Mail Domain" href="/add/mail" showLeftMenu={true} />
        <div className="r-menu">
          <div className="input-group input-group-sm">
            <a href={state.webMail} className="button-extra" type="submit">{window.GLOBAL.App.i18n['open webMail']}</a>
            <Checkbox toggleAll={toggleAll} toggled={state.toggledAll} />
            <Select list='mailList' bulkAction={bulk} />
            <DropdownFilter changeSorting={changeSorting} sorting={state.sorting} order={state.order} list="mailList" />
            <SearchInput handleSearchTerm={term => props.changeSearchTerm(term)} />
          </div>
        </div>
      </Toolbar>
      <div className="mails-wrapper">
        {state.loading ? <Spinner /> : mails()}
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

export default Mails;