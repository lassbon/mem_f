import axios from "axios";

const BASE_URL = "https://obscure-waters-44612.herokuapp.com/";

export { getPostData }

function getPostData() {
  const url = `${BASE_URL}api/v1/social/post/`
  return axios.get(url).then(res => res.data)
}