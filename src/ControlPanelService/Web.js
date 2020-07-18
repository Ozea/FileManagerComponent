import axios from "axios";

const token = localStorage.getItem("token");
const BASE_URL = window.location.origin;
const webApiUri = '/list/web/web.php';

export const getWebList = () => {
  return axios.get(BASE_URL + webApiUri);
}

export const bulkAction = (action, webDomains) => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("token", token);

  webDomains.forEach(webDomain => {
    formData.append("domain[]", webDomain);
    formData.append("suspend_url", `/suspend/web/?domain=${webDomain}&token=${token}`);
    formData.append("delete_url", `/delete/web/?domain=${webDomain}&token=${token}`);
  });

  return axios.post(BASE_URL + '/bulk/web/', formData);
};

export const handleAction = uri => {
  return axios.get(BASE_URL + uri);
}