import axios from "axios";

export function getDataFromServer(url) {
  return axios.get(url);
}

export function validateAction(url) {
  return axios.get(url);
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