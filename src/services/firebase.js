import * as firebase from 'firebase'

export const config = {
  apiKey: 'AIzaSyAQO22DDG4BWslDZ1s48mNVgWRJjrUp6T4',
  authDomain: 'acci-d7fb6.firebaseapp.com',
  databaseURL: 'https://acci-d7fb6.firebaseio.com',
  projectId: 'acci-d7fb6',
  storageBucket: 'acci-d7fb6.appspot.com',
  messagingSenderId: '451413706048',
}

const app = firebase.initializeApp(config)

export default firebase
