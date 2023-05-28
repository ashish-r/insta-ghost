let key = 'isIGGhostModeOn';
iSOn = true;

function savePreferences() {
  if (typeof browser === 'undefined') {
    chrome.storage.sync.set({ [key]: !iSOn }, function () {
      iSOn = !iSOn;
    });
  } else {
    if (!browser.storage.local.set) {
      return;
    }
    browser.storage.local.set({
      [key]: !iSOn,
    });
    iSOn = !iSOn;
  }
}

if (typeof browser === 'undefined') {
  chrome.storage.sync.get([key], function (item) {
    if (item[key] !== false) {
      iSOn = false;
    }
  });
} else {
  if (browser.storage.sync.get) {
    browser.storage.local.get().then(function (item) {
      if (item[key] === false) {
        iSOn = false;
      }
    });
  }
}

function init() {
  if (typeof browser === 'undefined') {
    chrome.webRequest.onBeforeRequest.addListener(
      function (details) {
        return { cancel: iSOn };
      },
      { urls: [
        '*://*.instagram.com/api/graphql/',
        '*://*.instagram.com/api/graphql'
      ] },
      ['blocking']
    );
  } else {
    browser.webRequest.onBeforeRequest.addListener(
      function (details) {
        return { cancel: iSOn };
      },
      { urls: [
        '*://*.instagram.com/api/graphql/',
        '*://*.instagram.com/api/graphql'
      ] },
      ['blocking']
    );
  }
}
init();
