import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import Container from '../ControlPanel/Container/Container';
import { generateImagePath } from '../../ControlPanelService/RRD';
import './RRD.scss';

class RRD extends Component {
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
    const { i18n } = window.GLOBAL.App;

    return (
      <div className="rrd-item">
        <Container className="l-col w-15">
          {this.printDate(data.DATE)}
        </Container>
        <Container className="r-col w-85">
          <div className="name">{i18n[data.TITLE]}</div>
          <div className="stats">
            <Container className="w-100">
              <div><img src={generateImagePath(this.props.period, data.TYPE, data.RRD)} alt="img" /></div>
            </Container>
          </div>
        </Container>
        <div className="actions">
          <div>
            <a className="link-download" href={generateImagePath(this.props.period, data.TYPE, data.RRD)}>{i18n.download} <FontAwesomeIcon icon={faFileDownload} /></a>
          </div>
        </div>
      </div>
    );
  }
}

export default RRD;