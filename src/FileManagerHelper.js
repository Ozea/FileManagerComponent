import axios from "axios";

export function getDataFromServer(url) {
  return axios.get(url);
}

export function validateAction(url) {
  return axios.get(url);
}

export function cacheData(currentUser, history) {
  if (localStorage.getItem("lastUser") === null || currentUser !== localStorage.getItem("lastUser")) {
    localStorage.setItem("lastUser", this.state.currentUser);
    localStorage.setItem("activeWindow", "left");
    localStorage.setItem("leftListPath", window.GLOBAL.ROOT_DIR);
    localStorage.setItem("rightListPath", window.GLOBAL.ROOT_DIR);
  }

  if (localStorage.getItem("activeWindow") === null || localStorage.getItem("leftListPath") === null || localStorage.getItem("rightListPath") === null) {
    let path = history.location.search.substring(6).split('/');
    localStorage.setItem("activeWindow", "left");
    localStorage.setItem("leftListPath", path);
    localStorage.setItem("rightListPath", window.GLOBAL.ROOT_DIR);
  }
}

export function activeWindowPath() {
  if (localStorage.getItem("activeWindow") === "left") {
    let currentPath = localStorage.getItem("leftListPath");
    return currentPath;
  } else if (localStorage.getItem("activeWindow") === "right") {
    let currentPath = localStorage.getItem("rightListPath");
    return currentPath;
  }
}

export function deleteItems(url, path, selection) {
  if (!selection.length) {
    return false;
  }

  const promisesArray = selection.map(item =>
    validateAction(`${url}item=${path}%2F${item}&dir=${path}&action=delete_files`)
      .then(response => {
        if (response.data.result) {
          console.log(response.data.result);
        }
      })
  );

  return Promise.all(promisesArray);
}

export function moveItems(url, path, targetPath, selection) {
  if (!selection.length) {
    return false;
  }

  const promisesArray = selection.map(item =>
    validateAction(`${url}item=${path}%2F${item}&target_name=${targetPath}&action=move_file`)
      .then(response => {
        if (response.data.result) {
          console.log(response.data.result);
        }
      })
  );

  return Promise.all(promisesArray);
}

export function copyItems(url, path, targetPath, selection) {
  if (!selection.length) {
    return false;
  }

  const promisesArray = selection.map(item =>
    validateAction(`${url}item=${path}%2F${item}&filename=${item}&dir=${path}&dir_target=${targetPath}&action=copy_file`)
      .then(response => {
        if (response.data.result) {
          console.log(response.data.result);
        }
      })
  );

  return Promise.all(promisesArray);
}