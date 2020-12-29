import axios from "axios";

const BASE_URL = window.location.origin;
const token = localStorage.getItem("token");
const webApiUri = '/list/server/server.php';
const serverAdditionalInfoUri = '/api/edit/server/index.php';
const updateServerUri = '/api/edit/server/index.php';
const nginxInfoUri = '/api/edit/server/nginx/index.php';
const phpInfoUri = '/api/edit/server/php/index.php';

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

export const updateService = (data, uri = '') => {
  let formDataObject = new FormData();

  for (let key in data) {
    formDataObject.append(key, data[key]);
  }

  return axios.post(BASE_URL + `/api/edit/server${uri}/index.php`, formDataObject, {
    params: {
      token
    }
  });
}

export const getNginxInfo = () => {
  return axios.get(BASE_URL + nginxInfoUri);
}

export const getPhpInfo = () => {
  return axios.get(BASE_URL + phpInfoUri);
}