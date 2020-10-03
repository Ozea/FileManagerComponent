import React, { useEffect, useState } from 'react';
import { addControlPanelContentFocusedElement, removeControlPanelContentFocusedElement } from '../../actions/ControlPanelContent/controlPanelContentActions';
import { bulkAction, getFirewallList, handleAction } from '../../ControlPanelService/Firewalls';
import DropdownFilter from '../../components/MainNav/Toolbar/DropdownFilter/DropdownFilter';
import * as MainNavigation from '../../actions/MainNavigation/mainNavigationActions';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import { addFavorite, deleteFavorite } from '../../ControlPanelService/Favorites';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Modal from '../../components/ControlPanel/Modal/Modal';
import Firewall from '../../components/Firewall/Firewall';
import Spinner from '../../components/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import './Firewalls.scss';

const Firewalls = props => {
  const { i18n } = window.GLOBAL.App;
  const token = localStorage.getItem("token");
  const { controlPanelFocusedElement } = useSelector(state => state.controlPanelContent);
  const { focusedElement } = useSelector(state => state.mainNavigation);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    firewalls: [],
    firewallFav: [],
    selection: [],
    firewallExtension: '',
    loading: false,
    modalText: '',
    modalVisible: false,
    modalActionUrl: '',
    toggledAll: false,
    sorting: i18n.Action,
    order: "descending",
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
  }, [controlPanelFocusedElement, focusedElement, state.firewalls]);

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

  const initFocusedElement = firewalls => {
    firewalls[0]['FOCUSED'] = firewalls[0]['NAME'];
    setState({ ...state, firewalls });
    dispatch(addControlPanelContentFocusedElement(firewalls[0]['NAME']));
  }

  const handleArrowDown = () => {
    let firewalls = [...state.firewalls];

    if (focusedElement) {
      MainNavigation.removeFocusedElement();
    }

    if (controlPanelFocusedElement === '') {
      initFocusedElement(firewalls);
      return;
    }

    let focusedElementPosition = firewalls.findIndex(firewall => firewall.NAME === controlPanelFocusedElement);

    if (focusedElementPosition !== firewalls.length - 1) {
      let nextFocusedElement = firewalls[focusedElementPosition + 1];
      firewalls[focusedElementPosition]['FOCUSED'] = '';
      nextFocusedElement['FOCUSED'] = nextFocusedElement['NAME'];
      document.getElementById(nextFocusedElement['NAME']).scrollIntoView({ behavior: "smooth", block: "center" });
      setState({ ...state, firewalls });
      dispatch(addControlPanelContentFocusedElement(nextFocusedElement['NAME']));
    }
  }

  const handleArrowUp = () => {
    let firewalls = [...state.firewalls];

    if (focusedElement) {
      MainNavigation.removeFocusedElement();
    }

    if (controlPanelFocusedElement === '') {
      initFocusedElement(firewalls);
      return;
    }

    let focusedElementPosition = firewalls.findIndex(firewall => firewall.NAME === controlPanelFocusedElement);

    if (focusedElementPosition !== 0) {
      let nextFocusedElement = firewalls[focusedElementPosition - 1];
      firewalls[focusedElementPosition]['FOCUSED'] = '';
      nextFocusedElement['FOCUSED'] = nextFocusedElement['NAME'];
      document.getElementById(nextFocusedElement['NAME']).scrollIntoView({ behavior: "smooth", block: "center" });
      setState({ ...state, firewalls });
      dispatch(addControlPanelContentFocusedElement(nextFocusedElement['NAME']));
    }
  }

  const handleFocusedElementShortcuts = event => {
    let isSearchInputFocused = document.querySelector('input:focus');

    if (controlPanelFocusedElement && !isSearchInputFocused) {
      switch (event.keyCode) {
        case 8: return handleDelete();
        case 13: return handleEdit();
        case 83: return handleSuspend();
        default: break;
      }
    }
  }

  const handleEdit = () => {
    props.history.push(`/edit/firewall?rule=${controlPanelFocusedElement}`);
  }

  const handleSuspend = () => {
    const { firewalls } = state;
    let currentFirewallData = firewalls.filter(firewall => firewall.NAME === controlPanelFocusedElement)[0];
    let suspendedStatus = currentFirewallData.SUSPENDED === 'yes' ? 'unsuspend' : 'suspend';

    displayModal(currentFirewallData.suspend_conf, `/${suspendedStatus}/firewall?rule=${controlPanelFocusedElement}&token=${token}`);
  }

  const handleDelete = () => {
    const { firewalls } = state;
    let currentFirewallData = firewalls.filter(firewall => firewall.NAME === controlPanelFocusedElement)[0];

    displayModal(currentFirewallData.delete_conf, `/delete/firewall/?rule=${controlPanelFocusedElement}&token=${token}`);
  }

  const fetchData = () => {
    setState({ ...state, loading: true });

    getFirewallList()
      .then(result => {
        setState({
          ...state,
          firewalls: reformatData(result.data.data),
          firewallFav: result.data.firewallFav,
          firewallExtension: result.data.firewallExtension,
          totalAmount: result.data.totalAmount,
          loading: false
        });
      })
      .catch(err => console.error(err));
  }

  const reformatData = data => {
    let firewalls = [];

    for (let i in data) {
      data[i]['NAME'] = i;
      data[i]['FOCUSED'] = controlPanelFocusedElement === i;
      firewalls.push(data[i]);
    }

    return firewalls;
  }

  const changeSorting = (sorting, order) => {
    setState({
      ...state,
      sorting,
      order
    });
  }

  const firewalls = () => {
    const firewallFav = { ...state.firewallFav };
    let firewalls = [...state.firewalls];

    firewalls.forEach(firewall => {
      firewall.FOCUSED = controlPanelFocusedElement === firewall.NAME;

      if (firewallFav[firewall.NAME]) {
        firewall.STARRED = firewallFav[firewall.NAME];
      } else {
        firewall.STARRED = 0;
      }
    });

    let sortedResult = sortArray(firewalls);

    return sortedResult.map((item, index) => {
      return <Firewall data={item} key={index} toggleFav={toggleFav} checkItem={checkItem} handleModal={displayModal} />;
    });
  }

  const checkItem = name => {
    const { selection, firewalls } = state;
    let duplicate = [...selection];
    let firewallsDuplicate = firewalls;
    let checkedItem = duplicate.indexOf(name);

    let incomingItem = firewallsDuplicate.findIndex(db => db.NAME === name);
    firewallsDuplicate[incomingItem].isChecked = !firewallsDuplicate[incomingItem].isChecked;

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    setState({ ...state, firewalls: firewallsDuplicate, selection: duplicate });
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
    const { Action, Protocol, Port, Comment, Starred } = window.GLOBAL.App.i18n;

    switch (sorting) {
      case Action: return 'ACTION';
      case Protocol: return 'PROTOCOL';
      case Port: return 'PORT';
      case i18n['IP address']: return 'IP';
      case Comment: return 'COMMENT';
      case Starred: return 'STARRED';
      default: break;
    }
  }

  const toggleFav = (value, type) => {
    const { firewallFav } = state;
    let firewallFavDuplicate = firewallFav;

    if (type === 'add') {
      firewallFavDuplicate[value] = 1;

      addFavorite(value, 'firewall')
        .then(() => {
          setState({ ...state, firewallFav: firewallFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      firewallFavDuplicate[value] = undefined;

      deleteFavorite(value, 'firewall')
        .then(() => {
          setState({ ...state, firewallFav: firewallFavDuplicate });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  const toggleAll = toggled => {
    if (toggled) {
      let firewallNames = [];

      let firewalls = state.firewalls.map(firewall => {
        firewallNames.push(firewall.NAME);
        firewall.isChecked = true;
        return firewall;
      });

      setState({ ...state, firewalls, selection: firewallNames, toggledAll: toggled });
    } else {
      let firewalls = state.firewalls.map(firewall => {
        firewall.isChecked = false;
        return firewall;
      });

      setState({ ...state, firewalls, selection: [], toggledAll: toggled });
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
    <div className="firewalls">
      <Toolbar mobile={false} >
        <LeftButton href="/add/firewall/" name={i18n['Add Rule']} showLeftMenu={true} />
        <div className="r-menu">
          <div className="input-group input-group-sm">
            <a href='/list/firewall/banlist/' className="button-extra" type="submit">{window.GLOBAL.App.i18n['list fail2ban']}</a>
            <Checkbox toggleAll={toggleAll} toggled={state.toggledAll} />
            <Select list='firewallList' bulkAction={bulk} />
            <DropdownFilter changeSorting={changeSorting} sorting={state.sorting} order={state.order} list="firewallList" />
            <SearchInput handleSearchTerm={term => props.changeSearchTerm(term)} />
          </div>
        </div>
      </Toolbar>
      <div className="firewalls-wrapper">
        {state.loading ? <Spinner /> : firewalls()}
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

export default Firewalls;