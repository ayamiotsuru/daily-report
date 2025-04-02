// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0NrYcwZCPKTdNna-52XQrUcAqwU4K7Ok",
  authDomain: "homework-daily-report.firebaseapp.com",
  projectId: "homework-daily-report",
  storageBucket: "homework-daily-report.firebasestorage.app",
  messagingSenderId: "663391946166",
  appId: "1:663391946166:web:0ed3f6c29dc8b76688ed17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud Firestoreの初期化
const db = getFirestore(app);

// Cloud Firesotreから取得したデータを表示する
const fetchHistoryData = async () => {
  let tags = '';

  //reportsコレクションのデータを取得
  const querySnapshot = await getDocs(collection(db, 'reports'));

  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      tags += `<tr><td>${doc.data().date}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`
  });
  document.getElementById('js-history').innerHTML = tags;
};

// Cloud Firestoreから取得したデータを表示する
if(document.getElementById('js-history')) {
  fetchHistoryData();
}