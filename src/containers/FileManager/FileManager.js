import React, { Component } from 'react';
import DirectoryList from '../../components/Lists/DirectoryList/DirectoryList';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import HotkeysButton from '../../components/Hotkeys/HotkeysButton';
import { toast, ToastContainer } from 'react-toastify';
import Hotkeys from '../../components/Hotkeys/Hotkeys';
import Modal from '../../components/Modal/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import * as FM from '../../LocalAPI';
import '../App/App.scss';
import axios from 'axios';

const server = "https://r5.vestacp.com:8083/file_manager/fm_api.php?";

class FileManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftList: {
        path: window.GLOBAL.ROOT_DIR,
        files: { listing: [] },
      },
      rightList: {
        path: window.GLOBAL.ROOT_DIR,
        files: { listing: [] },
      },
      currentPath: window.GLOBAL.ROOT_DIR,
      currentUser: window.GLOBAL.ROOT_DIR,
      activeWindow: "left",
      modalWindow: null,
      modalVisible: false,
      cursor: 0,
      itemName: "",
      itemPermissions: "",
      itemType: "",
      itemsSelected: [],
      modalInputValue: "",
      uploadPercent: "0",
      hotkeysPanel: "inactive",
      loading: false
    }

    this.leftList = React.createRef();
    this.rightList = React.createRef();
  }

  componentDidMount = () => {
    window.addEventListener("keydown", this.switchActiveList);
    window.addEventListener("keydown", this.toggleActiveListOnTab);
    document.addEventListener("keydown", this.hotkeysListener);
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.switchActiveList);
    window.removeEventListener("keydown", this.toggleActiveListOnTab);
    document.removeEventListener("keydown", this.hotkeysListener);
  }

  cachePaths = () => {
    localStorage.setItem('activeWindow', this.state.activeWindow);
    localStorage.setItem('leftListPath', this.state.leftList.path);
    localStorage.setItem('rightListPath', this.state.rightList.path);
  }

  componentWillMount = () => {
    if (localStorage.getItem("lastUser") === null || this.state.currentUser !== localStorage.getItem("lastUser")) {
      localStorage.setItem("lastUser", this.state.currentUser);
      localStorage.setItem("activeWindow", "left");
      localStorage.setItem("leftListPath", window.GLOBAL.ROOT_DIR);
      localStorage.setItem("rightListPath", window.GLOBAL.ROOT_DIR);
    }

    if (localStorage.getItem("activeWindow") === null || localStorage.getItem("leftListPath") === null || localStorage.getItem("rightListPath") === null) {
      let path = this.props.history.location.search.substring(6).split('/');
      localStorage.setItem("activeWindow", "left");
      localStorage.setItem("leftListPath", path);
      localStorage.setItem("rightListPath", window.GLOBAL.ROOT_DIR);
    }

    if (localStorage.getItem("activeWindow") === "left") {
      let currentPath = localStorage.getItem("leftListPath");
      this.setState({ currentPath });
    } else if (localStorage.getItem("activeWindow") === "right") {
      let currentPath = localStorage.getItem("rightListPath");
      this.setState({ currentPath });
    }

    this.changeDirectoryOnLoading();
  }

  changeDirectoryOnLoading = () => {
    this.setState({ activeWindow: localStorage.getItem('activeWindow'), loading: true }, () => {
      FM.getDataFromServer(`${server}dir=${this.encodePath(localStorage.getItem('leftListPath'))}&action=cd`)
        .then(result => {
          let path = localStorage.getItem('leftListPath');
          let listing = result.data.listing;
          this.setState({ leftList: { files: { listing }, path } });
        })
        .then(FM.getDataFromServer(`${server}dir=${this.encodePath(localStorage.getItem('rightListPath'))}&action=cd`)
          .then(result => {
            let path = localStorage.getItem('rightListPath');
            let listing = result.data.listing;
            this.setState({ rightList: { files: { listing }, path }, loading: false });
          })
        )
    })
  }

  encodePath = (path) => {
    let splitPath = path.split('/');
    let encodedPath = splitPath.join('%2F');
    return encodedPath;
  }

  showError = (error) => {
    toast.error(error, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
    this.setState({ loading: false });
  }

  changeDirectory = () => {
    const { activeWindow, currentPath } = this.state;
    if (this.state.leftList.path === this.state.rightList.path) {
      FM.getDataFromServer(`${server}dir=${this.encodePath(this.state.currentPath)}&action=cd`)
        .then(result => {
          let listing = result.data.listing;
          this.setState({ leftList: { files: { listing }, path: currentPath }, rightList: { files: { listing }, path: currentPath }, loading: false });
          this.rightList.current.resetData();
          this.leftList.current.resetData();
        })
    } else if (activeWindow === "left") {
      FM.getDataFromServer(`${server}dir=${this.encodePath(this.state.currentPath)}&action=cd`)
        .then(result => {
          let listing = result.data.listing;
          this.setState({ leftList: { files: { listing }, path: currentPath }, loading: false });
          this.leftList.current.resetData();
        })
        .catch(e => console.log(e))
    } else {
      FM.getDataFromServer(`${server}dir=${this.encodePath(this.state.currentPath)}&action=cd`)
        .then(result => {
          let listing = result.data.listing;
          this.setState({ rightList: { files: { listing }, path: currentPath }, loading: false });
          this.rightList.current.resetData();
        })
        .catch(e => console.log(e))
    }
  }

  toggleActiveListOnTab = (e) => {
    if (this.state.modalVisible) {
      return;
    }

    if (e.keyCode === 9) {
      e.preventDefault();
      if (this.state.activeWindow === "left") {
        this.setState({ activeWindow: "right", currentPath: this.state.rightList.path });
        this.changeQuery(this.state.currentPath);
        this.rightList.current.passData();
        this.cachePaths();
      } else {
        this.setState({ activeWindow: "left", currentPath: this.state.leftList.path });
        this.changeQuery(this.state.currentPath);
        this.leftList.current.passData();
        this.cachePaths();
      }
    }
  }

  passSelection = (itemsSelected) => {
    this.setState({ itemsSelected });
  }

  toggleActiveList = (list) => {
    this.setState({ activeWindow: list });
  }

  switchActiveList = (e) => {
    if (this.state.modalVisible) {
      return;
    }

    if (e.keyCode === 39) {
      this.setState({ activeWindow: "right", currentPath: this.state.rightList.path });
      this.changeQuery(this.state.currentPath);
      this.rightDirectoryListElement.current.passData();
      this.cachePaths();
    } else if (e.keyCode === 37) {
      this.setState({ activeWindow: "left", currentPath: this.state.leftList.path });
      this.changeQuery(this.state.currentPath);
      this.leftDirectoryListElement.current.passData();
      this.cachePaths();
    }
  }

  validateAction = (url) => {
    this.setState({ loading: true }, () => {
      FM.validateAction(url)
        .then(response => {
          if (response.data.result) {
            this.changeDirectory();
          } else {
            console.log(response.data.message);
            this.showError(response.data.message);
          }
        })
    });
  }

  download = () => {
    const { cursor, currentPath, itemName } = this.state;

    if (cursor === 0) {
      return;
    }

    window.open('/download/file/?path=' + currentPath + '/' + itemName);
  }

  checkExistingFileName = (selectedFiles) => {
    let selectedFileNames = [];
    let existingFileNames = [];
    let newFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      selectedFileNames.push(selectedFiles[i]);
    }

    if (this.state.activeWindow === "left") {
      for (let i = 0; i < selectedFileNames.length; i++) {
        if (this.state.leftList.files.listing.map((i) => { return i.name }).includes(selectedFileNames[i].name)) {
          existingFileNames.push(selectedFileNames[i]);
        } else {
          newFiles.push(selectedFileNames[i]);
        }
      }
    } else {
      for (let i = 0; i < selectedFileNames.length; i++) {
        if (this.state.rightList.files.listing.map((i) => { return i.name }).includes(selectedFileNames[i].name)) {
          existingFileNames.push(selectedFileNames[i]);
        } else {
          newFiles.push(selectedFileNames[i]);
        }
      }
    }

    if (existingFileNames.length !== 0) {
      this.modal("Replace", existingFileNames);
      this.upload(newFiles);
    } else {
      this.upload(selectedFiles);
    }
  }

  replaceFiles = (selectedFiles) => {
    for (let i = 0; i < selectedFiles.length; i++) {
      this.validateAction(`${server}item=${this.encodePath(this.state.currentPath)}%2F${selectedFiles[i].name}&dir=${this.encodePath(this.state.currentPath)}&action=delete_files`);
    }

    this.upload(selectedFiles);
  }

  upload = (selectedFiles) => {
    const formData = new FormData();

    if (selectedFiles.length === 0) {
      return;
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files[]', selectedFiles[i], selectedFiles[i].name);
    }
    this.setState({ loading: true }, () => {
      axios.post(`https://r5.vestacp.com:8083/upload/?dir=${this.state.currentPath}`, formData, {
        onUploadProgress: progressEvent => {
          let uploadPercent = Math.round(progressEvent.loaded / progressEvent.total * 100);
          this.setState({ uploadPercent });
        }
      }).then((result) => {
        this.setState({ uploadPercent: "0" });
        this.changeDirectory();
      })
    });
  }

  onDelete = () => {
    const { itemsSelected, itemName, currentPath } = this.state;
    if (itemsSelected.length > 0) {
      this.setState({ loading: true }, () => {
        FM.deleteItems(server, this.encodePath(currentPath), itemsSelected)
          .then(() => {
            this.setState({ itemsSelected: [] }, () => {
              this.changeDirectory();
            })
          })
      });
    } else {
      this.validateAction(`${server}item=${this.encodePath(currentPath)}%2F${itemName}&dir=${this.encodePath(currentPath)}&action=delete_files`);
    }
  }

  newFile = () => {
    let name = this.inputElement.value;
    this.validateAction(`${server}filename=${name}&dir=${this.encodePath(this.state.currentPath)}&action=create_file`);
  }

  newDir = () => {
    let name = this.inputElement.value;
    this.validateAction(`${server}dirname=${name}&dir=${this.encodePath(this.state.currentPath)}&action=create_dir`);
  }

  onRename = () => {
    let name = this.state.inputValue;
    this.validateAction(`${server}item=${this.state.itemName}&target_name=${name}&dir=${this.encodePath(this.state.currentPath)}&action=rename_file`);
  }

  onChangePermissions = () => {
    let permissions = this.state.inputValue;
    this.validateAction(`${server}dir=${this.encodePath(this.state.currentPath)}%2F&item=${this.state.itemName}&permissions=${permissions}&action=chmod_item`);
  }

  archiveItem = () => {
    let name = this.inputElement.value;

    if (this.state.itemsSelected.length > 0) {
      this.setState({ loading: true }, () => {
        let items = [];
        for (let i = 0; i < this.state.itemsSelected.length; i++) {
          let path = `${this.state.currentPath}/`;
          items.push(path += this.state.itemsSelected[i]);
        }
        this.validateAction(`${server}items=${items}&dst_item=${this.encodePath(name)}&action=pack_item`);
        this.setState({ itemsSelected: [] });
      })
    } else {
      this.validateAction(`${server}items=${this.encodePath(this.state.currentPath)}%2F${this.state.itemName}&dst_item=${this.encodePath(name)}&action=pack_item`);
    }
  }

  extractItem = () => {
    let name = this.inputElement.value;
    this.validateAction(`${server}item=${this.encodePath(this.state.currentPath)}%2F${this.state.itemName}&filename=${this.state.itemName}&dir=${this.encodePath(this.state.currentPath)}&dir_target=${name}&action=unpack_item`);
  }

  moveItem = () => {
    const { currentPath, itemsSelected, itemName } = this.state;
    let targetDir = this.inputElement.value;

    if (itemsSelected.length > 0) {
      this.setState({ loading: true }, () => {
        FM.moveItems(server, this.encodePath(currentPath), targetDir, itemsSelected)
          .then(() => {
            this.setState({ itemsSelected: [] }, () => {
              this.changeDirectory();
            })
          })
      });
    } else {
      this.validateAction(`${server}item=${currentPath}%2F${itemName}&target_name=${targetDir}&action=move_file`);
    }
  }

  copyItem = () => {
    const { currentPath, itemsSelected, itemName } = this.state;
    let targetDir = this.inputElement.value;

    if (itemsSelected.length > 0) {
      this.setState({ loading: true }, () => {
        FM.copyItems(server, this.encodePath(currentPath), targetDir, itemsSelected)
          .then(() => {
            this.setState({ itemsSelected: [] }, () => {
              this.changeDirectory();
            })
          })
      });
    } else {
      this.validateAction(`${server}item=${currentPath}%2F${itemName}&filename=${itemName}&dir=${currentPath}&dir_target=${targetDir}&action=copy_file`);
    }
  }

  changeQuery = (path) => {
    this.props.history.push({
      pathname: '/list/directory/',
      search: `?path=${path}`
    });
  }

  openDirectory = () => {
    this.setState({ loading: true }, () => {
      this.changeDirectory();
      this.cachePaths();
    });
  }

  openCertainDirectory = () => {
    this.setState({ loading: true }, () => {
      this.changeDirectory();
      this.cachePaths();
    });
  }

  moveBack = () => {
    if (this.state.activeWindow === "left") {
      let leftList = { ...this.state.leftList };
      leftList.path = leftList.path.substring(0, leftList.path.lastIndexOf('/'));
      this.setState({ leftList, currentPath: leftList.path });
      this.props.history.push({ search: `?path=${leftList.path}` });
      this.openDirectory();
    } else {
      let rightList = { ...this.state.rightList };
      rightList.path = rightList.path.substring(0, rightList.path.lastIndexOf('/'));
      this.setState({ rightList, currentPath: rightList.path });
      this.props.history.push({ search: `?path=${rightList.path}` });
      this.openDirectory();
    }
  }

  addToPath = (name) => {
    const { activeWindow } = this.state;
    if (activeWindow === "left") {
      let leftList = { ...this.state.leftList };
      let oldPath = leftList.path;
      leftList.path = `${oldPath}/${name}`;
      this.setState({ leftList, currentPath: leftList.path });
    } else {
      let rightList = { ...this.state.rightList };
      let oldPath = rightList.path;
      rightList.path = `${oldPath}/${name}`;
      this.setState({ rightList, currentPath: rightList.path });
    }
  }

  changeInputValue = (modalInputValue) => {
    this.setState({ modalInputValue });
  }

  changePathAfterToggle = (currentPath) => {
    this.setState({ currentPath });
  }

  changePath = (currentPath) => {
    if (this.state.activeWindow === "left") {
      this.setState({ leftList: { files: { ...this.state.leftList.files }, path: currentPath }, currentPath });
    } else {
      this.setState({ rightList: { files: { ...this.state.rightList.files }, path: currentPath }, currentPath });
    }
  }

  passData = (cursor, itemName, itemPermissions, itemType) => {
    this.setState({ cursor, itemName, itemPermissions, itemType });
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
  }

  hotkeysListener = (e) => {
    if (this.state.modalVisible) {
      return;
    }

    if (e.keyCode === 72) {
      this.hotkeys();
    }
  }

  hotkeys = () => {
    if (this.state.hotkeysPanel === "inactive") {
      this.setState({ hotkeysPanel: "active" });
    } else {
      this.setState({ hotkeysPanel: "inactive" });
    }
  }

  modal = (type, items, available) => {
    const { modalVisible, itemName, itemPermissions, currentPath } = this.state;
    switch (type) {
      case 'Copy': return this.setState({ modalWindow: <Modal modalVisible={modalVisible} type={type} fName={itemName} path={currentPath} onClick={this.copyItem} items={items} onClose={this.closeModal} onChangeValue={this.changeInputValue} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Move': return this.setState({ modalWindow: <Modal modalVisible={modalVisible} type={type} fName={itemName} path={currentPath} onClick={this.moveItem} items={items} onClose={this.closeModal} onChangeValue={this.changeInputValue} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Extract': return this.setState({ modalWindow: <Modal modalVisible={modalVisible} type={type} fName={itemName} onClick={this.extractItem} onClose={this.closeModal} onChangeValue={this.changeInputValue} path={currentPath} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Archive': return this.setState({ modalWindow: <Modal modalVisible={modalVisible} type={type} fName={itemName} onClick={this.archiveItem} items={items} onClose={this.closeModal} onChangeValue={this.changeInputValue} path={currentPath} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Permissions': return this.setState({ modalWindow: <Modal modalVisible={modalVisible} type={type} fName={itemName} onClick={this.onChangePermissions} onClose={this.closeModal} onChangePermissions={this.changeInputValue} permissions={itemPermissions} />, modalVisible: true });
      case 'Rename': return this.setState({ modalWindow: <Modal modalVisible={modalVisible} type={type} fName={itemName} onChangeValue={this.changeInputValue} onClick={this.onRename} onClose={this.closeModal} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Add directory': return this.setState({ modalWindow: <Modal modalVisible={modalVisible} type={type} onClick={this.newDir} onClose={this.closeModal} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Add file': return this.setState({ modalWindow: <Modal modalVisible={modalVisible} type={type} onClick={this.newFile} onClose={this.closeModal} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Delete': return this.setState({ modalWindow: <Modal modalVisible={modalVisible} type={type} fName={itemName} onClick={this.onDelete} onClose={this.closeModal} items={items} />, modalVisible: true });
      case 'Nothing selected': return this.setState({ modal: <Modal modalVisible={modalVisible} notAvailable={available} type={type} onClose={this.closeModal} onClick={this.closeModal} />, modalVisible: true });
      case "Replace": return this.setState({ modalWindow: <Modal modalVisible={modalVisible} type={type} files={items} onClick={(files) => this.replaceFiles(files)} onClose={this.closeModal} />, modalVisible: true });
      default:
        break;
    }
  }

  render() {
    const { leftList, rightList, activeWindow, modalWindow, modalVisible, cursor, itemsSelected, itemName, loading, uploadPercent, hotkeysPanel, itemType } = this.state;
    return (
      <div className="window">
        {uploadPercent !== "0" ? <ProgressBar progress={uploadPercent} /> : null}
        <ToastContainer />
        <Menu
          onDelete={this.onDeleteFileHandler}
          modalVisible={modalVisible}
          download={this.download}
          openModal={this.modal}
          selection={itemsSelected}
          itemType={itemType}
          upload={this.checkExistingFileName}
          cursor={cursor}
          name={itemName} />
        <div className="lists-container">
          <DirectoryList
            changePathAfterToggle={this.changePathAfterToggle}
            openCertainDirectory={this.openCertainDirectory}
            ref={this.leftList}
            openDirectory={this.openDirectory}
            passSelection={this.passSelection}
            data={this.state.leftList.files}
            onClick={this.toggleActiveList}
            isActive={activeWindow === "left"}
            changePath={this.changePath}
            modalVisible={modalVisible}
            addToPath={this.addToPath}
            passData={this.passData}
            download={this.download}
            moveBack={this.moveBack}
            openModal={this.modal}
            path={leftList.path}
            history={this.props}
            loading={loading}
            list="left" />
          <DirectoryList
            changePathAfterToggle={this.changePathAfterToggle}
            openCertainDirectory={this.openCertainDirectory}
            ref={this.rightList}
            openDirectory={this.openDirectory}
            passSelection={this.passSelection}
            data={this.state.rightList.files}
            onClick={this.toggleActiveList}
            isActive={activeWindow === "right"}
            changePath={this.changePath}
            modalVisible={modalVisible}
            addToPath={this.addToPath}
            passData={this.passData}
            download={this.download}
            moveBack={this.moveBack}
            openModal={this.modal}
            path={rightList.path}
            history={this.props}
            loading={loading}
            list="right" />
          <Hotkeys style={hotkeysPanel} close={this.hotkeys} />
          <HotkeysButton open={this.hotkeys} />
        </div>
        {modalVisible && modalWindow}
      </div>
    );
  }
}

export default withRouter(FileManager);
