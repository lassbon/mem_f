import axios from 'axios'

const BASEURL = 'ttps://obscure-waters-44612.herokuapp.com/'

export default {
  user: {
    login: credentails =>
      axios
        .post(`${BASEURL}api/v1/auth/user`, credentails)
        .then(res => res.data),
    signup: user =>
      axios
        .post(`${BASEURL}api/v1/user`, user, {
          headers: {
            'Content-Type': 'application/form-data',
            Accept: 'application/form-data',
          },
        })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post(`${BASEURL}api/vi/user/reset`, email),
  },
  // posts: {
  //   fetchAll: () => axios.get(`${BASEURL}api/v1/social/post/`).then(res => res.data.post),
  //   create: book =>
  //     axios.post(`${BASEURL}api/v1/social/post/`, { post }).then(res => res.data.post)
  // }
}
