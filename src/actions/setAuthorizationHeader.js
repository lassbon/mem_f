import axios from "axios";

// let token = localStorage.getItem('id_token') || null

export default (email = null) => {
  if (email) {
    axios.defaults.headers.common.authorization = `Bearer ${email}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};


// export default (token = null) => {
//   if (token) {
//     axios.defaults.headers.common.authorization = `Bearer ${token}`;
//   } else {
//     delete axios.defaults.headers.common.authorization;
//   }
// };
