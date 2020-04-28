import axios from "axios";
let BASE_URL = window.location.origin;
let getNotificationsUri = '/list/notifications/?ajax=1';
let deleteNotificationsUri = '/delete/notification';

export const getAppNotifications = () => {
  return axios.get(BASE_URL + getNotificationsUri);
}

export const deleteNotification = (del, id) => {
  return axios.get(BASE_URL + deleteNotificationsUri, {
    'delete': del,
    'notification_id': id
  });
}