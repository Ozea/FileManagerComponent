import React, { Component } from 'react';
import DirectoryList from '../../components/Lists/DirectoryList/DirectoryList';
import Modal from '../../components/Modal/Modal';
import Menu from '../../components/Menu/Menu';
import { withRouter } from 'react-router-dom';
import * as FM from '../../LocalAPI';
// import axios from 'axios';
import '../App/App.scss';

class FileManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftList: {
        path: FM.getDirectoryPath(),
        files: FM.leftList,
      },
      rightList: {
        path: FM.getDirectoryPath(),
        files: FM.rightList,
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
    window.addEventListener("keydown", this.switchActiveList);
    window.addEventListener("keydown", this.goToPrevDir);
    // FM.getDataFromServer('')
    //   .then() // setState({ data })
    //   .catch()
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.switchActiveList);
    window.removeEventListener("keydown", this.goToPrevDir);
  }

  handleSelection = (selection) => {
    this.setState({ selection });
  }

  handleDataOnButton = (cursor, name, permissions) => {
    this.setState({ name, permissions, cursor });
  }

  toggleActiveList = (list) => {
    this.setState({ active: list });
  }

  switchActiveList = (e) => {
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
        let listing = [...leftList.files.listing];
        let newListing = listing.filter((value, index) => !selection.includes(index));
        this.setState({ leftList: { files: { listing: newListing } }, selection: [] });
        this.leftDirectoryListElement.current.removeSelection();
      } else {
        leftList.files.listing.splice(cursor, 1);
        this.setState({ leftList });
        this.leftDirectoryListElement.current.handleCursorAfterDeletion(cursor)
      }
    } else {
      if (selection.length > 0) {
        let listing = [...rightList.files.listing];
        let newListing = listing.filter((value, index) => !selection.includes(index));
        this.setState({ rightList: { files: { listing: newListing } }, selection: [] });
        this.rightDirectoryListElement.current.removeSelection()
      } else {
        rightList.files.listing.splice(cursor, 1);
        this.setState({ rightList });
        this.rightDirectoryListElement.current.handleCursorAfterDeletion(cursor)
      }
    }
  }

  newFile = () => {
    const { active } = this.state;
    let name = this.inputElement.value;
    FM.addFile(name, active);
  }

  newDir = () => {
    const { active } = this.state;
    let name = this.inputElement.value;
    FM.addDirectory(name, active);
  }

  onRename = () => {
    const { cursor, active } = this.state;
    let name = this.inputElement.value;
    FM.rename(cursor, active, name);
  }

  onChangePermissions = () => {
    const { cursor, active } = this.state;
    let permissions = this.state.permissions;
    FM.changePermissions(cursor, active, permissions);
  }

  goToPrevDir = (e) => {
    if (e.keyCode === 8 && !this.state.modalVisible) {
      if (this.state.active === "left") {
        let leftList = { ...this.state.leftList };
        leftList.path = leftList.path.substring(0, leftList.path.lastIndexOf('/'));
        this.setState({ leftList });
        this.props.history.push({ search: `?path=${leftList.path}` });
      } else {
        let rightList = { ...this.state.rightList };
        rightList.path = rightList.path.substring(0, rightList.path.lastIndexOf('/'));
        this.setState({ rightList });
        this.props.history.push({ search: `?path=${rightList.path}` });
      }
    }
  }

  changePath = (name) => {
    const { active } = this.state;
    if (active === "left") {
      let leftList = { ...this.state.leftList };
      let oldPath = leftList.path;
      leftList.path = `${oldPath}/${name}`;
      this.setState({ leftList });
    } else {
      let rightList = { ...this.state.rightList };
      let oldPath = rightList.path;
      rightList.path = `${oldPath}/${name}`;
      this.setState({ rightList });
    }
  }

  nameHandler = (name) => {
    this.setState({ name });
  }

  handlePermissions = (permissions) => {
    this.setState({ permissions });
  }

  handleDataOnClick = (cursor, name, permissions) => {
    this.setState({ cursor, name, permissions });
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
  }

  modal = (type, items) => {
    const { modalVisible, name, permissions } = this.state;
    switch (type) {
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
            data={leftList.files}
            isActive={active === "left"}
            onClick={this.toggleActiveList}
            history={this.props}
            path={leftList.path}
            changePath={this.changePath}
            list="left" />
          <DirectoryList
            modalVisible={modalVisible}
            openModal={this.modal}
            ref={this.rightDirectoryListElement}
            handleDataOnButton={this.handleDataOnButton}
            handleDataOnClick={this.handleDataOnClick}
            handleSelection={this.handleSelection}
            data={rightList.files}
            isActive={active === "right"}
            onClick={this.toggleActiveList}
            history={this.props}
            path={rightList.path}
            changePath={this.changePath}
            list="right" />
        </div>
        {modalVisible && modal}
      </div>
    );
  }
}

export default withRouter(FileManager);
