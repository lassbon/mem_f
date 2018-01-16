import axios from "axios";

const BASE_URL = 'http://localhost:1337'

export { getPostData }

function getPostData() {
  const url = `${BASE_URL}/api/v1/social/post/:id`
  return axios.get(url).then(res => res.data)
}