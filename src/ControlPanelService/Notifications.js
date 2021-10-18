import axios from "axios";
let BASE_URL = window.location.origin;
let getNotificationsUri = '/api/v1/list/notifications/index.php';
let deleteNotificationsUri = '/delete/notification';
const token = localStorage.getItem("token");

export const getAppNotifications = () => {
  return axios.get(BASE_URL + getNotificationsUri, {
    params: {
      ajax: 1,
      token
    }
  });
}

export const deleteNotification = id => {
  return axios.get(BASE_URL + deleteNotificationsUri, {
    params: {
      'delete': 1,
      'notification_id': id,
      'ajax': 1,
      token
    }
  });
}