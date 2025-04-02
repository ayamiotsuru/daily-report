// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
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

  // reportsコレクションのデータを取得
  // getDocsは引数にコレクションを指定することで、コレクションに紐づいたドキュメントを取得することができるメソッド。非同期で処理されるため、asyncで宣言された関数内であれば、awaitをつけて実行できる。
  // なぜならば、以降表を挿入する命令は、データの取得が確実に完了してからでないとエラーになるから。
  const querySnapshot = await getDocs(collection(db, 'reports'));

  // データをテーブルの表の形式に合わせて　HTMLに挿入
  // forEachは配列データをループさせながら中身の要素を取得する。
  // forEach構文はループ文の一種で、配列.forEach((配列から取り出した1要素) => {処理})の形で使用し、配列から順に値を取り出すことができる。
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


// Cloud Firestoreにデータを送信する
const submitData = async (e) => {
  // preventDefault()メソッドはイベントをキャンセルすることができる。
  // 送信イベントは呼ばれると、ページがリロードされたり遷移するので、それをキャンセル
  e.preventDefault();

  // FormDataオブジェクトでフォーム内の値を取得
  const formData = new FormData(e.target);

  // try・catch構文（非同期処理に成功した時、失敗した時）
  try {
    // ここに非同期処理をかく
    const docRef = await addDoc(collection(db, "reports"), {
      date: new Date(),
      // FormDataオブジェクトに対し.get()メソッドが呼ばれている。引数にkey名を渡すことで、そのkeyに対応する値を取得できる。key名とは、<input>や<textarea>タグに設定されたname属性の値。
      name: formData.get('name'),
      work: formData.get('work'),
      comment: formData.get('comment')
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    // 非同期処理が失敗した時の処理を書く(今回デバック用)
    console.error("Error adding document: ", e);
  }
}

// Cloud Firestoreにデータを送信する
if(document.getElementById('js-form')) {
  document.getElementById('js-form').addEventListener('submit', (e) => submitData(e));
};