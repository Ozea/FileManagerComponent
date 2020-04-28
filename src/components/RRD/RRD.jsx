import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from '../ControlPanel/Container/Container';
import { generateImagePath } from '../../mocks/rrds';
import './RRD.scss';

class RRD extends Component {
  state = {
    period: "daily"
  };

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
      <div className="rrd-item">
        <Container className="l-col w-15">
          {this.printDate(data.DATE)}
          <div className="time">{data.TIME}</div>
        </Container>
        <Container className="r-col w-85">
          <div className="name">{data.TITLE}</div>
          <div className="stats">
            <Container className="w-100">
              <div><img src={generateImagePath(this.state.period, data.TYPE)} alt="img" /></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div>LOGOUT <FontAwesomeIcon icon="user-lock" /></div>
          <div>EDIT <FontAwesomeIcon icon="pen" /></div>
          <div>SUSPEND <FontAwesomeIcon icon="lock" /></div>
          <div>DELETE <FontAwesomeIcon icon="times" /></div>
        </div>
      </div>
    );
  }
}

export default RRD;