import axios from 'axios'

const BASE_URL = 'https://airbevy-api.herokuapp.com/'
// const BASE_URL = "https://airbevy-api.herokuapp.com/";

export { getPostData }

function getPostData(id) {
  const url = `${BASE_URL}api/v1/social/post/${id}`
  return axios.get(url)
}
