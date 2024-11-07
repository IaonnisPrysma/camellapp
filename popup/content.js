// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getPageInfo") {
        const pageInfo = {
            url: window.location.href,
            title: document.title
        };
        sendResponse(pageInfo);
    }
});

console.log("Content script loaded");
