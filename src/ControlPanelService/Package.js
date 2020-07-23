import axios from "axios";

const BASE_URL = window.location.origin;
const token = localStorage.getItem("token");
const webApiUri = '/list/package/package.php';

export const getPackageList = () => {
  return axios.get(BASE_URL + webApiUri);
}

export const bulkAction = (action, backups) => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("token", token);

  backups.forEach(backup => {
    formData.append("package[]", backup);
    formData.append("delete_url", `/delete/package/?package=${backup}&token=${token}`);
  });

  return axios.post(BASE_URL + '/bulk/package/', formData);
};

export const handleAction = uri => {
  return axios.get(BASE_URL + uri);
}