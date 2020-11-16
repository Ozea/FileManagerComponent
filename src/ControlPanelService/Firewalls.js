import axios from 'axios';

const BASE_URL = window.location.origin;
const token = localStorage.getItem("token");
const usersUri = '/list/firewall/firewall.php';
const addFirewallUri = '/api/add/firewall/index.php';

export const getFirewallList = () => {
  return axios.get(BASE_URL + usersUri);
}

export const bulkAction = (action, firewalls) => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("token", token);

  firewalls.forEach(firewall => {
    formData.append("rule[]", firewall);
    formData.append("suspend_url", `/suspend/firewall/?rule=${firewall}&token=${token}`);
    formData.append("delete_url", `/delete/firewall/?rule=${firewall}&token=${token}`);
  });

  return axios.post(BASE_URL + '/bulk/firewall/', formData);
};

export const handleAction = uri => {
  return axios.get(BASE_URL + uri);
}

export const addFirewall = data => {
  let formDataObject = new FormData();

  for (let key in data) {
    formDataObject.append(key, data[key]);
  }

  return axios.post(BASE_URL + addFirewallUri, formDataObject);
}