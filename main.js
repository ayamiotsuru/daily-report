// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// my-modulesのインポート
import { fetchHistoryData } from './my-modules/fetch-history-data';
import { submitData } from './my-modules/submit-data';

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

// Cloud Firestoreから取得したデータを表示する
if(document.getElementById('js-history')) {
  fetchHistoryData(getDocs, collection, db);
}

// Cloud Firestoreにデータを送信する
if(document.getElementById('js-form')) {
  document.getElementById('js-form').addEventListener('submit', (e) => submitData(e, addDoc, collection, db));
};