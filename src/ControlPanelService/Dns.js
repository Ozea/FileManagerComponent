import axios from "axios";

const token = localStorage.getItem("token");
const BASE_URL = window.location.origin;
const dnsApiUri = '/list/dns/dns.php';
const addDnsApiUri = '/api/add/dns/index.php';
const dNSInfoUri = '/api/edit/dns/index.php';
const updateDNSUri = '/api/edit/dns/index.php';

export const getDnsList = () => {
  return axios.get(BASE_URL + dnsApiUri);
}

export const bulkAction = (action, domainNameSystems) => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("token", token);

  domainNameSystems.forEach(domainNameSystem => {
    formData.append("domain[]", domainNameSystem);
    formData.append("suspend_url", `/suspend/dns/?domain=${domainNameSystem}`);
    formData.append("delete_url", `/delete/dns/?domain=${domainNameSystem}`);
  });

  return axios.post(BASE_URL + '/bulk/dns/', formData);
};

export const handleAction = uri => {
  return axios.get(BASE_URL + uri);
}

export const addDomainNameSystem = data => {
  let formDataObject = new FormData();

  for (let key in data) {
    formDataObject.append(key, data[key]);
  }

  return axios.post(BASE_URL + addDnsApiUri, formDataObject);
}

export const getDNSInfo = domain => {
  return axios.get(BASE_URL + dNSInfoUri, {
    params: {
      domain,
      token
    }
  });
}

export const updateDNS = (data, domain) => {
  let formDataObject = new FormData();

  for (let key in data) {
    formDataObject.append(key, data[key]);
  }

  return axios.post(BASE_URL + updateDNSUri, formDataObject, {
    params: {
      domain,
      token
    }
  });
}