import React, { Component } from 'react';
import Container from '../ControlPanel/Container/Container';
import ListItem from '../ControlPanel/ListItem/ListItem';
import './Update.scss';

class Update extends Component {
  isUpdated = status => {
    if (status === 'no') {
      return 'OUTDATED';
    }

    return 'UPDATED';
  }

  isOutdated = status => {
    return status === "no";
  }

  checkItem = () => {
    this.props.checkItem(this.props.data.NAME);
  }

  render() {
    const { data } = this.props;
    const { i18n } = window.GLOBAL.App;

    return (
      <ListItem
        outdated={this.isOutdated(data.UPDATED)}
        leftNameText={this.isUpdated(data.UPDATED)}
        checkItem={this.checkItem}
        checked={data.isChecked}
        date={false}>

        <Container className="r-col w-85">
          <div className="name">{data.NAME}</div>
          <div className="stats">
            <Container className="c-1">
              <div className="descr"><span className="stat">{data.DESCR}</span></div>
            </Container>
            <Container className="c-2">
              <div>{i18n.Version}: <span><span className="stat">{data.VERSION}</span> {`(${data.ARCH})`}</span></div>
            </Container>
            <Container className="c-3">
              <div>{i18n.Release}: <span className="stat">{data.RELEASE}</span></div>
            </Container>
          </div>
        </Container>

      </ListItem>
    );
  }
}

export default Update;