import axios from "axios";

const token = localStorage.getItem("token");
const BASE_URL = window.location.origin;
const webApiUri = '/list/cron/cron.php';

export const getCronList = () => {
  return axios.get(BASE_URL + webApiUri);
}

export const bulkAction = (action, domainNameSystems) => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("token", token);

  domainNameSystems.forEach(domainNameSystem => {
    formData.append("job[]", domainNameSystem);
    formData.append("suspend_url", `/suspend/cron/?job=${domainNameSystem}&token=${token}`);
    formData.append("delete_url", `/delete/cron/?job=${domainNameSystem}&token=${token}`);
  });

  return axios.post(BASE_URL + '/bulk/cron/', formData);
};

export const handleAction = uri => {
  return axios.get(BASE_URL + uri);
}