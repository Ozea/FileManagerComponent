import React, { Component } from 'react';
import FileManager from '../FileManager/FileManager';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
import Preview from '../../components/Preview/Preview';

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
          <Route path="/list/directory/preview" component={(props) => <Preview onClose={() => this.onClose(props.history)} />} />
          <Route path="/list/directory/" exact component={FileManager} />
        </Router>
      </div>
    );
  }
}

export default App;
