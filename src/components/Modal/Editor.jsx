import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';

class Editor extends Component {
  state = {
    code: "Hello"
  }

  updateCode = (newCode) => {
    this.setState({
      code: newCode
    });
  }

  render() {
    let options = {
      mode: 'javascript',
      lineNumbers: true
    };
    return (
      <div className="editor">
        <span className="close" onClick={this.props.closeModal}>&times;</span>
        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} autoFocus />
        <button type="button" className="btn btn-primary save">Save</button>
      </div>
    );
  }
}

export default Editor;