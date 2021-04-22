import React, { Component, useEffect } from 'react';
import FileManager from '../FileManager/FileManager';
import { Route, Switch, useHistory } from "react-router-dom";
import Preview from '../../components/Preview/Preview';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min';
import './App.scss';
import ControlPanelContent from '../ControlPanelContent/ControlPanelContent';
import WebLogs from '../WebLogs/WebLogs';
import LoginForm from 'src/components/Login/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken, setAuthToken } from 'src/utils/token';
import { setToken } from 'src/actions/Session/sessionActions';

library.add(
  Icon.faBook,
  Icon.faDownload,
  Icon.faFile,
  Icon.faFileAlt,
  Icon.faFolderOpen,
  Icon.faImage,
  Icon.faEllipsisH,
  Icon.faFolder,
  Icon.faItalic,
  Icon.faUser,
  Icon.faCopy,
  Icon.faPaste,
  Icon.faTrash,
  Icon.faBoxOpen,
  Icon.faArrowDown,
  Icon.faArrowUp,
  Icon.faBell,
  Icon.faPlus,
  Icon.faAngleRight,
  Icon.faStar,
  Icon.faUserLock,
  Icon.faPen,
  Icon.faLock,
  Icon.faTimes,
  Icon.faSearch,
  Icon.faCog,
  Icon.faList,
  Icon.faWrench,
  Icon.faFileDownload,
  Icon.faPause,
  Icon.faPlay,
  Icon.faCogs,
  Icon.faStop,
  Icon.faUnlock,
  Icon.faLongArrowAltUp,
  Icon.faEye,
  Icon.faEyeSlash,
  Icon.faLongArrowAltRight,
  Icon.faCaretDown,
  Icon.faCaretUp,
  Icon.faInfinity,
  Icon.faPlay
);

const App = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);

  useEffect(() => {
    const windowSessionToken = getAuthToken();

    if (!session.token && !windowSessionToken) {
      history.push('/login');
    } else if (!session.token && windowSessionToken) {
      dispatch(setToken(windowSessionToken));
    } else if (session.token && !windowSessionToken) {
      setAuthToken(session.token);
    }
  }, [session]);

  return (
    <div className="App">
      <Switch>
        <Route path="/list/directory/preview" exact component={Preview} />
        <Route path="/list/directory/" exact component={FileManager} />
        <Route path="/list/web-log/" exact component={WebLogs} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/" component={ControlPanelContent} />
      </Switch>
    </div>
  );
}

export default App;
