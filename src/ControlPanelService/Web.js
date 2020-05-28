import axios from "axios";

const BASE_URL = window.location.origin;
const webApiUri = '/list/web/web.php';

export const getWebList = () => {
  return axios.get(BASE_URL + webApiUri);
}