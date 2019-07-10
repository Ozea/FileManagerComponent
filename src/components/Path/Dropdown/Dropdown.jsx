import React from 'react';
import './Dropdown.scss';

function changeSorting(field, order, props) {
  props.changeSorting(field, order);
}

function button(sorting, order) {
  if (order === "descending") {
    return (
      <button type="button" class="btn btn-secondary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {sorting}
        <span className="glyphicon glyphicon-arrow-down"></span>
      </button>
    );
  } else {
    return (
      <button type="button" class="btn btn-secondary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {sorting}
        <span className="glyphicon glyphicon-arrow-up"></span>
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
            <span className={props.sortingName === "Type" && props.order === "descending" ? "dropdown-item active" : "dropdown-item"} onClick={() => changeSorting("Type", "descending", props)}>Type<span className="glyphicon glyphicon-arrow-down"></span></span>
            <span className={props.sortingName === "Type" && props.order === "ascending" ? "dropdown-item active" : "dropdown-item"}  onClick={() => changeSorting("Type", "ascending", props)}><span className="glyphicon glyphicon-arrow-up"></span></span>
          </li>
          <li>
            <span className={props.sortingName === "Size" && props.order === "descending" ? "dropdown-item active" : "dropdown-item"} onClick={() => changeSorting("Size", "descending", props)}>Size<span className="glyphicon glyphicon-arrow-down"></span></span>
            <span className={props.sortingName === "Size" && props.order === "ascending" ? "dropdown-item active" : "dropdown-item"}  onClick={() => changeSorting("Size", "ascending", props)}><span className="glyphicon glyphicon-arrow-up"></span></span>
          </li>
          <li>
            <span className={props.sortingName === "Date" && props.order === "descending" ? "dropdown-item active" : "dropdown-item"} onClick={() => changeSorting("Date", "descending", props)}>Date<span className="glyphicon glyphicon-arrow-down"></span></span>
            <span className={props.sortingName === "Date" && props.order === "ascending" ? "dropdown-item active" : "dropdown-item"}  onClick={() => changeSorting("Date", "ascending", props)}><span className="glyphicon glyphicon-arrow-up"></span></span>
          </li>
          <li>
            <span className={props.sortingName === "Name" && props.order === "descending" ? "dropdown-item active" : "dropdown-item"} onClick={() => changeSorting("Name", "descending", props)}>Name<span className="glyphicon glyphicon-arrow-down"></span></span>
            <span className={props.sortingName === "Name" && props.order === "ascending" ? "dropdown-item active" : "dropdown-item"}  onClick={() => changeSorting("Name", "ascending", props)}><span className="glyphicon glyphicon-arrow-up"></span></span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;