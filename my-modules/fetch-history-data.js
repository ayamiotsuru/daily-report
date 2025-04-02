// Cloud Firesotreから取得したデータを表示する
export const fetchHistoryData = async (getDocs, collection, db) => {
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