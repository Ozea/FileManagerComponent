import React from 'react';
import './Dropdown.scss';

function changeSorting(field, order, props) {
  props.changeSorting(field, order);
}

function button(sorting, order) {
  function sort(sorting) {
    if (sorting === "Type") {
      return window.GLOBAL.App.Constants.FM_type;
    } else if (sorting === "Size") {
      return window.GLOBAL.App.Constants.FM_size;
    } else if (sorting === "Date") {
      return window.GLOBAL.App.Constants.FM_date;
    } else if (sorting === "Name") {
      return window.GLOBAL.App.Constants.FM_name;
    }
  }
  
  if (order === "descending") {
    return (
      <button type="button" className="btn btn-secondary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {sort(sorting)}
        <span className="arrow-down">&#8595;</span>
      </button>
    );
  } else {
    return (
      <button type="button" className="btn btn-secondary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {sort(sorting)}
        <span>&#8593;</span>
      </button>
    );
  }
}

const Dropdown = (props) => {
  return (
    <div class="btn-group">
      {button(props.sortingName, props.order)}
      <div class="dropdown-menu">
        <ul className="dropdown-list">
          <li>
            <span className={props.sortingName === "Type" && props.order === "descending" ? "dropdown-item active" : "dropdown-item"} onClick={() => changeSorting("Type", "descending", props)}>{window.GLOBAL.App.Constants.FM_type}<span className="arrow-down">&#8595;</span></span>
            <span className={props.sortingName === "Type" && props.order === "ascending" ? "dropdown-item active" : "dropdown-item"}  onClick={() => changeSorting("Type", "ascending", props)}><span>&#8593;</span></span>
          </li>
          <li>
            <span className={props.sortingName === "Size" && props.order === "descending" ? "dropdown-item active" : "dropdown-item"} onClick={() => changeSorting("Size", "descending", props)}>{window.GLOBAL.App.Constants.FM_size}<span className="arrow-down">&#8595;</span></span>
            <span className={props.sortingName === "Size" && props.order === "ascending" ? "dropdown-item active" : "dropdown-item"}  onClick={() => changeSorting("Size", "ascending", props)}><span>&#8593;</span></span>
          </li>
          <li>
            <span className={props.sortingName === "Date" && props.order === "descending" ? "dropdown-item active" : "dropdown-item"} onClick={() => changeSorting("Date", "descending", props)}>{window.GLOBAL.App.Constants.FM_date}<span className="arrow-down">&#8595;</span></span>
            <span className={props.sortingName === "Date" && props.order === "ascending" ? "dropdown-item active" : "dropdown-item"}  onClick={() => changeSorting("Date", "ascending", props)}><span>&#8593;</span></span>
          </li>
          <li>
            <span className={props.sortingName === "Name" && props.order === "descending" ? "dropdown-item active" : "dropdown-item"} onClick={() => changeSorting("Name", "descending", props)}>{window.GLOBAL.App.Constants.FM_name}<span className="arrow-down">&#8595;</span></span>
            <span className={props.sortingName === "Name" && props.order === "ascending" ? "dropdown-item active" : "dropdown-item"}  onClick={() => changeSorting("Name", "ascending", props)}><span>&#8593;</span></span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;