import axios from "axios";

const BASE_URL = window.location.origin;
const token = localStorage.getItem("token");
const webApiUri = '/list/server/server.php';
const serverAdditionalInfoUri = '/api/edit/server/index.php';
const updateServerUri = '/api/edit/server/index.php';

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

export const getServerAdditionalInfo = () => {
  return axios.get(BASE_URL + serverAdditionalInfoUri, {
    params: {
      token
    }
  });
}

export const updateServer = () => {
  return axios.get(BASE_URL + updateServerUri, {
    params: {
      token
    }
  });
}