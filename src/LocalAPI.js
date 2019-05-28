import axios from "axios";

export function getDataFromServer(url) {
  return axios.get(url);
}

export function addFile(name, activeList) {
  const newFile = {
    type: "f",
    permissions: "771",
    owner: "admin",
    group: "admin",
    size: "1000",
    name
  };

  if (activeList === "left") {
    leftList.listing.push(newFile);
    return leftList;
  } else {
    rightList.listing.push(newFile);
    return rightList;
  }
}

export function addDirectory(name, activeList) {
  const newDir = {
    type: "d",
    permissions: "771",
    owner: "admin",
    group: "admin",
    size: "1000",
    name: name
  };

  if (activeList === "left") {
    return leftList.listing.push(newDir);
  } else {
    return rightList.listing.push(newDir);
  }
}

export function rename(cursor, active, name) {
  if (active === "left") {
    return leftList.listing[cursor].name = name;
  } else {
    return rightList.listing[cursor].name = name;
  }
}

export function changePermissions(cursor, active, permissions) {
  if (active === "left") {
    return leftList.listing[cursor].permissions = permissions;
  } else {
    return rightList.listing[cursor].permissions = permissions;
  }
}

export function openDirectory(active) {
  if (active === "left") {
    return leftList.listing = [{ "type": "d", "permissions": "711", "owner": "admin", "name": "" }, { "type": "d", "permissions": "711", "owner": "admin", "name": "new" }, { "type": "d", "permissions": "711", "owner": "admin", "name": "test" }]
  } else {
    return rightList.listing = [{ "type": "d", "permissions": "711", "owner": "admin", "name": "" }, { "type": "d", "permissions": "711", "owner": "admin", "name": "test" }, { "type": "d", "permissions": "711", "owner": "admin", "name": "web" }]
  }
}

export function getDirectoryPath() {
  return '/home/admin';
}

export const leftList = {
  "listing": [
    {
      "type": "d",
      "permissions": "711",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "admin",
      "group": "admin",
      "size": "4096",
      "name": ""
    },
    {
      "type": "f",
      "permissions": "644",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "admin",
      "group": "admin",
      "size": "124",
      "name": ".bashrc"
    },
    {
      "type": "f",
      "permissions": "644",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "admin",
      "group": "admin",
      "size": "200000",
      "name": "screenshot.jpg"
    },
    {
      "type": "d",
      "permissions": "751",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "admin",
      "group": "admin",
      "size": "4096",
      "name": "web"
    },
    {
      "type": "d",
      "permissions": "755",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "root",
      "group": "root",
      "size": "4096",
      "name": "conf"
    },
    {
      "type": "f",
      "permissions": "644",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "admin",
      "group": "admin",
      "size": "33",
      "name": ".bash_logout"
    },
    {
      "type": "d",
      "permissions": "771",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "admin",
      "group": "admin",
      "size": "4096",
      "name": "tmp"
    }
  ]
}

export const rightList = {
  "listing": [
    {
      "type": "d",
      "permissions": "711",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "admin",
      "group": "admin",
      "size": "4096",
      "name": ""
    },
    {
      "type": "f",
      "permissions": "644",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "admin",
      "group": "admin",
      "size": "124",
      "name": ".bashrc"
    },
    {
      "type": "f",
      "permissions": "644",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "admin",
      "group": "admin",
      "size": "17600000",
      "name": "video.mp4"
    },
    {
      "type": "d",
      "permissions": "751",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "admin",
      "group": "admin",
      "size": "4096",
      "name": "web"
    },
    {
      "type": "d",
      "permissions": "755",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "root",
      "group": "root",
      "size": "4096",
      "name": "conf"
    },
    {
      "type": "f",
      "permissions": "644",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "admin",
      "group": "admin",
      "size": "33",
      "name": ".bash_logout"
    },
    {
      "type": "d",
      "permissions": "771",
      "date": "2015-07-04",
      "time": "09:46",
      "owner": "admin",
      "group": "admin",
      "size": "4096",
      "name": "tmp"
    }
  ]
}