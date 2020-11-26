import axios from "axios";

const token = localStorage.getItem("token");
const BASE_URL = window.location.origin;
const webApiUri = '/list/mail/mail.php';
const addMailApiUri = '/api/add/mail/index.php';
const mailInfoUri = '/api/edit/mail/index.php';
const updateMailUri = '/api/edit/mail/index.php';

export const getMailList = () => {
  return axios.get(BASE_URL + webApiUri);
}

export const bulkAction = (action, domainNameSystems) => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("token", token);

  domainNameSystems.forEach(domainNameSystem => {
    formData.append("domain[]", domainNameSystem);
    formData.append("suspend_url", `/suspend/mail/?domain=${domainNameSystem}`);
    formData.append("delete_url", `/delete/mail/?domain=${domainNameSystem}`);
  });

  return axios.post(BASE_URL + '/bulk/mail/', formData);
};

export const handleAction = uri => {
  return axios.get(BASE_URL + uri);
}

export const addMail = data => {
  let formDataObject = new FormData();

  for (let key in data) {
    formDataObject.append(key, data[key]);
  }

  return axios.post(BASE_URL + addMailApiUri, formDataObject);
}

export const getMailInfo = domain => {
  return axios.get(BASE_URL + mailInfoUri, {
    params: {
      domain,
      token
    }
  });
}

export const updateMail = data => {
  let formDataObject = new FormData();

  for (let key in data) {
    formDataObject.append(key, data[key]);
  }

  return axios.post(BASE_URL + updateMailUri, formDataObject);
}