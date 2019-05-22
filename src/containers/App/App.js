import React, { Component } from 'react';
import FileManager from '../FileManager/FileManager';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
import Preview from '../../components/Preview/Preview';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/preview" component={(props) => <Preview onClose={() => props.history.push('/')} />} />
          <Route path="/" exact component={FileManager} />
        </Router>
      </div>
    );
  }
}

export default App;
