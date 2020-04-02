import React, { Component } from 'react';
import Package from '../../components/Package/Package';
import Spinner from '../../components/Spinner/Spinner';
import { packages } from '../../mocks/packages';
import './Packages.scss';

class Packages extends Component {
  state = {
    packages: [],
    loading: false,
    total: 0
  }

  componentDidMount() {
    this.setState({
      loading: true,
      packages
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { packages } = this.state;
    let result = [];
    
    for (let i in packages) {
      result.push(packages[i]);
    }

    if ( result.length < 2 ) {
      return <div className="total">{result.length} package</div>;
    } else {
      return <div className="total">{result.length} packages</div>;
    }
  }

  packages = () => {
    const { packages } = this.state;
    const result = [];

    for (let i in packages) {
      packages[i]['NAME'] = i;
      result.push(packages[i]);
    }

    return result.map((item, index) => {
      return <Package data={item} key={index} />;
    });
  }

  render() {
    return (
      <div className="packages">
        {this.state.loading ? <Spinner /> : this.packages()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default Packages;
