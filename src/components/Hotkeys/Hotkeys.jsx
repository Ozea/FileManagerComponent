import React from 'react';
import './Hotkeys.scss'

function style(style) {
  if (style === "inactive") {
    return "none";
  } else {
    return "block";
  }
}

const Hotkeys = (props) => {
  return (
    <div className="panel panel-default" style={{ display: style(props.style) }}>
      <div className="panel-heading">
        <h2>Shortcuts</h2>
      </div>
      <div className="panel-body">
        <button type="button" className="close" onClick={props.close} >
          <span aria-hidden="true">&times;</span>
        </button>
        <ul>
          <li><span className="shortcut">u</span> Upload</li>
          <li><span className="shortcut">n</span> New file</li>
          <li><span className="shortcut">F7</span> New folder</li>
          <li><span className="shortcut">d</span> Download</li>
          <li><span className="shortcut">F2 / Shift + F6</span> Rename</li>
          <li><span className="shortcut">m</span> Move</li>
          <li><span className="shortcut">F5</span> Copy</li>
          <li><span className="shortcut">a</span> Archive</li>
          <li><span className="shortcut">F8 / Del</span> delete</li>
          <li><span className="shortcut">Ctrl + s</span> Save file (in text editor)</li>
          <li><span className="shortcut">h</span> Display / Close shortcuts</li>
        </ul>
        <ul>
          <li><span className="glyphicon glyphicon-arrow-up shortcut"></span> Move cursor up</li>
          <li><span className="glyphicon glyphicon-arrow-down shortcut"></span> Move cursor down</li>
          <li><span className="glyphicon glyphicon-arrow-left shortcut"></span> Switch to the Left tab</li>
          <li><span className="glyphicon glyphicon-arrow-right shortcut"></span> Switch to the Right tab</li>
          <li><span className="shortcut">Tab</span> Switch Tab</li>
          <li><span className="shortcut">Enter</span> Open/Preview file / Enter directory</li>
          <li><span className="shortcut">F4</span> Edit file</li>
          <li><span className="shortcut">Backspace</span> Go to the parent directory</li>
          <li><span className="shortcut">Ctr + Click</span> Select a bunch of files</li>
          <li><span className="shortcut">Shift + Cursor up/down</span> Select a bunch of files</li>
        </ul>
      </div>
    </div>
  );
}

export default Hotkeys;