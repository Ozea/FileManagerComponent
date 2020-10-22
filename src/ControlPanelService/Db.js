import axios from "axios";

const token = localStorage.getItem("token");
const BASE_URL = window.location.origin;
const webApiUri = '/list/db/db.php';
const addDbApiUri = '/api/add/db/index.php';
const optionalDbInfoUri = '/api/add/db/index.php';

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

export const getDbOptionalInfo = () => {
  return axios.get(BASE_URL + optionalDbInfoUri);
}

export const addDatabase = data => {
  let formDataObject = new FormData();

  for (let key in data) {
    formDataObject.append(key, data[key]);
  }

  return axios.post(BASE_URL + addDbApiUri, formDataObject);
}

export const dbCharsets = [
  'big5',
  'dec8',
  'cp850',
  'hp8',
  'koi8r',
  'latin1',
  'latin2',
  'swe7',
  'ascii',
  'ujis',
  'sjis',
  'hebrew',
  'tis620',
  'euckr',
  'koi8u',
  'gb2312',
  'greek',
  'cp1250',
  'gbk',
  'latin5',
  'armscii8',
  'utf8',
  'ucs2',
  'cp866',
  'keybcs2',
  'macce',
  'macroman',
  'cp852',
  'latin7',
  'cp1251',
  'cp1256',
  'cp1257',
  'binary',
  'geostd8',
  'cp932',
  'eucjpms'
];