// sandbox.js

// Firebase Config
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

// Wait for Auth to be ready
const authReady = new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) resolve(user);
        else firebase.auth().signInAnonymously().catch(console.error);
    });
});

// Helper: Generate Readable Tag (e.g. AB#1234)
async function generateReadableTag(name) {
    const parts = name.trim().split(/\s+/);
    let initials = "XX";
    if (parts.length >= 2) {
        initials = (parts[0][0] + parts[1][0]).toUpperCase();
    } else if (parts.length === 1 && parts[0].length > 0) {
        initials = (parts[0][0] + "X").toUpperCase();
    }

    let isUnique = false;
    let tag = "";
    let attempts = 0;
    
    // Try to find a unique tag
    while (!isUnique && attempts < 10) {
        const randomNum = Math.floor(1000 + Math.random() * 9000); // 1000-9999
        tag = `${initials}#${randomNum}`;
        
        // Check global uniqueness
        const query = await db.collection("users").where("tag", "==", tag).get();
        if (query.empty) isUnique = true;
        attempts++;
    }
    return tag;
}

window.addEventListener("message", async (event) => {
  const { action, key, payload } = event.data;
  await authReady; // Ensure connection

  try {
    // KEY CHANGE: usage of payload.userId (The Stable ID)
    const stableUserId = payload ? payload.userId : null;

    if (action === "getComments") {
      const docRef = db.collection("comments").doc(key);
      const docSnap = await docRef.get();
      const comments = docSnap.exists ? docSnap.data().comments || [] : [];
      event.source.postMessage({ action: "getComments-done", result: comments }, "*");

    } else if (action === "getMyTag") {
        if (!stableUserId) {
             event.source.postMessage({ action: "getMyTag-done", result: null }, "*");
             return;
        }
        // Look up the User Doc by the STABLE ID
        const userDoc = await db.collection("users").doc(stableUserId).get();
        const tag = userDoc.exists ? userDoc.data().tag : null;
        event.source.postMessage({ action: "getMyTag-done", result: tag }, "*");

    } else if (action === "saveComment") {
      const docRef = db.collection("comments").doc(key);
      
      // 1. Get or Create Tag using Stable ID
      const userDocRef = db.collection("users").doc(stableUserId);
      const userDocSnap = await userDocRef.get();

      let userTag = "";
      if (userDocSnap.exists) {
          // Returning user: Use existing tag
          userTag = userDocSnap.data().tag;
      } else {
          // New user: Generate new Tag and Link it to Stable ID
          userTag = await generateReadableTag(payload.author);
          await userDocRef.set({ 
              tag: userTag, 
              createdAt: firebase.firestore.Timestamp.now()
          });
      }

      // 2. Save Comment with ownerId
      const newComment = { 
          ...payload, 
          userTag: userTag, 
          ownerId: stableUserId, // Ownership verification
          likes: 0, 
          dislikes: 0 
      };
      
      await docRef.set({ 
        comments: firebase.firestore.FieldValue.arrayUnion(newComment) 
      }, { merge: true });
      
      event.source.postMessage({ action: "saveComment-done", result: { success: true, userTag } }, "*");
    
    } else if (action === "deleteComment") {
        const docRef = db.collection("comments").doc(key);
        
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            if (!doc.exists) return;

            let comments = doc.data().comments || [];
            
            // VERIFY OWNERSHIP: Does comment.ownerId match current user's Stable ID?
            const target = comments.find(c => c.id === payload.commentId);
            if (!target) return;
            if (target.ownerId !== stableUserId) return; // Silent fail if not owner

            // Recursive Deletion Logic
            const idsToDelete = new Set([payload.commentId]);
            let added = true;
            
            while(added) {
                added = false;
                comments.forEach(c => {
                    if (!idsToDelete.has(c.id) && idsToDelete.has(c.parentId)) {
                        idsToDelete.add(c.id);
                        added = true;
                    }
                });
            }

            const newComments = comments.filter(c => !idsToDelete.has(c.id));
            transaction.update(docRef, { comments: newComments });
        });

        event.source.postMessage({ action: "deleteComment-done", result: true }, "*");

    } else if (action === "voteComment") {
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

          comments[index].likes += payload.likeDelta;
          comments[index].dislikes += payload.dislikeDelta;

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