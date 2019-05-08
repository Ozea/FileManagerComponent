import React, { Component } from 'react';
import DirectoryList from '../../components/Lists/DirectoryList/DirectoryList';
import Modal from '../../components/Modal/Modal';
import Menu from '../../components/Menu/Menu';
// import axios from 'axios';
import '../App/App.scss';

class FileManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
            "size": "200000",
            "name": "screenshot.jpg"
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
            "size": "17600000",
            "name": "video.mp4"
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
      permissions: "",
      selection: []
    }
    this.leftDirectoryListElement = React.createRef();
    this.rightDirectoryListElement = React.createRef();
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

  handleSelection = (selection) => {
    this.setState({ selection });
  }

  handleDataOnButton = (cursor) => {
    const { leftList, rightList, active } = this.state;
    if (active === "left") {
      let name = leftList.listing[cursor].name;
      let permissions = leftList.listing[cursor].permissions;
      this.setState({ name, permissions, cursor });
    } else {
      let name = rightList.listing[cursor].name;
      let permissions = rightList.listing[cursor].permissions;
      this.setState({ name, permissions, cursor });
    }
  }

  toggleActiveList = (list) => {
    this.setState({ active: list });
  }

  handleSwitchList = (e) => {
    if (this.state.modalVisible) {
      return;
    }

    if (e.keyCode === 39) {
      this.setState({ active: "right" });
    } else if (e.keyCode === 37) {
      this.setState({ active: "left" });
    }
  }

  onDelete = () => {
    const { leftList, rightList, active, cursor, selection } = this.state;

    if (active === "left") {
      if (selection.length > 0) {
        let listing = [...leftList.listing];
        let newListing = listing.filter((value, index) => !selection.includes(index));
        this.setState({ leftList: { listing: newListing }, selection: [] }, this.leftDirectoryListElement.current.removeSelection());
      } else {
        leftList.listing.splice(cursor, 1);
        this.setState({ leftList });
      }
    } else {
      if (selection.length > 0) {
        let listing = [...rightList.listing];
        let newListing = listing.filter((value, index) => !selection.includes(index));
        this.setState({ rightList: { listing: newListing }, selection: [] }, this.rightDirectoryListElement.current.removeSelection());
      } else {
        rightList.listing.splice(cursor, 1);
        this.setState({ rightList });
      }
    }
  }

  newFile = () => {
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

  newDir = () => {
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

  onRename = () => {
    const { cursor, leftList, rightList, active } = this.state;
    if (active === "left") {
      leftList.listing[cursor].name = this.inputElement.value;
      this.setState({ leftList });
    } else {
      rightList.listing[cursor].name = this.inputElement.value;
      this.setState({ rightList });
    }
  }

  onChangePermissions = () => {
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

  handlePermissions = (permissions) => {
    this.setState({ permissions });
  }

  handleDataOnClick = (name, permissions) => {
    this.setState({ name, permissions });
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
  }

  modal = (type, items) => {
    const { modalVisible, name, permissions } = this.state;
    switch (type) {
      case 'Video': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} onClose={this.closeModal} onClick={this.closeModal} />, modalVisible: true });
      case 'Photo': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} onClose={this.closeModal} onClick={this.closeModal} gallery={items} />, modalVisible: true });
      case 'Add file': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} onClick={this.newFile} onClose={this.closeModal} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Add directory': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} onClick={this.newDir} onClose={this.closeModal} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Delete': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} fName={name} onClick={this.onDelete} onClose={this.closeModal} items={items} />, modalVisible: true });
      case 'Rename': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} fName={name} onChangeValue={this.nameHandler} onClick={this.onRename} onClose={this.closeModal} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Nothing selected': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} onClose={this.closeModal} onClick={this.closeModal} />, modalVisible: true });
      case 'Permissions': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} fName={name} onClick={this.onChangePermissions} onClose={this.closeModal} onChangePermissions={this.handlePermissions} permissions={permissions} />, modalVisible: true });
      default:
        break;
    }
  }

  render() {
    const { leftList, rightList, active, modal, modalVisible, cursor, selection } = this.state;
    return (
      <div className="window">
        <Menu
          modalVisible={modalVisible}
          selection={selection}
          cursor={cursor}
          openModal={this.modal}
          onDelete={this.onDeleteFileHandler} />
        <div className="lists-container">
          <DirectoryList
            modalVisible={modalVisible}
            openModal={this.modal}
            ref={this.leftDirectoryListElement}
            handleDataOnButton={this.handleDataOnButton}
            handleDataOnClick={this.handleDataOnClick}
            handleSelection={this.handleSelection}
            data={leftList}
            isActive={active === "left"}
            onClick={this.toggleActiveList}
            list="left" />
          <DirectoryList
            modalVisible={modalVisible}
            openModal={this.modal}
            ref={this.rightDirectoryListElement}
            handleDataOnButton={this.handleDataOnButton}
            handleDataOnClick={this.handleDataOnClick}
            handleSelection={this.handleSelection}
            data={rightList}
            isActive={active === "right"}
            onClick={this.toggleActiveList}
            list="right" />
        </div>
        {modalVisible && modal}
      </div>
    );
  }
}

export default FileManager;
