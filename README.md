# Slic | Comment Everywhere 💬

![Version](https://img.shields.io/badge/version-1.6-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-available-4285F4?logo=google-chrome&logoColor=white)

**Slic** is a lightweight Chrome Extension that turns the entire internet into a discussion board. It injects a clean, non-intrusive chat sidebar into any website you visit, allowing you to connect with other users browsing the same content instantly.

[**👉 Download from Chrome Web Store**](https://chromewebstore.google.com/detail/slic-comment-section/pjmoebejmcbbdgbchmnfdanncfdejppl?hl=en-US&utm_source=ext_sidebar)

---

## ✨ Features

* **🌍 Universal Chat:** Works on any URL—from YouTube videos to Wikipedia articles.
* **📑 Context Aware:**
    * **Page Mode:** Chat specifically about the exact URL you are viewing.
    * **Domain Mode:** Chat with everyone on the entire website (e.g., all users on `reddit.com`).
* **🆔 Stable Identity:** No login required. Generates a unique, anonymous tag (e.g., `XY#1234`) based on your browser profile that persists across reloads and browser restarts.
* **🔒 Secure & Safe:**
    * **XSS Protection:** Strict sanitization blocks all HTML, CSS, and JS injection.
    * **Profanity Filter:** Built-in robust hex-encoded filter to keep chats clean.
    * **Ownership:** You can delete your own comments and threads.
* **⚡ Real-time:** Powered by Firebase Firestore for instant updates.

---


## 🛠️ Architecture & Security

### How it works
1.  **Identity:** The extension uses `chrome.identity` and `chrome.storage.sync` to create a stable, anonymous User ID for you. This ID travels with your Chrome Profile, so your username tag persists across devices.
2.  **Database:** Messages are stored in **Firebase Firestore**.
    * **Reads:** Publicly readable (anyone can see comments).
    * **Writes:** Restricted. Users can only write comments signed with their stable ID.
    * **Deletes:** Protected via Transaction. Only the creator of a comment (verified by Stable ID) can delete it.
3.  **Isolation:** All database logic runs inside a **Sandboxed Iframe** (`sandbox.html`). This ensures that even if the database were compromised, it cannot access the webpage's DOM or your cookies.

### Permissions Explained
* `storage`: To save your settings and Stable ID.
* `identity`: To generate a unique, consistent ID rooted in your Google Profile (without accessing personal info).
* `host_permissions (<all_urls>)`: Required to inject the chat sidebar interface into whatever site you visit. **Slic does NOT read page content.**

---

## 🛡️ Privacy Policy

Slic is designed with privacy as a priority:
* **No Tracking:** We do not track your browsing history. We only look at the current URL hash to load the correct chat room.
* **No Personal Data:** We do not collect names, emails, or passwords. Your identity is a random numeric hash.
* **Content Isolation:** Slic cannot read the text, emails, or passwords on the pages you visit.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

### License
Distributed under the MIT License. See `LICENSE` for more information.
