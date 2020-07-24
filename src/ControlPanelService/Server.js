import axios from "axios";

const BASE_URL = window.location.origin;
const token = localStorage.getItem("token");
const webApiUri = '/list/server/server.php';

export const getServersList = () => {
  return axios.get(BASE_URL + webApiUri);
}

export const bulkAction = (action, servers) => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("token", token);

  servers.forEach(server => {
    formData.append("service[]", server);
  });

  return axios.post(BASE_URL + '/bulk/service/', formData);
};

export const handleAction = uri => {
  return axios.get(BASE_URL + uri);
}