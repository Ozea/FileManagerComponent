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
        <div>
          {this.state.loading ? <Spinner /> : this.webDomains()}
        </div>
      </div>
    );
  }
}

export default Web;