import React, { Component } from 'react';
import Spinner from '../../Spinner/Spinner';
import Path from '../../Path/Path';
import Row from '../Row/Row';
import '../List.scss';

class DirectoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: [],
      cursor: 0,
      sorting: "Type",
      order: "descending",
      data: []
    }
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleLiSelection);
    document.addEventListener("keydown", this.moveBackOnBackspace);
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleLiSelection);
    document.removeEventListener("keydown", this.moveBackOnBackspace);
  }

  componentWillMount = () => {
    if (localStorage.getItem(`${this.props.list}Sorting`) !== null && localStorage.getItem(`${this.props.list}Order`) !== null) {
      this.setState({ sorting: localStorage.getItem(`${this.props.list}Sorting`), order: localStorage.getItem(`${this.props.list}Order`) });
    }
  }

  cacheSorting = () => {
    localStorage.removeItem(`${this.props.list}Sorting`, this.state.sorting);
    localStorage.removeItem(`${this.props.list}Order`, this.state.order);
    localStorage.setItem(`${this.props.list}Sorting`, this.state.sorting);
    localStorage.setItem(`${this.props.list}Order`, this.state.order);
  }

  moveBackOnBackspace = (e) => {
    if (e.keyCode === 8 && !this.props.modalVisible && this.props.isActive) {
      this.moveBack();
    }
  }

  moveCursorOnPreviousRow = (prevCursor) => {
    let cursor = prevCursor - 1;
    let { name, permissions } = this.props.data.listing[cursor];
    this.props.passData(cursor, name, permissions);
    this.setState({ cursor });
  }

  resetData = () => {
    this.setState({ selection: [], cursor: 0 });
    let { name, permissions } = this.props.data.listing[this.state.cursor];
    this.props.passData(this.state.cursor, name, permissions);
  }

  toggleActiveList = () => {
    const { history: { history }, path, list, onClick, changePathAfterToggle, isActive } = this.props;

    if (!isActive) {
      onClick(list);
      changePathAfterToggle(path);
      history.push({
        pathname: '/list/directory/',
        search: `?path=${path}`
      });
    }
  }

  isSelected = (i) => {
    return this.state.selection.indexOf(i) !== -1;
  }

  addToSelection(i) {
    const { selection } = this.state;
    const result = [...selection];
    const duplicate = selection.indexOf(i);
    if (duplicate !== -1) {
      result.splice(duplicate, 1);
    } else {
      if (i === "") {
        return;
      }

      result.push(i)
    }

    this.setState({ selection: result });
    this.props.passSelection(result);
  }

  passData = () => {
    const { data, passData } = this.props;
    let name = data.listing[this.state.cursor].name;
    let permissions = data.listing[this.state.cursor].permissions;
    if (this.state.cursor === 0) {
      passData(0, '', '');
    } else {
      passData(this.state.cursor, name, permissions);
    }
  }

  handleLiSelection = (e) => {
    const { data, isActive, passData, modalVisible } = this.props;
    const { cursor } = this.state;

    if (!isActive || modalVisible) {
      return;
    }

    if (e.keyCode === 40) {
      if (cursor === data.listing.length - 1) {
        return;
      }

      if (e.shiftKey) {
        let name = data.listing[cursor].name;
        this.addToSelection(name);
      }

      this.setState({ cursor: cursor + 1 });
      const { name, permissions } = data.listing[this.state.cursor];
      passData(this.state.cursor, name, permissions);
      this.props.changePath(this.props.path);
    }

    if (e.keyCode === 38) {
      if (cursor === 0) {
        return;
      }

      if (e.shiftKey) {
        let name = data.listing[cursor].name;
        this.addToSelection(name);
      }

      this.setState({ cursor: cursor - 1 });
      const { name, permissions } = data.listing[this.state.cursor];
      passData(this.state.cursor, name, permissions);
      this.props.changePath(this.props.path);
    }
  }

  openDirectory = (name) => {
    const { history: { history }, path, addToPath, openDirectory } = this.props;
    history.push({
      pathname: '/list/directory/',
      search: `?path=${path}/${name}`
    });
    addToPath(name);
    openDirectory();
    this.setState({ cursor: 0 });
  }

  openCertainDirectory = (path) => {
    const { history: { history }, openCertainDirectory, changePath } = this.props;

    history.push({
      pathname: '/list/directory/',
      search: `?path=${path}`
    });
    changePath(path);
    openCertainDirectory(path);
  }

  moveBack = () => {
    if (this.props.path === '/home/admin') {
      return;
    }

    this.props.moveBack();
    this.setState({ cursor: 0 });
  }

  changeSorting = (sorting, order) => {
    this.setState({ sorting, order }, () => this.cacheSorting());
  }

  sortByType = (a, b) => {
    if (this.state.order === "descending" && a.name !== "") {
      return a.type.localeCompare(b.type);
    } else if (this.state.order === "ascending" && b.name !== "") {
      return b.type.localeCompare(a.type);
    }
  }

  sortBySize = (a, b) => {
    if (this.state.order === "descending" && a.name !== "") {
      return a.size - b.size;
    } else if (this.state.order === "ascending" && b.name !== "") {
      return b.size - a.size;
    }
  }

  sortByDate = (a, b) => {
    if (this.state.order === "descending" && a.name !== "") {
      return new Date(a.date) - new Date(b.date);
    } else if (this.state.order === "ascending" && a.name !== "") {
      return new Date(b.date) - new Date(a.date);
    }
  }

  sortByName = (a, b) => {
    if (this.state.order === "descending" && a.name !== "") {
      return a.name.localeCompare(b.name);
    } else if (this.state.order === "ascending" && b.name !== "") {
      return b.name.localeCompare(a.name);
    }
  }

  sortData = (a, b) => {
    switch (this.state.sorting) {
      case "Type": return this.sortByType(a, b);
      case "Size": return this.sortBySize(a, b);
      case "Date": return this.sortByDate(a, b);
      case "Name": return this.sortByName(a, b);
      default: return this.sortByType(a, b);
    }
  }

  rows = () => {
    const { isActive, passData, modalVisible, path, download, history: { history } } = this.props;
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
              selectMultiple={() => this.addToSelection(item.name)}
              type={item.type}
              name={item.name}
              passData={(name, permissions) => {
                this.setState({ cursor: key });
                passData(key, name, permissions);
              }}
              activeRow={key === cursor}
              cursor={key}
              selected={this.isSelected(item.name)}
              isActiveList={isActive}
              owner={item.owner}
              permissions={item.permissions}
              size={item.size}
              date={item.date}
              time={item.time}
              path={path}
              history={history}
              download={download}
              openDirectory={this.openDirectory} />) :
            (<Row key={key}
              modalVisible={modalVisible}
              type={item.type}
              path={path}
              name=".."
              cursor={key}
              passData={(name) => {
                this.setState({ cursor: key });
                passData(key, name)
              }}
              activeRow={key === cursor}
              openDirectory={this.moveBack}
              isActiveList={isActive} />))
      );
    }
  }

  render() {
    const { isActive, path, loading } = this.props;
    return (
      <div className={isActive ? "list active" : "list"} onClick={this.toggleActiveList}>
        <Path class={isActive ? "active-path" : "path"}
          openDirectory={this.openCertainDirectory}
          changeSorting={this.changeSorting}
          sortingName={this.state.sorting}
          isActive={isActive}
          order={this.state.order}
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

export default DirectoryList;
