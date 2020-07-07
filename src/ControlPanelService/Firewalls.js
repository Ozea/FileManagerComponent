import axios from 'axios';

const BASE_URL = window.location.origin;
const usersUri = '/list/firewall/firewall.php';

export const getFirewallList = () => {
  return axios.get(BASE_URL + usersUri);
}

export const bulkAction = (action, users) => {
  const formData = new FormData();
  formData.append("action", action);

  users.forEach(item => {
    formData.append("users[]", item);
    formData.append("suspend_url", `/suspend/user/?user=${item}`);
    formData.append("delete_url", `/delete/user/?user=${item}`);
  });

  return axios.post(BASE_URL + '/bulk/user/', formData);
};