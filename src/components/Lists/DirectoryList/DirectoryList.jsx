import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import Path from '../../Path/Path';
import Row from '../Row/Row';
import '../List.scss';

class DirectoryList extends Component {
  state = {
    itemsSelected: [],
    cursor: 0,
    sortingType: "Type",
    orderType: "descending",
    data: [],
    itemName: "",
    itemPermissions: "",
    itemType: ""
  }

  componentWillMount = () => {
    if (localStorage.getItem(`${this.props.list}Sorting`) && localStorage.getItem(`${this.props.list}Order`)) {
      this.setState({ sortingType: localStorage.getItem(`${this.props.list}Sorting`), orderType: localStorage.getItem(`${this.props.list}Order`) });
    }
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleLiSelection);
    document.addEventListener("keydown", this.moveBackOnButton);
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleLiSelection);
    document.removeEventListener("keydown", this.moveBackOnButton);
  }

  cacheSorting = () => {
    localStorage.setItem(`${this.props.list}Sorting`, this.state.sortingType);
    localStorage.setItem(`${this.props.list}Order`, this.state.orderType);
  }

  moveBackOnButton = (e) => {
    if (e.keyCode === 8 && !this.props.modalVisible && this.props.isActive) {
      this.moveBack();
    }
  }

  moveBack = () => {
    if (!this.isHomeDirectory()) {
      return;
    }

    this.props.moveBack();
    this.setState({ cursor: 0 });
  }

  isHomeDirectory = () => {
    return this.props.path !== window.GLOBAL.ROOT_DIR;
  }

  resetData = () => {
    this.setState({ itemsSelected: [], cursor: 0 });
    this.passData();
  }

  setItemData = (itemName, itemPermissions, itemType) => {
    this.setState({ itemName, itemPermissions, itemType });
  }

  passData = () => {
    const { cursor, name, permissions, type } = this.state;
    this.props.passData(cursor, name, permissions, type);
  }

  toggleActiveList = () => {
    const { history, path, list, onClick, changePathAfterToggle, isActive } = this.props;

    if (!isActive) {
      onClick(list);
      changePathAfterToggle(path);
      history.push({
        pathname: '/list/directory/',
        search: `?path=${path}`
      });
      this.cacheActiveWindowAndPaths();
    }
  }

  cacheActiveWindowAndPaths = () => {
    localStorage.setItem("activeWindow", this.props.list);
    localStorage.setItem(`${this.props.list}ListPath`, this.props.path);
    localStorage.setItem(`${this.props.list}ListPath`, this.props.path);
  }

  isSelected = (i) => {
    return this.state.itemsSelected.indexOf(i) !== -1;
  }

  addToSelection(i) {
    const { itemsSelected } = this.state;
    const result = [...itemsSelected];
    const duplicate = itemsSelected.indexOf(i);
    if (duplicate !== -1) {
      result.splice(duplicate, 1);
    } else {
      if (i === "") {
        return;
      }

      result.push(i)
    }

    this.setState({ itemsSelected: result });
    this.props.passSelection(result);
  }

  handleLiSelection = (e) => {
    const { data, isActive, modalVisible, changePath, path, passData } = this.props;
    const { name, permissions, type } = data.listing[this.state.cursor];
    const { cursor } = this.state;

    if (!isActive || modalVisible) {
      return;
    }

    if (e.keyCode === 40) {
      if (cursor === data.listing.length - 1) {
        return;
      }

      if (e.shiftKey) {
        this.addToSelection(name);
      }

      this.setState({ cursor: cursor + 1 });
      passData(cursor, name, permissions, type);
      changePath(path);
    }

    if (e.keyCode === 38) {
      if (cursor === 0) {
        return;
      }

      if (e.shiftKey) {
        this.addToSelection(name);
      }

      this.setState({ cursor: cursor - 1 });
      passData(cursor, name, permissions, type);
      changePath(path);
    }
  }

  openDirectory = (name) => {
    const { history, path, addToPath, openDirectory } = this.props;

    history.push({
      pathname: '/list/directory/',
      search: `?path=${path}/${name}`
    });
    addToPath(name);
    openDirectory();
    this.setState({ cursor: 0 });
  }

  openCertainDirectory = (path) => {
    const { history, openCertainDirectory, changePath } = this.props;

    if (!this.isHomeDirectory()) {
      return;
    }

    history.push({
      pathname: '/list/directory/',
      search: `?path=${path}`
    });
    changePath(path);
    openCertainDirectory();
  }

  changeSorting = (sortingType, orderType) => {
    this.setState({ sortingType, orderType }, () => this.cacheSorting());
  }

  sortByType = (a, b) => {
    if (this.state.orderType === "descending" && a.name !== "") {
      return a.type.localeCompare(b.type);
    } else if (this.state.orderType === "ascending" && b.name !== "") {
      return b.type.localeCompare(a.type);
    }
  }

  sortBySize = (a, b) => {
    if (this.state.orderType === "descending" && a.name !== "") {
      return a.size - b.size;
    } else if (this.state.orderType === "ascending" && b.name !== "") {
      return b.size - a.size;
    }
  }

  sortByDate = (a, b) => {
    if (this.state.orderType === "descending" && a.name !== "") {
      return new Date(a.date) - new Date(b.date);
    } else if (this.state.orderType === "ascending" && a.name !== "") {
      return new Date(b.date) - new Date(a.date);
    }
  }

  sortByName = (a, b) => {
    if (this.state.orderType === "descending" && a.name !== "") {
      return a.name.localeCompare(b.name);
    } else if (this.state.orderType === "ascending" && b.name !== "") {
      return b.name.localeCompare(a.name);
    }
  }

  sortData = (a, b) => {
    switch (this.state.sortingType) {
      case "Type": return this.sortByType(a, b);
      case "Size": if (a.type !== "d" && b.type !== "d") { return this.sortBySize(a, b) }; break;
      case "Date": return this.sortByDate(a, b);
      case "Name": return this.sortByName(a, b);
      default: return this.sortByType(a, b);
    }
  }

  rows = () => {
    const { isActive, passData, modalVisible, path, download } = this.props;
    const { cursor } = this.state;
    const data = { ...this.props.data };

    if (this.props.data.listing.length !== 0) {
      this.props.data.listing[0].size = "";
      this.props.data.listing[0].date = "";
    }

    if (data.listing.length !== 0) {
      let sortedData = data.listing.sort((a, b) => this.sortData(a, b));
      return (
        sortedData.map((item, key) =>
          (item.name !== "" && sortedData.length !== 0) ?
            (<Row key={key}
              modalVisible={modalVisible}
              data={item}
              selectMultiple={() => this.addToSelection(item.name)}
              passData={(cursor, name, permissions, type) => {
                this.setState({ cursor: key });
                this.setItemData(cursor, name, permissions, type);
                passData(cursor, name, permissions, type);
              }}
              activeRow={key === cursor}
              cursor={key}
              selected={this.isSelected(item.name)}
              isActiveList={isActive}
              permissions={item.permissions}
              path={path}
              download={download}
              openDirectory={this.openDirectory} />) :
            (<Row key={key}
              modalVisible={modalVisible}
              data={item}
              path={path}
              cursor={key}
              passData={(cursor, name, permissions, type) => {
                this.setState({ cursor: key });
                this.setItemData(cursor, name, permissions, type);
                passData(cursor, name, permissions, type)
              }}
              activeRow={key === cursor}
              openDirectory={this.moveBack}
              isActiveList={isActive} />))
      );
    }
  }

  render() {
    const { isActive, path, loading } = this.props;
    console.log("DList");
    return (
      <div className={isActive ? "list active" : "list"} onClick={this.toggleActiveList}>
        <Path class={isActive ? "active-path" : "path"}
          openDirectory={this.openCertainDirectory}
          changeSorting={this.changeSorting}
          sorting={this.state.sortingType}
          order={this.state.orderType}
          isActive={isActive}
          path={path} />
        <div className="list-container">
          <ul>
            {loading && isActive ? <Spinner /> : this.rows()}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(DirectoryList);
