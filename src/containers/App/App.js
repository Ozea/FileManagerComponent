import React, { Component } from 'react';
import FileManager from '../FileManager/FileManager';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Preview from '../../components/Preview/Preview';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBook, faFile, faDownload, faFileAlt, faImage, faFolderOpen, faEllipsisH, faFolder, faItalic, faUser, faCopy, faPaste, faTrash, faBoxOpen, faArrowDown, faArrowUp, faBell, faPlus, faAngleRight, faStar, faUserLock, faPen, faLock, faTimes, faSearch, faCog } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min';
import './App.scss';
import ControlPanelContent from '../ControlPanelContent/ControlPanelContent';

library.add(faBook, faDownload, faFile, faFileAlt, faFolderOpen, faImage, faEllipsisH, faFolder, faItalic, faUser, faCopy, faPaste, faTrash, faBoxOpen, faArrowDown, faArrowUp, faBell, faPlus, faAngleRight, faStar, faUserLock, faPen, faLock, faTimes, faSearch, faCog);

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
            <Route path="/list/directory" exact component={FileManager} />
            <Route path="/list" component={ControlPanelContent} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
