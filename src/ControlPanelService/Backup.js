import axios from "axios";

const token = localStorage.getItem("token");
const webApiUri = '/list/backup/backup.php';
const BASE_URL = window.location.origin;

export const getBackupList = () => {
  return axios.get(BASE_URL + webApiUri);
}

export const bulkAction = (action, backups) => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("token", token);

  backups.forEach(backup => {
    formData.append("backup[]", backup);
    formData.append("delete_url", `/delete/backup/?backup=${backup}&token=${token}`);
  });

  return axios.post(BASE_URL + '/bulk/backup/', formData);
};

export const handleAction = uri => {
  return axios.get(BASE_URL + uri);
}