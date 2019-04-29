import React, { Component } from 'react';
import FileManager from '../FileManager/FileManager';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FileManager />
      </div>
    );
  }
}

export default App;
