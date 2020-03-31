import React, { Component } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import WebDomain from '../../components/WebDomain/WebDomain';
import { web } from '../../mocks/web';
import './Web.scss';

class Web extends Component {
  state = {
    webDomains: [],
    loading: false
  }

  componentDidMount() {
    this.setState({
      loading: true,
      webDomains: web
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { webDomains } = this.state;
    let result = [];

    for (let i in webDomains) {
      result.push(webDomains[i]);
    }

    if (result.length < 2) {
      return <div className="total">{result.length} domain</div>;
    } else {
      return <div className="total">{result.length} domains</div>;
    }
  }

  webDomains = () => {
    const { webDomains } = this.state;
    const result = [];

    for (let i in webDomains) {
      result.push(webDomains[i]);
    }

    return result.map((item, index) => {
      return <WebDomain data={item} key={index} />;
    });
  }

  render() {
    return (
      <div className="web">
        {this.state.loading ? <Spinner /> : this.webDomains()}
        {this.totalAmount()}
      </div>
    );
  }
}

export default Web;