import * as firebase from 'firebase'

export const config = {
  apiKey: 'AIzaSyAokrr_wGym56A5922gW7povVtDfHwuet4',
  authDomain: 'airbevy-fdd3d.firebaseapp.com',
  databaseURL: 'https://airbevy-fdd3d.firebaseio.com',
  projectId: 'airbevy-fdd3d',
  storageBucket: 'airbevy-fdd3d.appspot.com',
  messagingSenderId: '397376852974'
}

const app = firebase.initializeApp(config)

export default firebase
