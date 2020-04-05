import React, { Component } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import DomainNameSystem from '../../components/DomainNameSystem/DomainNameSystem';
import { domainNameSystems } from '../../mocks/dns';
import './DomainNameSystems.scss';

class DomainNameSystems extends Component {
  state = {
    domainNameSystems: [],
    loading: false
  }

  componentDidMount() {
    this.setState({
      loading: true,
      domainNameSystems
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { domainNameSystems } = this.state;
    let result = [];
    
    for (let i in domainNameSystems) {
      result.push(domainNameSystems[i]);
    }

    if ( result.length < 2 ) {
      return <div className="total">{result.length} domain</div>;
    } else {
      return <div className="total">{result.length} domains</div>;
    }
  }

  dns = () => {
    const { domainNameSystems } = this.state;
    const result = [];

    for (let i in domainNameSystems) {
      domainNameSystems[i].NAME = i;
      result.push(domainNameSystems[i]);
    }

    return result.map((item, index) => {
      return <DomainNameSystem data={item} key={index} />;
    });
  }

  render() {
    return (
      <div className="dns">
        <div>
          {this.state.loading ? <Spinner /> : this.dns()}
        </div>
        {this.totalAmount()}
      </div>
    );
  }
}

export default DomainNameSystems;