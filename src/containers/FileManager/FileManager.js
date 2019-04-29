import React, { Component } from 'react';
import DirectoryList from '../../components/Lists/DirectoryList/DirectoryList';
import Modal from '../../components/Modal/Modal';
import Menu from '../../components/Menu/Menu';
// import axios from 'axios';
import '../App/App.scss';

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
    active: "left",
    modal: null,
    modalVisible: false,
    cursor: 0,
    name: "",
    rights: ""
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

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleSwitchList);
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleSwitchList);
  }

  handleNameOnButton = () => {
    const { leftList, rightList, cursor, active } = this.state;
    if (active === "left") {
      let name = leftList.listing[cursor].name;
      let rights = leftList.listing[cursor].permissions;
      this.setState({ name, rights });
    } else {
      let name = rightList.listing[cursor].name;
      let rights = rightList.listing[cursor].permissions;
      this.setState({ name, rights });
    }
  }

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

  onChangeCursor = (cursor) => {
    this.setState({ cursor });
  }

  onDeleteFileHandler = () => {
    const { leftList, rightList, active, cursor } = this.state;

    if (cursor === 0) {
      return;
    }

    if (active === "left") {
      leftList.listing.splice(cursor, 1);
      this.setState({ leftList });
    } else {
      rightList.listing.splice(cursor, 1);
      this.setState({ rightList });
    }
  }

  addNewFileHandler = () => {
    const { leftList, rightList, active } = this.state;
    const newFile = {
      type: "f",
      permissions: "771",
      owner: "admin",
      group: "admin",
      size: "1000",
      name: this.inputElement.value
    };

    if (active === "left") {
      const listing = [...leftList.listing, newFile];
      this.setState({
        leftList: { ...leftList, listing }
      });

    } else {
      const listing = [...rightList.listing, newFile];
      this.setState({
        rightList: { ...rightList, listing }
      });
    }
  }

  addNewDirHandler = () => {
    const { leftList, rightList, active } = this.state;
    const newDir = {
      type: "d",
      permissions: "771",
      owner: "admin",
      group: "admin",
      size: "1000",
      name: this.inputElement.value
    };

    if (active === "left") {
      const listing = [...leftList.listing, newDir];
      this.setState({
        leftList: { ...rightList, listing }
      });
    } else {
      const listing = [...rightList.listing, newDir];
      this.setState({
        rightList: { ...rightList, listing }
      });
    }
  }

  onRenameHandler = () => {
    const { cursor, leftList, rightList, active } = this.state;
    if (active === "left") {
      leftList.listing[cursor].name = this.inputElement.value;
      this.setState({ leftList });
    } else {
      rightList.listing[cursor].name = this.inputElement.value;
      this.setState({ rightList });
    }
  }

  changePermissions = () => {
    const { cursor, leftList, rightList, active } = this.state;
    if (active === "left") {
      leftList.listing[cursor].permissions = this.state.permissions;
      this.setState({ leftList });
    } else {
      rightList.listing[cursor].permissions = this.state.permissions;
      this.setState({ rightList });
    }
  }

  nameHandler = (name) => {
    this.setState({ name });
  }

  fPermissions = (permissions) => {
    this.setState({ permissions });
  }

  handleNameOnClick = (name, rights) => {
    this.setState({ name, rights });
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
  }

  modal = (type) => {
    const { modalVisible, name, rights } = this.state;
    switch (type) {
      case 'Add file': return this.setState({ modal: <Modal modalVisible={modalVisible} name={type} onClick={this.addNewFileHandler} onClose={this.closeModal} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Add directory': return this.setState({ modal: <Modal modalVisible={modalVisible} name={type} onClick={this.addNewDirHandler} onClose={this.closeModal} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Delete': return this.setState({ modal: <Modal modalVisible={modalVisible} name={type} fName={name} onClick={this.onDeleteFileHandler} onClose={this.closeModal} />, modalVisible: true });
      case 'Rename': return this.setState({ modal: <Modal modalVisible={modalVisible} name={type} fName={name} onChangeValue={this.nameHandler} onClick={this.onRenameHandler} onClose={this.closeModal} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Nothing selected': return this.setState({ modal: <Modal modalVisible={modalVisible} name={type} onClick={this.onDeleteFileHandler} onClose={this.closeModal} />, modalVisible: true });
      case 'Permissions': return this.setState({ modal: <Modal modalVisible={modalVisible} name={type} fName={name} onClick={this.changePermissions} onClose={this.closeModal} onChangePermissions={this.fPermissions} rights={rights} />, modalVisible: true });
      default:
        break;
    }
  }

  render() {
    const { leftList, rightList, active, modal, modalVisible, cursor } = this.state;
    return (
      <div className="window">
        <Menu
          cursor={cursor}
          openModal={this.modal}
          onDelete={this.onDeleteFileHandler} />
        <div className="lists-container">
          <DirectoryList
            handleNameOnButton={this.handleNameOnButton}
            handleNameOnClick={this.handleNameOnClick}
            cursorChangeHandler={this.onChangeCursor}
            data={leftList}
            isActive={active === "left"}
            onClick={this.handleActiveList}
            list="left" />
          <DirectoryList
            handleNameOnButton={this.handleNameOnButton}
            handleNameOnClick={this.handleNameOnClick}
            cursorChangeHandler={this.onChangeCursor}
            data={rightList}
            isActive={active === "right"}
            onClick={this.handleActiveList}
            list="right" />
        </div>
        {modalVisible && modal}
      </div>
    );
  }
}

export default FileManager;
