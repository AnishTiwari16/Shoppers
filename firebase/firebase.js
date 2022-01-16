import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCWcOee1MHC_TkddlHrBO9706VxK9K5-PQ",
    authDomain: "shop-app-e55f5.firebaseapp.com",
    databaseURL: "https://shop-app-e55f5-default-rtdb.firebaseio.com",
    projectId: "shop-app-e55f5",
    storageBucket: "shop-app-e55f5.appspot.com",
    messagingSenderId: "1000184661435",
    appId: "1:1000184661435:web:c056dc5aec2c484feb309e"
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  
  export{auth};