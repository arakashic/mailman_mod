const searchId = "mailmanSearchArchive"
const searchName = "Search in HPC-Announce Archive"
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: searchId,
    title: searchName,
    contexts: ["selection"],
  });
});

// let iframeLoaded = false;

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === searchId) {
    const selectedText = info.selectionText;
    const searchUrl = "https://lists.mcs.anl.gov/pipermail/hpc-announce/";

    chrome.tabs.create({ url: "https://lists.mcs.anl.gov/pipermail/hpc-announce" , active: false}, (newTab) => {
      chrome.scripting.executeScript({
        target: { tabId: newTab.id },
        func: (keyword) => {
          const form = document.querySelector("form");
          form.querySelector('input[name="words"]').value = keyword;
          form.querySelector('select[name="sort"]').value = "time";
          form.submit();
        },
        args: [selectedText]
      });
    });

    // chrome.scripting.executeScript({
    //   target: { tabId: tab.id },
    //   func: (keyword) => {
    //     if (window.iframeLoaded) return;
    //     window.iframeLoaded = true
    //
    //     const iframe = document.createElement("iframe");
    //     iframe.src = "https://lists.mcs.anl.gov/pipermail/hpc-announce";
    //     iframe.style.width = "50%";
    //     iframe.style.height = "50%";
    //     document.body.innerHTML = "";
    //     document.body.appendChild(iframe);
    //
    //     iframe.addEventListener("load", () => {
    //       const form = iframe.contentDocument.querySelector("form");
    //       form.querySelector('input[name="words"]').value = keyword;
    //       form.querySelector('select[name="sort"]').value = "time";
    //       form.submit();
    //     });
    //   },
    //   args: [selectedText]
    // });
  }
});
