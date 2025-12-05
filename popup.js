const iframe = document.getElementById("iframe");

document.getElementById("init").onclick = () => {
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({ action: "init" }, "*");
    console.log("Init message sent to sandbox");
  }
};
