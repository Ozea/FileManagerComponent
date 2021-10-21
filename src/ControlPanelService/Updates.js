import axios from "axios";
import { getAuthToken } from "src/utils/token";

const deleteAutoUpdateUri = '/delete/cron/autoupdate/';
const addAutoUpdateUri = '/add/cron/autoupdate/';
const webApiUri = '/api/v1/list/updates/index.php';
const token = localStorage.getItem("token");
const BASE_URL = window.location.origin;

export const getUpdatesList = () => {
  return axios.get(BASE_URL + webApiUri);
}

export const bulkAction = (action, updates) => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("token", token);

  updates.forEach(update => {
    formData.append("pkg[]", update);
  });

  return axios.post(BASE_URL + '/bulk/vesta/', formData);
};

export const handleAction = uri => {
  return axios.get(BASE_URL + uri, {
    params: {
      token: getAuthToken()
    }
  });
}

export const enableAutoUpdate = () => {
  return axios.get(`${BASE_URL}${addAutoUpdateUri}?token=${token}`);
};

export const disableAutoUpdate = () => {
  return axios.get(`${BASE_URL}${deleteAutoUpdateUri}?token=${token}`);
};