import React, { Component } from 'react';
import InternetProtocol from '../../components/InternetProtocol/InternetProtocol';
import { internetProtocols } from '../../mocks/internetProtocols';
import Spinner from '../../components/Spinner/Spinner';
import './InternetProtocols.scss';

class InternetProtocols extends Component {
  state = {
    internetProtocols: [],
    loading: false
  }

  componentDidMount() {
    this.setState({
      loading: true,
      internetProtocols
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { internetProtocols } = this.state;
    let result = [];
    
    for (let i in internetProtocols) {
      result.push(internetProtocols[i]);
    }

    if ( result.length < 2 ) {
      return <div className="total">{result.length} IP address</div>;
    } else {
      return <div className="total">{result.length} IP addresses</div>;
    }
  }

  dns = () => {
    const { internetProtocols } = this.state;
    const result = [];

    for (let i in internetProtocols) {
      internetProtocols[i].NAME = i;
      result.push(internetProtocols[i]);
    }

    return result.map((item, index) => {
      return <InternetProtocol data={item} key={index} />;
    });
  }

  render() {
    return (
      <div className="internetProtocols">
        <div>
          {this.state.loading ? <Spinner /> : this.dns()}
        </div>
        {this.totalAmount()}
      </div>
    );
  }
}

export default InternetProtocols;