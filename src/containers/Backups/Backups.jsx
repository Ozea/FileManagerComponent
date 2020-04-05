import React, { Component } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import Backup from '../../components/Backup/Backup';
import { backups } from '../../mocks/backups';
import './Backups.scss';

class Backups extends Component {
  state = {
    backups: [],
    loading: false
  }

  componentDidMount() {
    this.setState({
      loading: true,
      backups
    }, () => this.setState({ loading: false }));
  }

  totalAmount = () => {
    const { backups } = this.state;
    let result = [];
    
    for (let i in backups) {
      result.push(backups[i]);
    }

    if ( result.length < 2 ) {
      return <div className="total">{result.length} archive</div>;
    } else {
      return <div className="total">{result.length} archives</div>;
    }
  }

  backups = () => {
    const { backups } = this.state;
    const result = [];

    for (let i in backups) {
      backups[i].NAME = i;
      result.push(backups[i]);
    }

    return result.map((item, index) => {
      return <Backup data={item} key={index} />;
    });
  }

  render() {
    return (
      <div className="backups">
        <div>
          {this.state.loading ? <Spinner /> : this.backups()}
        </div>
        {this.totalAmount()}
      </div>
    );
  }
}

export default Backups;