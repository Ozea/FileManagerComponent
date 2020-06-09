import axios from "axios";

const BASE_URL = window.location.origin;
const webApiUri = '/list/dns/dns.php';

export const getDnsList = () => {
  return axios.get(BASE_URL + webApiUri);
}

export const bulkAction = (action, users) => {
  const formData = new FormData();
  formData.append("action", action);

  users.forEach(item => {
    formData.append("web[]", item);
    formData.append("suspend_url", `/suspend/user/?user=${item}`);
    formData.append("delete_url", `/delete/user/?user=${item}`);
  });

  return axios.post(BASE_URL + '/bulk/user/', formData);
};