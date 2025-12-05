// content.js

// ============================================================================
// 1. ROBUST PROFANITY FILTER (Hex Encoded)
// ============================================================================
class Filter {
  constructor() {
    let hexData = "6168306c652c616e75732c617368306c652c617368306c65732c6173686f6c65732c6173732c6173736d6f6e6b65792c617373666163652c61737368306c652c61737368306c7a2c617373686f6c652c617373686f6c65732c617373686f6c7a2c617373776970652c617a7a686f6c652c6261737374657264732c626173746172642c62617374617264732c626173746172647a2c62617374657264732c626173746572647a2c6269617463682c62697463682c626974636865732c626c6f776a6f622c626f6666696e672c62757474686f6c652c62757474776970652c6330636b2c6330636b732c63306b2c6361727065746d756e636865722c6361776b2c6361776b732c636c69742c636e74732c636e747a2c636f636b2c636f636b686561642c636f636b2d686561642c636f636b732c636f636b7375636b65722c636f636b2d7375636b65722c637261702c63756d2c63756e742c63756e74732c63756e747a2c6469636b2c64696c64302c64696c6430732c64696c646f2c64696c646f732c64696c6c64302c64696c6c6430732c646f6d696e61747269636b732c646f6d696e6174726963732c646f6d696e61747269782c64796b652c656e656d612c6620752063206b2c6661672c66616731742c66616765742c6661676731742c6661676769742c666167676f742c66616769742c666167732c6661677a2c666169672c66616967732c666172742c666c697070696e672074686520626972642c6675636b2c6675636b65722c6675636b696e2c6675636b696e672c6675636b732c6675646765207061636b65722c66756b2c66756b61682c66756b656e2c66756b65722c66756b696e2c66756b6b2c66756b6b61682c66756b6b656e2c66756b6b65722c66756b6b696e2c6730306b2c676f642d64616d6e65642c683030722c683061722c683072652c68656c6c732c686f61722c686f6f722c686f6f72652c6a61636b6f66662c6a61702c6a6170732c6a65726b2d6f66662c6a6973696d2c6a6973732c6a697a6d2c6a697a7a2c6b6e6f622c6b6e6f62732c6b6e6f627a2c6b756e742c6b756e74732c6b756e747a2c6c65736269616e2c6c657a7a69616e2c6c697073686974732c6c6970736869747a2c6d61736f63686973742c6d61736f6b6973742c6d617373746572626169742c6d6173737472626169742c6d6173737472626174652c6d61737465726261697465722c6d6173746572626174652c6d617374657262617465732c6d6f746861206675636b65722c6d6f7468612066756b65722c6d6f7468612066756b6b61682c6d6f7468612066756b6b65722c6d6f74686572206675636b65722c6d6f746865722066756b61682c6d6f746865722066756b65722c6d6f746865722066756b6b61682c6d6f746865722066756b6b65722c6d6f746865722d6675636b65722c6d75746861206675636b65722c6d757468612066756b61682c6d757468612066756b65722c6d757468612066756b6b61682c6d757468612066756b6b65722c6e3167722c6e617374742c6e69676765722c6e696775722c6e6970706c652c6e6970706c65732c6f72676173696d2c6f72676173696d732c6f726761736d2c6f726761736d732c7065636b65722c70656e69732c70686f6e657365782c706875636b2c7068756b2c706875712c70696d702c706973732c7069737365642c7069737365722c706973736572732c7069737365732c70697373696e672c706973736f66662c706f6f702c706f726e2c706f726e6f2c706f726e6f6772617068792c707269636b2c707269636b732c707573736965732c70757373792c7075737379732c72656374756d2c7265746172642c72696d6a61772c72696d6d696e672c73206869742c732e6f2e622e2c7361646973742c7363686c6f6e672c7363726577696e672c7363726f74756d2c7365782c736821742c736831742c736861672c736861676765722c7368616767696e2c7368616767696e672c7368656d616c652c736869742c736869746469636b2c73686974652c7368697465642c7368697465792c736869746675636b2c7368697466756c6c2c73686974686561642c73686974696e672c73686974696e67732c73686974732c736869747465642c736869747465722c73686974746572732c7368697474696e672c7368697474696e67732c7368697474792c736b616e6b2c736c75742c736c7574732c736d65676d612c736d75742c736e617463682c736f6e2d6f662d612d62697463682c737061632c7370756e6b2c743174743165352c743174746965732c74656574732c7465657a2c746573746963616c2c7465737469636c652c7469742c7469746675636b2c746974732c746974742c746974746965352c7469747469656675636b65722c746974746965732c74697474796675636b2c746974747977616e6b2c74697477616e6b2c746f737365722c747572642c747761742c74776174732c74776174686561642c7631346772612c76316772612c766167696e612c7669616772612c76756c76612c77306f73652c77616e672c77616e6b2c77616e6b65722c77616e6b792c77686f61722c77686f72652c77696c6c6965732c77696c6c792c7872617465642c787878";
    try {
        let decoded = "";
        for (let i = 0; i < hexData.length; i += 2) {
             decoded += String.fromCharCode(parseInt(hexData.substr(i, 2), 16));
        }
        this.list = decoded.split(',');
    } catch (e) {
        console.error("Filter Error:", e);
        this.list = [];
    }
  }

  isProfane(string) {
    if (!string) return false;
    const words = string.split(/\s+/);
    return words.some(word => {
      const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");
      return this.list.includes(cleanWord);
    });
  }
}

const chatFilter = new Filter();

// ============================================================================
// 2. MAIN EXTENSION LOGIC
// ============================================================================

const iframe = document.createElement("iframe");
iframe.src = chrome.runtime.getURL("sandbox.html");
iframe.style.display = "none";
document.body.appendChild(iframe);

let iframeReady = false;
const messageQueue = [];

iframe.onload = () => {
  iframeReady = true;
  while (messageQueue.length > 0) {
    const { action, key, payload, resolve } = messageQueue.shift();
    postMessageToIframe(action, key, payload, resolve);
  }
};

function postMessageToIframe(action, key, payload, resolve) {
  const listener = (e) => {
    if (e.source === iframe.contentWindow && e.data.action === `${action}-done`) {
      window.removeEventListener("message", listener);
      resolve(e.data.result);
    }
  };
  window.addEventListener("message", listener);
  iframe.contentWindow.postMessage({ action, key, payload }, "*");
}

function sendToSandbox(action, key, payload) {
  return new Promise((resolve) => {
    if (!iframeReady) {
      messageQueue.push({ action, key, payload, resolve });
    } else {
      postMessageToIframe(action, key, payload, resolve);
    }
  });
}

// -------------------- HELPERS -------------------- //
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return seconds + "s ago";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + "m ago";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + "h ago";
  return Math.floor(hours / 24) + "d ago";
}

function getLocalVote(commentId) {
    const votes = JSON.parse(localStorage.getItem("slic-votes") || "{}");
    return votes[commentId] || null;
}

function saveVoteLocally(commentId, type) {
    const votes = JSON.parse(localStorage.getItem("slic-votes") || "{}");
    if (type === null) {
        delete votes[commentId];
    } else {
        votes[commentId] = type;
    }
    localStorage.setItem("slic-votes", JSON.stringify(votes));
}

// -------------------- STYLES -------------------- //
const styles = `
  /* --- Variables --- */
  #slic-comment-section, #slic-minimize-btn {
    --slic-primary: #db2777; 
    --slic-gradient: linear-gradient(135deg, #db2777 0%, #9333ea 100%);
    --slic-vote-up: #10b981; 
    --slic-vote-down: #ef4444; 
    --slic-bg-main: #ffffff;
    --slic-bg-feed: #f8fafc;
    --slic-text-main: #0f172a;
    --slic-text-muted: #64748b;
    --slic-radius: 16px;
    --slic-shadow-float: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  /* --- Global Reset for Slic Components --- */
  #slic-comment-section * {
    box-sizing: border-box !important;
  }

  /* --- Main Container --- */
  #slic-comment-section {
    position: fixed; bottom: 20px; right: 20px; width: 380px; height: 620px;
    background: var(--slic-bg-main); 
    border-radius: var(--slic-radius);
    box-shadow: var(--slic-shadow-float);
    z-index: 2147483647; 
    display: flex; flex-direction: column;
    font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
    font-size: 14px; color: var(--slic-text-main); line-height: 1.5;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: bottom right;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.5);
    box-sizing: border-box !important;
  }

  /* Utility to hide the main box when minimized */
  #slic-comment-section.slic-hidden {
    opacity: 0;
    pointer-events: none;
    transform: scale(0.9) translateY(20px);
  }
  
  /* --- The Minimize Button --- */
  #slic-minimize-btn {
    position: fixed; bottom: 20px; right: 20px;
    width: 56px; height: 56px;
    background: var(--slic-gradient);
    border-radius: 14px; 
    display: flex; justify-content: center; align-items: center;
    color: white; font-weight: 800; font-size: 28px; font-family: 'Times New Roman', serif; 
    font-style: italic;
    cursor: pointer;
    box-shadow: var(--slic-shadow-float);
    z-index: 2147483646; 
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    opacity: 0;
    transform: scale(0.5) rotate(-90deg);
    pointer-events: none;
  }

  #slic-minimize-btn.slic-visible {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    pointer-events: auto;
  }

  #slic-minimize-btn:hover {
    transform: scale(1.1) rotate(-5deg);
    box-shadow: 0 25px 30px -5px rgba(219, 39, 119, 0.4);
  }

  /* --- Header --- */
  #slic-comment-section .slic-header {
    background: #0f172a; color: white; padding: 16px 20px;
    display: flex; justify-content: space-between; align-items: center; 
    font-weight: 700; cursor: move;
  }
  
  #slic-comment-section .slic-tabs { 
    display: flex; background: rgba(255,255,255,0.1); border-radius: 20px; padding: 3px; 
    backdrop-filter: blur(4px);
  }
  
  #slic-comment-section .slic-tab-btn {
    background: transparent; border: none; color: rgba(255,255,255,0.6);
    padding: 5px 14px; cursor: pointer; font-size: 12px; font-weight: 600; 
    border-radius: 16px; transition: all 0.3s;
  }
  
  #slic-comment-section .slic-tab-btn.active { 
    background: var(--slic-primary); color: white; box-shadow: 0 2px 10px rgba(219, 39, 119, 0.4);
  }
  
  #slic-comment-section .slic-close-btn { 
    background: none; border: none; color: rgba(255,255,255,0.5); 
    font-size: 20px; cursor: pointer; padding: 0 0 0 12px; transition: color 0.2s;
  }
  #slic-comment-section .slic-close-btn:hover { color: white; }

  /* --- Feed --- */
  #slic-comment-section .slic-feed {
    flex: 1; overflow-y: auto; padding: 20px; background: var(--slic-bg-feed);
    scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent;
  }
  
  /* --- Comments --- */
  .slic-comment { 
    background: white; padding: 14px 16px; margin-bottom: 12px; border-radius: 12px; 
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: transform 0.2s;
  }
  .slic-comment:hover { transform: translateY(-2px); }

  .slic-comment-meta { font-size: 11px; color: var(--slic-text-muted); margin-bottom: 6px; display: flex; justify-content: space-between; }
  .slic-author { font-weight: 700; color: var(--slic-text-main); font-size: 13px; }
  .slic-text { font-size: 14px; margin-bottom: 8px; color: #334155; }
  
  /* --- Actions --- */
  .slic-actions { display: flex; gap: 16px; align-items: center; margin-top: 8px;}
  .slic-reply-btn { background: none; border: none; color: var(--slic-text-muted); font-size: 11px; font-weight: 600; cursor: pointer; padding: 0; text-transform: uppercase; }
  .slic-reply-btn:hover { color: var(--slic-primary); }
  
  .slic-vote-group { display: flex; gap: 6px; align-items: center; background: #f1f5f9; padding: 4px 8px; border-radius: 8px; }
  .slic-vote-btn { background: none; border: none; cursor: pointer; font-size: 12px; padding: 0; color: #94a3b8; transition: transform 0.2s; }
  .slic-vote-btn:hover { transform: scale(1.2); }
  
  .slic-vote-btn.up.voted { color: var(--slic-vote-up); } 
  .slic-vote-btn.down.voted { color: var(--slic-vote-down); } 

  /* --- THREADING --- */
  .slic-thread { 
    margin-left: 20px; 
    padding-left: 15px; 
    border-left: 3px solid #e2e8f0; 
    margin-top: 5px; 
  }
  .slic-thread:hover { border-left-color: var(--slic-primary); }

  /* --- Footer & INPUT RESET --- */
  #slic-comment-section .slic-footer { padding: 16px 20px; background: #fff; border-top: 1px solid #f1f5f9; }
  .slic-user-row { display: flex; gap: 10px; margin-bottom: 12px; align-items: center; }
  
  /* --- BULLETPROOF INPUT STYLES (Overrides website CSS) --- */
  .slic-input-name { 
    flex: 1; 
    border: 1px solid #e2e8f0 !important; 
    border-radius: 8px !important; 
    padding: 8px 12px !important; 
    font-size: 12px !important; 
    background: #f8fafc !important; 
    color: #0f172a !important;
    font-family: inherit !important;
    box-shadow: none !important;
    margin: 0 !important;
    line-height: normal !important;
  }
  
  .slic-textarea { 
    width: 100% !important; 
    height: 70px !important; 
    border: 1px solid #e2e8f0 !important; 
    border-radius: 10px !important; 
    padding: 12px !important; 
    background: #f8fafc !important; 
    resize: none !important; 
    font-family: inherit !important; 
    color: #0f172a !important;
    box-shadow: none !important;
    margin: 0 !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
  }
  
  .slic-textarea:focus, .slic-input-name:focus { 
    background: white !important; 
    border-color: var(--slic-primary) !important; 
    outline: none !important; 
  }
  
  .slic-submit-btn { 
    margin-top: 12px; width: 100%; background: var(--slic-gradient); color: white; 
    border: none; padding: 12px; border-radius: 10px; font-weight: 700; cursor: pointer; 
    text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 12px rgba(219, 39, 119, 0.25);
    transition: transform 0.1s;
    font-size: 12px !important;
  }
  .slic-submit-btn:hover { transform: translateY(-2px); }
  
  .slic-replying-to { font-size: 11px; color: var(--slic-primary); display: none; margin-bottom: 6px; }
  .slic-cancel-reply { cursor: pointer; margin-left: 5px; opacity: 0.7; }
`;

// -------------------- LOGIC -------------------- //
async function createCommentBox() {
  if (document.getElementById("slic-comment-section")) return;

  const styleTag = document.createElement("style");
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);

  // Minimize Button
  const minimizeBtn = document.createElement("div");
  minimizeBtn.id = "slic-minimize-btn";
  minimizeBtn.textContent = "S"; 
  document.body.appendChild(minimizeBtn);

  // Main Container
  const container = document.createElement("div");
  container.id = "slic-comment-section";
  
  container.innerHTML = `
    <div class="slic-header">
      <span>Slic Chat</span>
      <div class="slic-tabs">
        <button class="slic-tab-btn active" data-tab="domain">Domain</button>
        <button class="slic-tab-btn" data-tab="page">Page</button>
      </div>
      <button class="slic-close-btn">✕</button>
    </div>
    <div class="slic-feed" id="slic-feed">
      </div>
    <div class="slic-footer">
      <div class="slic-replying-to" id="slic-reply-indicator">
        Replying to comment... <span class="slic-cancel-reply">Cancel</span>
      </div>
      <div class="slic-user-row">
        <input type="text" id="slic-username" class="slic-input-name" placeholder="Enter your name..." />
      </div>
      <div class="slic-input-wrap">
        <textarea id="slic-text" class="slic-textarea" placeholder="What are your thoughts?"></textarea>
      </div>
      <button id="slic-submit" class="slic-submit-btn">Comment</button>
    </div>
  `;

  document.body.appendChild(container);

  const feed = document.getElementById("slic-feed");
  const closeBtn = container.querySelector(".slic-close-btn");
  const tabBtns = container.querySelectorAll(".slic-tab-btn");
  const nameInput = document.getElementById("slic-username");
  const textInput = document.getElementById("slic-text");
  const submitBtn = document.getElementById("slic-submit");
  const replyIndicator = document.getElementById("slic-reply-indicator");
  const cancelReplyBtn = container.querySelector(".slic-cancel-reply");

  let currentTab = "domain";
  let replyingToId = null;

  let isDragging = false, offsetX, offsetY;
  const header = container.querySelector(".slic-header");
  header.addEventListener("mousedown", (e) => {
    if(e.target.tagName === 'BUTTON') return;
    isDragging = true;
    offsetX = e.clientX - container.offsetLeft;
    offsetY = e.clientY - container.offsetTop;
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      container.style.left = `${e.clientX - offsetX}px`;
      container.style.top = `${e.clientY - offsetY}px`;
    }
  });
  document.addEventListener("mouseup", () => isDragging = false);

  const savedName = localStorage.getItem("slic-username");
  if (savedName) nameInput.value = savedName;

  // Minimize Logic
  closeBtn.onclick = () => {
      container.classList.add("slic-hidden");
      minimizeBtn.classList.add("slic-visible");
  };
  minimizeBtn.onclick = () => {
      container.classList.remove("slic-hidden");
      minimizeBtn.classList.remove("slic-visible");
  };

  tabBtns.forEach(btn => {
    btn.onclick = () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentTab = btn.dataset.tab;
      loadComments();
    };
  });

  // Reply Cancel Logic
  cancelReplyBtn.onclick = () => {
    replyingToId = null;
    replyIndicator.style.display = "none";
    textInput.placeholder = "What are your thoughts?";
  };

  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("slic-username", e.target.value.trim());
  });

  submitBtn.onclick = async () => {
    const author = nameInput.value.trim();
    const text = textInput.value.trim();

    if (!author) {
      alert("Please enter a name first.");
      nameInput.focus();
      return;
    }
    if (!text) return;

    const isBadText = chatFilter.isProfane(text);
    const isBadAuthor = chatFilter.isProfane(author);

    if (isBadText || isBadAuthor) {
        textInput.classList.add("slic-error-shake");
        if (isBadAuthor) {
             nameInput.classList.add("slic-error-shake");
             alert("Username contains not allowed words.");
        } else {
             alert("Comment blocked: Language not allowed.");
        }
        setTimeout(() => {
            textInput.classList.remove("slic-error-shake");
            nameInput.classList.remove("slic-error-shake");
        }, 1000);
        return;
    }

    localStorage.setItem("slic-username", author);
    submitBtn.disabled = true;
    submitBtn.innerText = "Posting...";

    const newComment = {
      id: generateId(),
      parentId: replyingToId, // Ensures threading works
      author: author,
      text: text,
      timestamp: Date.now()
    };

    const key = getKey();
    const result = await sendToSandbox("saveComment", key, newComment);

    if (result) {
      textInput.value = "";
      replyingToId = null;
      replyIndicator.style.display = "none";
      textInput.placeholder = "What are your thoughts?";
      await loadComments();
    } else {
      alert("Failed to post.");
    }
    submitBtn.disabled = false;
    submitBtn.innerText = "Comment";
  };

  function getKey() {
    const url = new URL(window.location.href);
    const domain = url.hostname;
    const sanitize = (str) => encodeURIComponent(str).replace(/\./g, '_');
    if (currentTab === "domain") return `domain_${sanitize(domain)}`;
    return `page_${sanitize(domain + url.pathname)}`;
  }

  async function loadComments() {
    feed.innerHTML = '<div style="text-align:center; padding:20px; color:#888;">Loading...</div>';
    const comments = await sendToSandbox("getComments", getKey());
    const validComments = comments.filter(c => typeof c === 'object');

    if (validComments.length === 0) {
      feed.innerHTML = '<div style="text-align:center; padding:20px; color:#888;">No comments yet. Be the first!</div>';
      return;
    }

    const commentTree = buildTree(validComments);
    feed.innerHTML = "";
    commentTree.forEach(node => {
      feed.appendChild(createCommentNode(node));
    });
  }

  function buildTree(comments) {
    const map = {};
    const roots = [];
    comments.sort((a, b) => a.timestamp - b.timestamp);
    comments.forEach(c => { map[c.id] = { ...c, children: [] }; });
    comments.forEach(c => {
      if (c.parentId && map[c.parentId]) {
        map[c.parentId].children.push(map[c.id]);
      } else {
        roots.push(map[c.id]);
      }
    });
    return roots;
  }

  function createCommentNode(data) {
    const el = document.createElement("div");
    
    // --- THREADING LOGIC ---
    const isReply = !!data.parentId;
    if(isReply) {
        el.className = "slic-thread"; 
    }
    
    const commentCard = document.createElement("div");
    commentCard.className = "slic-comment";
    
    const likes = data.likes || 0;
    const dislikes = data.dislikes || 0;

    commentCard.innerHTML = `
      <div class="slic-comment-meta">
        <span class="slic-author">${data.author}</span>
        <span>${timeSince(new Date(data.timestamp))}</span>
      </div>
      <div class="slic-text">${data.text}</div>
      <div class="slic-actions">
        <button class="slic-reply-btn" data-id="${data.id}" data-author="${data.author}">Reply</button>
        <div class="slic-vote-group">
            <button class="slic-vote-btn up" title="Like">▲</button>
            <span class="slic-like-count">${likes}</span>
            <button class="slic-vote-btn down" title="Dislike">▼</button>
            <span class="slic-dislike-count">${dislikes}</span>
        </div>
      </div>
    `;

    // Reply Handler
    commentCard.querySelector(".slic-reply-btn").onclick = () => {
      replyingToId = data.id;
      replyIndicator.style.display = "block";
      replyIndicator.innerHTML = `Replying to <b>${data.author}</b> <span class="slic-cancel-reply" style="cursor:pointer; text-decoration:underline; margin-left:5px;">Cancel</span>`;
      
      // Re-attach cancel listener
      replyIndicator.querySelector(".slic-cancel-reply").onclick = () => {
        replyingToId = null;
        replyIndicator.style.display = "none";
      };
      
      textInput.focus();
      textInput.placeholder = `Replying to ${data.author}...`;
    };

    // Voting Logic
    const upBtn = commentCard.querySelector(".slic-vote-btn.up");
    const downBtn = commentCard.querySelector(".slic-vote-btn.down");
    const likeCountSpan = commentCard.querySelector(".slic-like-count");
    const dislikeCountSpan = commentCard.querySelector(".slic-dislike-count");

    const currentVote = getLocalVote(data.id);
    if (currentVote === 'like') upBtn.classList.add("voted");
    if (currentVote === 'dislike') downBtn.classList.add("voted");

    const handleVote = async (clickType) => {
        const myVote = getLocalVote(data.id);
        let likeDelta = 0, dislikeDelta = 0, newVoteState = null;

        if (clickType === 'like') {
            if (myVote === 'like') {
                likeDelta = -1; newVoteState = null;
                upBtn.classList.remove("voted");
                likeCountSpan.innerText = parseInt(likeCountSpan.innerText) - 1;
            } else if (myVote === 'dislike') {
                likeDelta = 1; dislikeDelta = -1; newVoteState = 'like';
                downBtn.classList.remove("voted"); upBtn.classList.add("voted");
                likeCountSpan.innerText = parseInt(likeCountSpan.innerText) + 1;
                dislikeCountSpan.innerText = parseInt(dislikeCountSpan.innerText) - 1;
            } else {
                likeDelta = 1; newVoteState = 'like';
                upBtn.classList.add("voted");
                likeCountSpan.innerText = parseInt(likeCountSpan.innerText) + 1;
            }
        } else if (clickType === 'dislike') {
            if (myVote === 'dislike') {
                dislikeDelta = -1; newVoteState = null;
                downBtn.classList.remove("voted");
                dislikeCountSpan.innerText = parseInt(dislikeCountSpan.innerText) - 1;
            } else if (myVote === 'like') {
                likeDelta = -1; dislikeDelta = 1; newVoteState = 'dislike';
                upBtn.classList.remove("voted"); downBtn.classList.add("voted");
                likeCountSpan.innerText = parseInt(likeCountSpan.innerText) - 1;
                dislikeCountSpan.innerText = parseInt(dislikeCountSpan.innerText) + 1;
            } else {
                dislikeDelta = 1; newVoteState = 'dislike';
                downBtn.classList.add("voted");
                dislikeCountSpan.innerText = parseInt(dislikeCountSpan.innerText) + 1;
            }
        }

        saveVoteLocally(data.id, newVoteState);
        if (likeDelta !== 0 || dislikeDelta !== 0) {
             await sendToSandbox("voteComment", getKey(), {
                commentId: data.id,
                likeDelta: likeDelta,
                dislikeDelta: dislikeDelta
            });
        }
    };

    upBtn.onclick = () => handleVote('like');
    downBtn.onclick = () => handleVote('dislike');

    el.appendChild(commentCard);

    if (data.children && data.children.length > 0) {
      data.children.forEach(child => {
        el.appendChild(createCommentNode(child));
      });
    }

    return el;
  }

  loadComments();
}

createCommentBox();

chrome.runtime.onMessage.addListener(msg => {
  if (msg.action === "showComments") createCommentBox();
});