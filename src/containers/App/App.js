import React, { Component } from 'react';
import FileManager from '../FileManager/FileManager';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Preview from '../../components/Preview/Preview';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min';
import './App.scss';
import ControlPanelContent from '../ControlPanelContent/ControlPanelContent';
import WebLogs from '../WebLogs/WebLogs';

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

class App extends Component {

  onClose = (history) => {
    let lastOpenedDirectory = history.location.search.substring(6, history.location.search.lastIndexOf('/'));
    history.push({
      pathname: '/list/directory',
      search: `?path=${lastOpenedDirectory}`
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/list/directory/preview" component={(props) => <Preview onClose={() => this.onClose(props.history)} />} />
            <Route path="/list/directory/" exact component={FileManager} />
            <Route path="/list/web-log/" exact component={WebLogs} />
            <Route path="/" component={ControlPanelContent} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
