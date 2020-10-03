import axios from "axios";

const BASE_URL = window.location.origin;
const token = localStorage.getItem("token");
const webApiUri = '/list/package/package.php';

export const getPackageList = () => {
  return axios.get(BASE_URL + webApiUri);
}

export const bulkAction = (action, backups) => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("token", token);

  backups.forEach(backup => {
    formData.append("package[]", backup);
    formData.append("delete_url", `/delete/package/?package=${backup}&token=${token}`);
  });

  return axios.post(BASE_URL + '/bulk/package/', formData);
};

export const handleAction = uri => {
  return axios.get(BASE_URL + uri);
}

export const packagesMock = {
  "slategrey": {
    "WEB_TEMPLATE": "default",
    "PROXY_TEMPLATE": "default",
    "DNS_TEMPLATE": "default",
    "WEB_DOMAINS": "100",
    "WEB_ALIASES": "100",
    "DNS_DOMAINS": "100",
    "DNS_RECORDS": "100",
    "MAIL_DOMAINS": "100",
    "MAIL_ACCOUNTS": "100",
    "DATABASES": "100",
    "CRON_JOBS": "100",
    "DISK_QUOTA": "10000",
    "BANDWIDTH": "100000",
    "NS": "ns1.localhost.ltd,ns2.localhost.ltd",
    "SHELL": "nologin",
    "BACKUPS": "3",
    "TIME": "12:39:13",
    "DATE": "2015-06-05",
    "delete_conf": "Are you sure you want to delete domain slategrey?"
  },
  "palegreen": {
    "WEB_TEMPLATE": "hosting",
    "PROXY_TEMPLATE": "hosting",
    "DNS_TEMPLATE": "default",
    "WEB_DOMAINS": "50",
    "WEB_ALIASES": "50",
    "DNS_DOMAINS": "50",
    "DNS_RECORDS": "50",
    "MAIL_DOMAINS": "50",
    "MAIL_ACCOUNTS": "50",
    "DATABASES": "50",
    "CRON_JOBS": "50",
    "DISK_QUOTA": "50000",
    "BANDWIDTH": "50000",
    "NS": "ns1.localhost.ltd,ns2.localhost.ltd",
    "SHELL": "nologin",
    "BACKUPS": "5",
    "TIME": "07:49:47",
    "DATE": "2015-06-05",
    "delete_conf": "Are you sure you want to delete domain palegreen?"
  },
  "gainsboro": {
    "WEB_TEMPLATE": "default",
    "PROXY_TEMPLATE": "default",
    "DNS_TEMPLATE": "default",
    "WEB_DOMAINS": "10",
    "WEB_ALIASES": "10",
    "DNS_DOMAINS": "10",
    "DNS_RECORDS": "10",
    "MAIL_DOMAINS": "10",
    "MAIL_ACCOUNTS": "10",
    "DATABASES": "10",
    "CRON_JOBS": "10",
    "DISK_QUOTA": "10000",
    "BANDWIDTH": "10000",
    "NS": "ns1.localhost.ltd,ns2.localhost.ltd",
    "SHELL": "nologin",
    "BACKUPS": "1",
    "TIME": "11:31:30",
    "DATE": "2015-06-05",
    "delete_conf": "Are you sure you want to delete domain gainsboro?"
  },
  "default": {
    "WEB_TEMPLATE": "default",
    "PROXY_TEMPLATE": "default",
    "DNS_TEMPLATE": "default",
    "WEB_DOMAINS": "100",
    "WEB_ALIASES": "100",
    "DNS_DOMAINS": "100",
    "DNS_RECORDS": "100",
    "MAIL_DOMAINS": "100",
    "MAIL_ACCOUNTS": "100",
    "DATABASES": "100",
    "CRON_JOBS": "100",
    "DISK_QUOTA": "10000",
    "BANDWIDTH": "100000",
    "NS": "ns1.localhost.ltd,ns2.localhost.ltd",
    "SHELL": "nologin",
    "BACKUPS": "3",
    "TIME": "11:46:50",
    "DATE": "2015-06-05",
    "delete_conf": "Are you sure you want to delete domain default?"
  }
};