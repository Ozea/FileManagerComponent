import axios from "axios";

const BASE_URL = window.location.origin;
const webApiUri = '/list/backup/backup.php';

export const getBackupList = () => {
  return axios.get(BASE_URL + webApiUri);
}

export const bulkAction = (action, users) => {
  const formData = new FormData();
  formData.append("action", action);

  users.forEach(item => {
    formData.append("mail[]", item);
    formData.append("suspend_url", `/suspend/user/?user=${item}`);
    formData.append("delete_url", `/delete/user/?user=${item}`);
  });

  return axios.post(BASE_URL + '/bulk/mail/', formData);
};