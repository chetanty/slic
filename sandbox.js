// sandbox.js

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAJTnnk7RFKaLSvSAfBJBCGKEGcjlXD_sQ",
  authDomain: "slic68.firebaseapp.com",
  projectId: "slic68",
  storageBucket: "slic68.firebasestorage.app",
  messagingSenderId: "227163257971",
  appId: "1:227163257971:web:06f547a209ab3f9b80be06",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

firebase.auth().signInAnonymously().catch(err => console.error(err));

window.addEventListener("message", async (event) => {
  const { action, key, payload } = event.data;

  if (!firebase.auth().currentUser) {
     await new Promise(r => setTimeout(r, 1000));
  }

  try {
    if (action === "getComments") {
      const docRef = db.collection("comments").doc(key);
      const docSnap = await docRef.get();
      const comments = docSnap.exists ? docSnap.data().comments || [] : [];
      event.source.postMessage({ action: "getComments-done", result: comments }, "*");

    } else if (action === "saveComment") {
      const docRef = db.collection("comments").doc(key);
      // Initialize with 0
      const newComment = { ...payload, likes: 0, dislikes: 0 };
      
      await docRef.set({ 
        comments: firebase.firestore.FieldValue.arrayUnion(newComment) 
      }, { merge: true });
      
      event.source.postMessage({ action: "saveComment-done", result: true }, "*");
    
    } else if (action === "voteComment") {
      // payload = { commentId, likeDelta: +1/0/-1, dislikeDelta: +1/0/-1 }
      const docRef = db.collection("comments").doc(key);
      
      await db.runTransaction(async (transaction) => {
        const doc = await transaction.get(docRef);
        if (!doc.exists) return;

        const data = doc.data();
        const comments = data.comments || [];
        const index = comments.findIndex(c => c.id === payload.commentId);
        
        if (index !== -1) {
          if (!comments[index].likes) comments[index].likes = 0;
          if (!comments[index].dislikes) comments[index].dislikes = 0;

          // Apply the changes (deltas) sent from content.js
          comments[index].likes += payload.likeDelta;
          comments[index].dislikes += payload.dislikeDelta;

          // Prevent negative numbers just in case
          if(comments[index].likes < 0) comments[index].likes = 0;
          if(comments[index].dislikes < 0) comments[index].dislikes = 0;

          transaction.update(docRef, { comments: comments });
        }
      });

      event.source.postMessage({ action: "voteComment-done", result: true }, "*");
    }

  } catch (err) {
    console.error(`Error handling ${action}:`, err);
    event.source.postMessage({ action: `${action}-done`, result: false }, "*");
  }
});