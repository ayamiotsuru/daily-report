// Cloud Firestoreにデータを送信する
export const submitData = async (e, addDoc, collection, db) => {
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