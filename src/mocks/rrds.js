export function generateImagePath(period, type) {
  return `/list/rrd/image.php?/rrd/${type}/${period}-${type}.png`;
}

export const rrds = {
  "1": {
    "TYPE": "la",
    "RRD": "la",
    "TITLE": "Load Average",
    "TIME": "02:56:14",
    "DATE": "2020-04-02"
  },
  "2": {
    "TYPE": "mem",
    "RRD": "mem",
    "TITLE": "Memory Usage",
    "TIME": "02:56:14",
    "DATE": "2020-04-02"
  },
  "3": {
    "TYPE": "net",
    "RRD": "eth0",
    "TITLE": "Bandwidth Usage eth0",
    "TIME": "02:56:14",
    "DATE": "2020-04-02"
  },
  "4": {
    "TYPE": "net",
    "RRD": "eth1",
    "TITLE": "Bandwidth Usage eth1",
    "TIME": "02:56:14",
    "DATE": "2020-04-02"
  },
  "5": {
    "TYPE": "net",
    "RRD": "sit0",
    "TITLE": "Bandwidth Usage sit0",
    "TIME": "02:56:14",
    "DATE": "2020-04-02"
  },
  "6": {
    "TYPE": "web",
    "RRD": "httpd",
    "TITLE": "HTTPD Usage",
    "TIME": "02:56:14",
    "DATE": "2020-04-02"
  },
  "7": {
    "TYPE": "web",
    "RRD": "nginx",
    "TITLE": "NGINX Usage",
    "TIME": "02:56:14",
    "DATE": "2020-04-02"
  },
  "8": {
    "TYPE": "db",
    "RRD": "mysql_localhost",
    "TITLE": "MySQL Usage on localhost",
    "TIME": "02:56:14",
    "DATE": "2020-04-02"
  },
  "9": {
    "TYPE": "db",
    "RRD": "pgsql_localhost",
    "TITLE": "PostgreSQL Usage on localhost",
    "TIME": "02:56:14",
    "DATE": "2020-04-02"
  },
  "10": {
    "TYPE": "ftp",
    "RRD": "ftp",
    "TITLE": "FTP Usage",
    "TIME": "02:56:14",
    "DATE": "2020-04-02"
  },
  "11": {
    "TYPE": "ssh",
    "RRD": "ssh",
    "TITLE": "SSH Usage",
    "TIME": "02:56:14",
    "DATE": "2020-04-02"
  }
};