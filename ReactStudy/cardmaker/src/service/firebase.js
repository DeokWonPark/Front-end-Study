import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyD5TXeYAR4uJgdBorgx2zni7HbZ4gNehRk",
  authDomain: "class-card-maker.firebaseapp.com",
  projectId: "class-card-maker",
  databaseURL:"https://class-card-maker-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
const firebaseApp=firebase.initializeApp(firebaseConfig);
export default firebaseApp;