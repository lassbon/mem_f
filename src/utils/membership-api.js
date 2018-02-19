import axios from 'axios'

const BASE_URL = 'http://localhost:1337/'
// const BASE_URL = "http://membership-api.accinigeria.com/";

export { getPostData }

function getPostData(id) {
  const url = `${BASE_URL}api/v1/social/post/${id}`
  return axios.get(url)
}
