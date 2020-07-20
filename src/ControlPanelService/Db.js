import axios from "axios";

const token = localStorage.getItem("token");
const BASE_URL = window.location.origin;
const webApiUri = '/list/db/db.php';

export const getDatabaseList = () => {
  return axios.get(BASE_URL + webApiUri);
}

export const bulkAction = (action, domainNameSystems) => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("token", token);

  domainNameSystems.forEach(domainNameSystem => {
    formData.append("database[]", domainNameSystem);
    formData.append("suspend_url", `/suspend/db/?database=${domainNameSystem}&token=${token}`);
    formData.append("delete_url", `/delete/db/?database=${domainNameSystem}&token=${token}`);
  });

  return axios.post(BASE_URL + '/bulk/db/', formData);
};

export const handleAction = uri => {
  return axios.get(BASE_URL + uri);
}