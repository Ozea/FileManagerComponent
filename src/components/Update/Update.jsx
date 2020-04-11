import React, { Component } from 'react';
import Container from '../ControlPanel/Container/Container';
import ListItem from '../ControlPanel/ListItem/ListItem';
import './Update.scss';

class Update extends Component {
  isUpdated = status => {
    if (status === 'no') {
      return 'UPDATED';
    }

    return 'OUTDATED';
  }

  isOutdated = status => {
    return status !== "no";
  }

  render() {
    const { data, toggled } = this.props;

    return (
      <ListItem checked={false} toggled={toggled} date={false} outdated={this.isOutdated(data.UPDATED)} leftNameText={this.isUpdated(data.UPDATED)}>
        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <div className="stats">
            <Container className="c-1 w-40">
              <div className="descr"><span className="stat">{data.DESCR}</span></div>
            </Container>
            <Container className="c-2 w-30">
              <div>Version: <span><span className="stat">{data.VERSION}</span> {`(${data.ARCH})`}</span></div>
            </Container>
            <Container className="c-3 w-30">
              <div>Release: <span className="stat">{data.RELEASE}</span></div>
            </Container>
          </div>
        </Container>
      </ListItem>
    );
  }
}

export default Update;