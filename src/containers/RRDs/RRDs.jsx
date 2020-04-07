import React, { Component } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import RRD from '../../components/RRD/RRD';
import { rrds } from '../../mocks/rrds';
import './RRDs.scss';

class RRDs extends Component {
  state = {
    rrds: [],
    loading: false,
    total: 0
  }

  componentDidMount() {
    this.setState({
      loading: true,
      rrds
    }, () => this.setState({ loading: false }));
  }

  packages = () => {
    const { rrds } = this.state;
    const result = [];

    for (let i in rrds) {
      result.push(rrds[i]);
    }

    return result.map((item, index) => {
      return <RRD data={item} key={index} />;
    });
  }

  render() {
    return (
      <div className="rrd-list">
        {this.state.loading ? <Spinner /> : this.packages()}
      </div>
    );
  }
}

export default RRDs;