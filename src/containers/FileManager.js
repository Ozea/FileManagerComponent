import React, { Component } from 'react';
import LeftDirectoryList from '../components/Lists/LeftDirectoryList';
import RightDirectoryList from '../components/Lists/RightDirectoryList';
import Modal from '../components/Modal/Modal';
// import axios from 'axios';
import '../App.css';

class FileManager extends Component {
  state = {
    // date: new Date().getTime(),
    leftList: {
      "listing": [
        {
          "type": "d",
          "permissions": "711",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "admin",
          "group": "admin",
          "size": "4096",
          "name": ""
        },
        {
          "type": "f",
          "permissions": "644",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "admin",
          "group": "admin",
          "size": "124",
          "name": ".bashrc"
        },
        {
          "type": "f",
          "permissions": "644",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "admin",
          "group": "admin",
          "size": "176",
          "name": ".bash_profile"
        },
        {
          "type": "d",
          "permissions": "751",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "admin",
          "group": "admin",
          "size": "4096",
          "name": "web"
        },
        {
          "type": "d",
          "permissions": "755",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "root",
          "group": "root",
          "size": "4096",
          "name": "conf"
        },
        {
          "type": "f",
          "permissions": "644",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "admin",
          "group": "admin",
          "size": "33",
          "name": ".bash_logout"
        },
        {
          "type": "d",
          "permissions": "771",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "admin",
          "group": "admin",
          "size": "4096",
          "name": "tmp"
        }
      ]
    },
    rightList: {
      "listing": [
        {
          "type": "d",
          "permissions": "711",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "admin",
          "group": "admin",
          "size": "4096",
          "name": ""
        },
        {
          "type": "f",
          "permissions": "644",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "admin",
          "group": "admin",
          "size": "124",
          "name": ".bashrc"
        },
        {
          "type": "f",
          "permissions": "644",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "admin",
          "group": "admin",
          "size": "176",
          "name": ".bash_profile"
        },
        {
          "type": "d",
          "permissions": "751",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "admin",
          "group": "admin",
          "size": "4096",
          "name": "web"
        },
        {
          "type": "d",
          "permissions": "755",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "root",
          "group": "root",
          "size": "4096",
          "name": "conf"
        },
        {
          "type": "f",
          "permissions": "644",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "admin",
          "group": "admin",
          "size": "33",
          "name": ".bash_logout"
        },
        {
          "type": "d",
          "permissions": "771",
          "date": "2015-07-04",
          "time": "09:46",
          "owner": "admin",
          "group": "admin",
          "size": "4096",
          "name": "tmp"
        }
      ]
    },
    active: "left"
  }

  // componentDidMount = () => {
  //   axios.get('https://r5.vestacp.com:8083/file_manager/fm_api.php?dir=%2Fhome%2Fadmin%2F&action=cd&_=' + this.state.date)
  //     .then(res => {
  //       let data = res.data.listing.toArray;
  //       this.setState({ data });
  //       console.log(res.data.listing);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // };

  handleActiveList = (list) => {
    this.setState({ active: list });
  }

  handleSwitchList = (e) => {
    switch (e.keyCode) {
      case 39: this.setState({ active: "right" });
        break;
      case 37: this.setState({ active: "left" });
        break;
      default:
        break;
    }
  }

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleSwitchList);
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleSwitchList);
  }

  render() {
    const { leftList, rightList, active } = this.state;
    return (
      <div className="window">
        <LeftDirectoryList
          data={leftList}
          isActive={active === "left"}
          onClick={this.handleActiveList}
          list="left" />
        <RightDirectoryList
          data={rightList}
          isActive={active === "right"}
          onClick={this.handleActiveList}
          list="right" />
      </div>
    );
  }
}

export default FileManager;
