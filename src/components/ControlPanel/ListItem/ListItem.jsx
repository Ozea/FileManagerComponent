import React, { Component } from 'react';
import Container from '../Container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ListItem.scss';

class ListItem extends Component {
  state = {
    toggled: false,
    checked: false,
    starred: false
  }

  UNSAFE_componentWillMount() {
    this.setState({ starred: this.props.starred === 1 });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { toggled } = nextProps;

    this.setState({
      toggled,
      checked: toggled,
    });
  }

  printDate = date => {
    if (date) {
      let newDate = new Date(date);
      let day = newDate.getDate();
      let month = newDate.getMonth();
      let year = newDate.getFullYear();
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
      return <div className="date">{day} &nbsp; {months[month - 1]} &nbsp; {year}</div>;
    }
  }

  toggleItem = (event) => {
    this.setState({
      toggled: event.target.checked,
      checked: event.target.checked
    });
  }

  starItem = () => {
    this.setState({ starred: !this.state.starred });
  }

  className = () => {
    const { toggled, starred } = this.state;

    if (toggled) {
      if (starred) {
        return "list-item toggled starred";
      }

      if (this.props.outdated) {
        return "list-item outdated toggled";
      }

      return "list-item toggled";
    }

    if (starred) {
      return "list-item starred";
    }

    if (this.props.outdated) {
      return "list-item outdated";
    }

    if (this.props.stopped) {
      return "list-item stopped";
    }

    return "list-item";
  }

  render() {
    return (
      <div className={this.className()}>
        <Container className="l-col w-15">
          <div className="checkbox"><input type="checkbox" onChange={(e) => this.toggleItem(e)} checked={this.state.checked} /></div>
          {this.printDate(this.props.date)}
          <div className="text-status">{this.props.leftNameText}</div>
          <div className="star" onClick={this.starItem}><FontAwesomeIcon icon="star" /></div>
        </Container>
        {this.props.children}
      </div>
    );
  }
}

export default ListItem;