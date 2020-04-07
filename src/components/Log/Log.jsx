import React, { Component } from 'react';
import Container from '../ControlPanel/Container/Container';
import './Log.scss';

class Log extends Component {
  printDate = date => {
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return <div className="date">{day} &nbsp; {months[month - 1]} &nbsp; {year}</div>;
  }

  render() {
    const { data } = this.props;

    return (
      <div className="statistic-item">
        <Container className="l-col w-15">
          {this.printDate(data.DATE)}
          {data.TIME}
        </Container>
        <Container className="r-col w-85">
          <div className="name">{data.CMD}</div>
        </Container>
      </div>
    );
  }
}

export default Log;