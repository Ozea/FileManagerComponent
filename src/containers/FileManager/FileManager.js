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
      path: FM.getDirectoryPath(),
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
    window.addEventListener("keydown", this.toggleActiveListOnTab);
    // FM.getDataFromServer('')
    //   .then() // setState({ data })
    //   .catch()
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.switchActiveList);
    window.removeEventListener("keydown", this.goToPrevDir);
    window.removeEventListener("keydown", this.toggleActiveListOnTab);
  }

  toggleActiveListOnTab = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      if (this.state.active === "left") {
        this.setState({ active: "right" });
      } else {
        this.setState({ active: "left" });
      }
    }
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

  archiveItem = () => {
    const { cursor, active } = this.state;
    let name = this.inputElement.value;
    FM.archiveItem(cursor, name, active);
  }

  extractItem = () => {
    const { cursor, active } = this.state;
    let name = this.inputElement.value;
    FM.extractItem(cursor, name, active);
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

  moveBack = () => {
    if (this.state.active === "left") {
      let leftList = { ...this.state.leftList };
      leftList.path = leftList.path.substring(0, leftList.path.lastIndexOf('/'));
      this.setState({ leftList });
      this.props.history.push({ search: `?path=${leftList.path}` });
      FM.openDefaultList(this.state.active);
    } else {
      let rightList = { ...this.state.rightList };
      rightList.path = rightList.path.substring(0, rightList.path.lastIndexOf('/'));
      this.setState({ rightList });
      this.props.history.push({ search: `?path=${rightList.path}` });
      FM.openDefaultList(this.state.active);
    }
  }

  addToPath = (name) => {
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

  moveInto = (path) => {
    this.setState({ path });
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
    const { modalVisible, name, permissions, path } = this.state;
    switch (type) {
      case 'Extract': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} fName={name} onClick={this.extractItem} onClose={this.closeModal} onChangeValue={this.nameHandler} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Archive': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} fName={name} onClick={this.archiveItem} onClose={this.closeModal} onChangeValue={this.nameHandler} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Move': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} fName={name} path={path} onClick={this.moveItem} onClose={this.closeModal} onChangeValue={this.moveInto} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
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

  moveItem = () => {
    const { leftList, rightList, name } = this.state;
    leftList.files.listing.forEach((item, index) => {
      if (item.name === name) {
        rightList.files.listing.push(leftList.files.listing[index]);
        leftList.files.listing.splice(index, 1);
      }
    })
  }

  render() {
    const { leftList, rightList, active, modal, modalVisible, cursor, selection, name } = this.state;
    return (
      <div className="window">
        <Menu
          modalVisible={modalVisible}
          name={name}
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
            addToPath={this.addToPath}
            moveBack={this.moveBack}
            goToPrevDir={this.goToPrevDir}
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
            addToPath={this.addToPath}
            moveBack={this.moveBack}
            goToPrevDir={this.goToPrevDir}
            list="right" />
        </div>
        {modalVisible && modal}
      </div>
    );
  }
}

export default withRouter(FileManager);
