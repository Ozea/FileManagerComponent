import axios from "axios";

const token = localStorage.getItem("token");
const BASE_URL = window.location.origin;
const webApiUri = '/list/backup/backup.php';
const scheduleBackupUri = '/schedule/backup/';
const backupDetailsUri = '/list/backup/backup.php';

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

export const scheduleBackup = () => {
  return axios.get(BASE_URL + scheduleBackupUri);
}

export const getBackupDetails = backup => {
  return axios.get(BASE_URL + `${backupDetailsUri}?backup=${backup}`);
}