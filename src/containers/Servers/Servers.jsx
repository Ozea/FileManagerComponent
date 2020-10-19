import React, { useEffect, useState } from 'react';
import { addControlPanelContentFocusedElement, removeControlPanelContentFocusedElement } from '../../actions/ControlPanelContent/controlPanelContentActions';
import { bulkAction, getServersList, handleAction } from '../../ControlPanelService/Server';
import * as MainNavigation from '../../actions/MainNavigation/mainNavigationActions';
import SearchInput from '../../components/MainNav/Toolbar/SearchInput/SearchInput';
import LeftButton from '../../components/MainNav/Toolbar/LeftButton/LeftButton';
import Checkbox from '../../components/MainNav/Toolbar/Checkbox/Checkbox';
import Select from '../../components/MainNav/Toolbar/Select/Select';
import Toolbar from '../../components/MainNav/Toolbar/Toolbar';
import Modal from '../../components/ControlPanel/Modal/Modal';
import ServerSys from '../../components/Server/ServerSys';
import Spinner from '../../components/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import Server from '../../components/Server/Server';
import './Servers.scss';

const Servers = props => {
  const { i18n } = window.GLOBAL.App;
  const token = localStorage.getItem("token");
  const { controlPanelFocusedElement } = useSelector(state => state.controlPanelContent);
  const { focusedElement } = useSelector(state => state.mainNavigation);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    servers: [],
    selection: [],
    modalText: '',
    modalVisible: false,
    modalActionUrl: '',
    loading: false,
    toggledAll: false,
    sorting: i18n.Action,
    order: "descending",
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
  }, [controlPanelFocusedElement, focusedElement, state.servers]);

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

  const initFocusedElement = servers => {
    servers[0]['FOCUSED'] = servers[0]['NAME'];
    setState({ ...state, servers });
    dispatch(addControlPanelContentFocusedElement(servers[0]['NAME']));
  }

  const handleArrowDown = () => {
    let servers = [...state.servers];

    if (focusedElement) {
      MainNavigation.removeFocusedElement();
    }

    if (controlPanelFocusedElement === '') {
      initFocusedElement(servers);
      return;
    }

    let focusedElementPosition = servers.findIndex(server => server.NAME === controlPanelFocusedElement);

    if (focusedElementPosition !== servers.length - 1) {
      let nextFocusedElement = servers[focusedElementPosition + 1];
      servers[focusedElementPosition]['FOCUSED'] = '';
      nextFocusedElement['FOCUSED'] = nextFocusedElement['NAME'];
      document.getElementById(nextFocusedElement['NAME']).scrollIntoView({ behavior: "smooth", block: "center" });
      setState({ ...state, servers });
      dispatch(addControlPanelContentFocusedElement(nextFocusedElement['NAME']));
    }
  }

  const handleArrowUp = () => {
    let servers = [...state.servers];

    if (focusedElement) {
      MainNavigation.removeFocusedElement();
    }

    if (controlPanelFocusedElement === '') {
      initFocusedElement(servers);
      return;
    }

    let focusedElementPosition = servers.findIndex(server => server.NAME === controlPanelFocusedElement);

    if (focusedElementPosition !== 0) {
      let nextFocusedElement = servers[focusedElementPosition - 1];
      servers[focusedElementPosition]['FOCUSED'] = '';
      nextFocusedElement['FOCUSED'] = nextFocusedElement['NAME'];
      document.getElementById(nextFocusedElement['NAME']).scrollIntoView({ behavior: "smooth", block: "center" });
      setState({ ...state, servers });
      dispatch(addControlPanelContentFocusedElement(nextFocusedElement['NAME']));
    }
  }

  const handleFocusedElementShortcuts = event => {
    let isSearchInputFocused = document.querySelector('input:focus') || document.querySelector('textarea:focus');

    if (controlPanelFocusedElement && !isSearchInputFocused) {
      switch (event.keyCode) {
        case 13: return handleConfigure();
        case 82: return handleRestart();
        case 83: return handleStop();
        default: break;
      }
    }
  }

  const handleConfigure = () => {
    let currentServerData = state.servers.filter(server => server.NAME === controlPanelFocusedElement)[0];

    if (controlPanelFocusedElement !== state.servers[0].NAME) {
      props.history.push(`/edit/server/${currentServerData.NAME}`);
    } else {
      props.history.push('/edit/server');
    }
  }

  const handleStop = () => {
    if (controlPanelFocusedElement !== state.servers[0].NAME) {
      let currentServerData = state.servers.filter(server => server.NAME === controlPanelFocusedElement)[0];

      props.history.push(`/stop/service/?srv=${currentServerData.NAME}&token=${token}`);
    }
  }

  const handleRestart = () => {
    let currentServerData = state.servers.filter(server => server.NAME === controlPanelFocusedElement)[0];
    props.history.push(`/restart/service?srv=${currentServerData.NAME}&token=${token}`);
  }

  const fetchData = () => {
    setState({ ...state, loading: true });

    getServersList()
      .then(result => {
        setState({
          ...state,
          servers: reformatData(result.data.data, result.data.sys),
          loading: false
        });
      })
      .catch(err => console.error(err));
  }

  const reformatData = (servers, sysInfo) => {
    let result = [];

    for (let i in servers) {
      servers[i]['NAME'] = i;
      servers[i]['FOCUSED'] = controlPanelFocusedElement === i;
      result.push(servers[i]);
    }


    result.splice(0, 0, Object.values(sysInfo)[0]);
    result[0]['NAME'] = result[0]['HOSTNAME'];

    return result;
  }

  const servers = () => {
    const result = [];

    state.servers.forEach(server => {
      server.FOCUSED = controlPanelFocusedElement === server.NAME;
      result.push(server);
    });

    return result.map((item, index) => {
      if (item.HOSTNAME) {
        return <ServerSys data={item} key={index} checkItem={checkItem} handleModal={displayModal} />
      } else {
        return <Server data={item} key={index} checkItem={checkItem} handleModal={displayModal} />
      }
    });
  }

  const toggleAll = toggled => {
    let serversDuplicate = [...state.servers];

    if (toggled) {
      let serverNames = [];

      let servers = serversDuplicate.map(server => {
        serverNames.push(server.NAME);
        server.isChecked = true;
        return server;
      });

      setState({ ...state, servers, selection: serverNames, toggledAll: toggled });
    } else {
      let servers = serversDuplicate.map(server => {
        server.isChecked = false;
        return server;
      });

      setState({ ...state, servers, selection: [], toggledAll: toggled });
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

  const checkItem = name => {
    const { selection, servers, sysInfo } = state;
    let duplicate = [...selection];
    let serversDuplicate = [...state.servers];
    let checkedItem = duplicate.indexOf(name);

    let incomingItem = serversDuplicate.findIndex(server => server.NAME === name);
    serversDuplicate[incomingItem].isChecked = !serversDuplicate[incomingItem].isChecked;

    if (checkedItem !== -1) {
      duplicate.splice(checkedItem, 1);
    } else {
      duplicate.push(name);
    }

    setState({ ...state, servers: serversDuplicate, selection: duplicate });
  }

  return (
    <div className="servers-list">
      <Toolbar mobile={false}>
        <LeftButton href="/edit/server/" list="server" name={i18n.configure} showLeftMenu={true} />
        <div className="r-menu">
          <div className="input-group input-group-sm">
            <a href="/list/server/?cpu" className="button-extra">{i18n['show: CPU / MEM / NET / DISK']}</a>
            <Checkbox toggleAll={toggleAll} toggled={state.toggledAll} />
            <Select list='serverList' bulkAction={bulk} />
            <SearchInput handleSearchTerm={term => props.changeSearchTerm(term)} />
          </div>
        </div>
      </Toolbar>
      {state.loading ? <Spinner /> : (
        <div className="servers-wrapper">
          {servers()}
        </div>
      )}
      <Modal
        onSave={modalConfirmHandler}
        onCancel={modalCancelHandler}
        show={state.modalVisible}
        text={state.modalText} />
    </div>
  );
}

export default Servers;