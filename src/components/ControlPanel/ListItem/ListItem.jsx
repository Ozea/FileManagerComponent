import React, { Component } from 'react';
import Container from '../Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ListItem.scss';

class ListItem extends Component {
  state = {
    toggled: this.props.toggled,
    checked: this.props.checked
  }

  printDate = date => {
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return <div className="date">{day} &nbsp; {months[month - 1]} &nbsp; {year}</div>;
  }

  toggleItem = (event) => {
    this.setState({ toggled: event.target.checked });
  }

  starItem = () => {
    this.setState({ starred: !this.state.starred });
  }

  className = () => {
    const { toggled, starred } = this.state;

    if (toggled && starred) {
      return "list-item toggled starred";
    } else if (toggled) {
      return "list-item toggled";
    } else if (starred) {
      return "list-item starred";
    }

    return "list-item";
  }

  render() {
    return (
      <div className={this.className()}>
        <Container className="l-col w-15">
          <div className="checkbox"><input type="checkbox" onChange={(e) => this.toggleItem(e)} /></div>
          {this.printDate(this.props.date)}
          <div onClick={this.starItem}><FontAwesomeIcon icon="star" /></div>
        </Container>
        {this.props.children}
      </div>
    );
  }
}

export default ListItem;