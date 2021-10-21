import axios from 'axios';
import { getAuthToken } from 'src/utils/token';

const BASE_URL = window.location.origin;
const token = localStorage.getItem("token");
const usersUri = '/api/v1/list/firewall/index.php';
const addFirewallUri = '/api/v1/add/firewall/index.php';
const firewallInfoUri = '/api/v1/edit/firewall/index.php';
const updateFirewallUri = '/api/v1/edit/firewall/index.php';
const addBanIpsUri = '/api/v1/add/firewall/banlist/index.php';
const banListUri = '/api/v1/list/firewall/banlist/index.php';

export const getFirewallList = () => {
  return axios.get(BASE_URL + usersUri);
}

export const getBanList = () => {
  return axios.get(BASE_URL + banListUri);
}

export const bulkAction = (action, firewalls) => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("token", token);

  firewalls.forEach(firewall => {
    formData.append("rule[]", firewall);
  });

  return axios.post(BASE_URL + '/bulk/firewall/', formData);
};

export const handleAction = uri => {
  return axios.get(BASE_URL + uri, {
    params: {
      token: getAuthToken()
    }
  });
}

export const getBanIps = data => {
  let formDataObject = new FormData();

  for (let key in data) {
    formDataObject.append(key, data[key]);
  }

  return axios.get(BASE_URL + addBanIpsUri, {
    params: {
      token
    }
  });
}

export const addBanIp = (data) => {
  let formDataObject = new FormData();

  for (let key in data) {
    formDataObject.append(key, data[key]);
  }

  return axios.get(BASE_URL + addBanIpsUri, {
    params: {
      token
    }
  });
}

export const addFirewall = data => {
  let formDataObject = new FormData();

  for (let key in data) {
    formDataObject.append(key, data[key]);
  }

  return axios.post(BASE_URL + addFirewallUri, formDataObject);
}

export const getFirewallInfo = rule => {
  return axios.get(BASE_URL + firewallInfoUri, {
    params: {
      rule,
      token
    }
  });
}

export const updateFirewall = (data, rule) => {
  let formDataObject = new FormData();

  for (let key in data) {
    formDataObject.append(key, data[key]);
  }

  return axios.post(BASE_URL + updateFirewallUri, formDataObject, {
    params: {
      rule,
      token
    }
  });
}