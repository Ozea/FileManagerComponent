import React, { Component } from 'react';
import DirectoryList from '../../components/Lists/DirectoryList/DirectoryList';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';
import { withRouter } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { toast, ToastContainer } from 'react-toastify';
import Hotkeys from '../../components/Hotkeys/Hotkeys';
import HotkeysButton from '../../components/Hotkeys/HotkeysButton';
import * as FM from '../../LocalAPI';
import '../App/App.scss';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const url = "https://r5.vestacp.com:8083/file_manager/fm_api.php?";

class FileManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftList: {
        path: '/home/admin',
        files: { listing: [] },
      },
      rightList: {
        path: '/home/admin',
        files: { listing: [] },
      },
      path: '/home/admin',
      active: "left",
      modal: null,
      modalVisible: false,
      cursor: 0,
      name: "",
      permissions: "",
      selection: [],
      inputValue: "",
      uploadPercent: "0",
      hotkeysPanel: "inactive",
      loading: false
    }
    this.leftDirectoryListElement = React.createRef();
    this.rightDirectoryListElement = React.createRef();
  }

  componentDidMount = () => {
    window.addEventListener("keydown", this.switchActiveList);
    window.addEventListener("keydown", this.toggleActiveListOnTab);
    document.addEventListener("keydown", this.hotkeysListener);
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.switchActiveList);
    window.removeEventListener("keydown", this.toggleActiveListOnTab);
    document.addEventListener("keydown", this.hotkeysListener);
  }

  componentWillMount = () => {
    this.changeDirectoryOnLoading();
  }

  changeDirectoryOnLoading = () => {
    const { location } = this.props.history;
    let path = location.search.substring(6);

    this.setState({ path, loading: true }, () => {
      FM.getDataFromServer(`${url}dir=${this.encodePath(this.state.path)}&action=cd`)
        .then(result => {
          let listing = result.data.listing;
          this.setState({ leftList: { files: { listing }, path } });
        })
        .then(FM.getDataFromServer(`${url}dir=${this.encodePath(this.state.rightList.path)}&action=cd`)
          .then(result => {
            let listing = result.data.listing;
            this.setState({ rightList: { files: { listing }, path: '/home/admin' }, loading: false });
          })
        )
    });
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

  changeDirectory = (url) => {
    const { active, path } = this.state;
    if (this.state.leftList.path === this.state.rightList.path) {
      FM.getDataFromServer(url)
        .then(result => {
          let listing = result.data.listing;
          this.setState({ leftList: { files: { listing }, path }, rightList: { files: { listing }, path }, loading: false });
        })
    } else if (active === "left") {
      FM.getDataFromServer(url)
        .then(result => {
          let listing = result.data.listing;
          this.setState({ leftList: { files: { listing }, path }, loading: false });
        })
        .catch(e => console.log(e))
    } else {
      FM.getDataFromServer(url)
        .then(result => {
          let listing = result.data.listing;
          this.setState({ rightList: { files: { listing }, path }, loading: false });
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
      if (this.state.active === "left") {
        this.setState({ active: "right", path: this.state.rightList.path });
        this.changeQuery(this.state.path);
      } else {
        this.setState({ active: "left", path: this.state.leftList.path });
        this.changeQuery(this.state.path);
      }
    }
  }

  passSelection = (selection) => {
    this.setState({ selection });
  }

  toggleActiveList = (list) => {
    this.setState({ active: list });
  }

  switchActiveList = (e) => {
    if (this.state.modalVisible) {
      return;
    }

    if (e.keyCode === 39) {
      this.setState({ active: "right", path: this.state.rightList.path });
      this.changeQuery(this.state.path);
    } else if (e.keyCode === 37) {
      this.setState({ active: "left", path: this.state.leftList.path });
      this.changeQuery(this.state.path);
    }
  }

  validateAction = (url) => {
    this.setState({ loading: true }, () => {
      FM.validateAction(url)
        .then(response => {
          if (response.data.result) {
            this.changeDirectory(`${url}dir=${this.encodePath(this.state.path)}&action=cd`);
          } else {
            this.showError(response.data.message);
          }
        })
    });
  }

  download = () => {
    const { cursor, path, name } = this.state;

    if (cursor === 0) {
      return;
    }

    window.open('/download/file/?path=' + path + '/' + name);
  }

  upload = (selectedFiles) => {
    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files[]', selectedFiles[i], selectedFiles[i].name);
    }
    this.setState({ loading: true }, () => {
      axios.post(`https://r5.vestacp.com:8083/upload/?dir=${this.state.path}`, formData, {
        onUploadProgress: progressEvent => {
          let uploadPercent = Math.round(progressEvent.loaded / progressEvent.total * 100);
          this.setState({ uploadPercent });
        }
      }).then((result) => {
        this.setState({ uploadPercent: "0" });
        this.changeDirectory(`${url}dir=${this.encodePath(this.state.path)}&action=cd`);
      })
    });
  }

  onDelete = () => {
    const { selection, name, path } = this.state;
    if (selection.length > 0) {
      this.setState({ loading: true }, () => {
        FM.deleteItems(url, this.encodePath(path), selection)
          .then(() => {
            this.setState({ selection: [] }, () => {
              this.changeDirectory(`${url}dir=${this.encodePath(path)}&action=cd`);
            })
          })
      });
    } else {
      this.validateAction(`${url}item=${this.encodePath(path)}%2F${name}&dir=${this.encodePath(path)}&action=delete_files`);
    }
  }

  newFile = () => {
    let name = this.inputElement.value;
    this.validateAction(`${url}filename=${name}&dir=${this.encodePath(this.state.path)}&action=create_file`);
  }

  newDir = () => {
    let name = this.inputElement.value;
    this.validateAction(`${url}dirname=${name}&dir=${this.encodePath(this.state.path)}&action=create_dir`);
  }

  onRename = () => {
    let name = this.state.inputValue;
    this.validateAction(`${url}item=${this.state.name}&target_name=${name}&dir=${this.encodePath(this.state.path)}&action=rename_file`);
  }

  onChangePermissions = () => {
    let permissions = this.state.inputValue;
    this.validateAction(`${url}dir=${this.encodePath(this.state.path)}%2F&item=${this.state.name}&permissions=${permissions}&action=chmod_item`);
  }

  archiveItem = () => {
    let name = this.inputElement.value;
    this.validateAction(`${url}items=${this.encodePath(this.state.path)}%2F${this.state.name}&dst_item=${this.encodePath(name)}&action=pack_item`);
  }

  extractItem = () => {
    let name = this.inputElement.value;
    this.validateAction(`${url}item=${this.encodePath(this.state.path)}%2F${this.state.name}&filename=${this.state.name}&dir=${this.encodePath(this.state.path)}&dir_target=${name}&action=unpack_item`);
  }

  moveItem = () => {
    const { path, selection, name } = this.state;
    let targetDir = this.inputElement.value;

    if (selection.length > 0) {
      this.setState({ loading: true }, () => {
        FM.moveItems(url, this.encodePath(path), targetDir, selection)
          .then(() => {
            this.setState({ selection: [] }, () => {
              this.changeDirectory(`${url}dir=${this.encodePath(path)}&action=cd`);
            })
          })
      });
    } else {
      this.validateAction(`${url}item=${path}%2F${name}&target_name=${targetDir}&action=move_file`);
    }
  }

  copyItem = () => {
    const { path, selection, name } = this.state;
    let targetDir = this.inputElement.value;

    if (selection.length > 0) {
      this.setState({ loading: true }, () => {
        FM.copyItems(url, this.encodePath(path), targetDir, selection)
          .then(() => {
            this.setState({ selection: [] }, () => {
              this.changeDirectory(`${url}dir=${this.encodePath(path)}&action=cd`);
            })
          })
      });
    } else {
      this.validateAction(`${url}item=${path}%2F${name}&filename=${name}&dir=${path}&dir_target=${targetDir}&action=copy_file`);
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
      this.changeDirectory(`${url}dir=${this.encodePath(this.state.path)}&action=cd`);
    })
  }

  openCertainDirectory = (path) => {
    this.setState({ loading: true }, () => {
      this.changeDirectory(`${url}dir=${this.encodePath(path)}&action=cd`);
    })
  }

  moveBack = () => {
    if (this.state.active === "left") {
      let leftList = { ...this.state.leftList };
      leftList.path = leftList.path.substring(0, leftList.path.lastIndexOf('/'));
      this.setState({ leftList, path: leftList.path });
      this.props.history.push({ search: `?path=${leftList.path}` });
      this.openDirectory();
    } else {
      let rightList = { ...this.state.rightList };
      rightList.path = rightList.path.substring(0, rightList.path.lastIndexOf('/'));
      this.setState({ rightList, path: rightList.path });
      this.props.history.push({ search: `?path=${rightList.path}` });
      this.openDirectory();
    }
  }

  addToPath = (name) => {
    const { active } = this.state;
    if (active === "left") {
      let leftList = { ...this.state.leftList };
      let oldPath = leftList.path;
      leftList.path = `${oldPath}/${name}`;
      this.setState({ leftList, path: leftList.path });
    } else {
      let rightList = { ...this.state.rightList };
      let oldPath = rightList.path;
      rightList.path = `${oldPath}/${name}`;
      this.setState({ rightList, path: rightList.path });
    }
  }

  changeInputValue = (inputValue) => {
    this.setState({ inputValue });
  }

  changePath = (path) => {
    this.setState({ path });
  }

  passData = (cursor, name, permissions) => {
    this.setState({ cursor, name, permissions });
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

  modal = (type, items) => {
    const { modalVisible, name, permissions, path } = this.state;
    switch (type) {
      case 'Copy': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} fName={name} path={path} onClick={this.copyItem} items={items} onClose={this.closeModal} onChangeValue={this.changeInputValue} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Move': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} fName={name} path={path} onClick={this.moveItem} items={items} onClose={this.closeModal} onChangeValue={this.changeInputValue} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Extract': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} fName={name} onClick={this.extractItem} onClose={this.closeModal} onChangeValue={this.changeInputValue} path={path} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Archive': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} fName={name} onClick={this.archiveItem} onClose={this.closeModal} onChangeValue={this.changeInputValue} path={path} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Permissions': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} fName={name} onClick={this.onChangePermissions} onClose={this.closeModal} onChangePermissions={this.changeInputValue} permissions={permissions} />, modalVisible: true });
      case 'Rename': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} fName={name} onChangeValue={this.changeInputValue} onClick={this.onRename} onClose={this.closeModal} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Add directory': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} onClick={this.newDir} onClose={this.closeModal} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Add file': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} onClick={this.newFile} onClose={this.closeModal} reference={(inp) => this.inputElement = inp} />, modalVisible: true });
      case 'Delete': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} fName={name} onClick={this.onDelete} onClose={this.closeModal} items={items} />, modalVisible: true });
      case 'Nothing selected': return this.setState({ modal: <Modal modalVisible={modalVisible} type={type} onClose={this.closeModal} onClick={this.closeModal} />, modalVisible: true });
      default:
        break;
    }
  }

  render() {
    const { leftList, rightList, active, modal, modalVisible, cursor, selection, name, loading, uploadPercent, hotkeysPanel } = this.state;
    return (
      <div className="window">
        {uploadPercent !== "0" ? <ProgressBar progress={uploadPercent} /> : null}
        <ToastContainer />
        <Menu
          onDelete={this.onDeleteFileHandler}
          modalVisible={modalVisible}
          download={this.download}
          openModal={this.modal}
          selection={selection}
          upload={this.upload}
          cursor={cursor}
          name={name} />
        {loading ? <Spinner /> :
          <div className="lists-container">
            <DirectoryList
              openCertainDirectory={this.openCertainDirectory}
              ref={this.leftDirectoryListElement}
              openDirectory={this.openDirectory}
              passSelection={this.passSelection}
              data={this.state.leftList.files}
              onClick={this.toggleActiveList}
              isActive={active === "left"}
              changePath={this.changePath}
              modalVisible={modalVisible}
              addToPath={this.addToPath}
              passData={this.passData}
              download={this.download}
              moveBack={this.moveBack}
              openModal={this.modal}
              path={leftList.path}
              history={this.props}
              list="left" />
            <DirectoryList
              openCertainDirectory={this.openCertainDirectory}
              ref={this.rightDirectoryListElement}
              openDirectory={this.openDirectory}
              passSelection={this.passSelection}
              data={this.state.rightList.files}
              onClick={this.toggleActiveList}
              isActive={active === "right"}
              changePath={this.changePath}
              modalVisible={modalVisible}
              addToPath={this.addToPath}
              passData={this.passData}
              download={this.download}
              moveBack={this.moveBack}
              openModal={this.modal}
              path={rightList.path}
              history={this.props}
              list="right" />
            <Hotkeys style={hotkeysPanel} close={this.hotkeys} />
            <HotkeysButton open={this.hotkeys} />
          </div>
        }
        {modalVisible && modal}
      </div>
    );
  }
}

export default withRouter(FileManager);
