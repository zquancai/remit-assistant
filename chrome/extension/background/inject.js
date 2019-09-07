function isInjected(tabId) {
  return chrome.tabs.executeScriptAsync(tabId, {
    code: `var injected = window.changchengRemitInjected;
      window.changchengRemitInjected = true;
      injected;`,
    runAt: 'document_start'
  });
}

function loadScript(name, tabId) {
  if (process.env.NODE_ENV === 'production') {
    return chrome.tabs.executeScriptAsync(tabId, {
      file: `/js/${name}.bundle.js`,
      runAt: 'document_end'
    });
  } else {
    // dev: async fetch bundle
    return fetch(`http://localhost:3000/js/${name}.bundle.js`)
      .then(res => res.text())
      .then(fetchRes => {
        return chrome.tabs.executeScriptAsync(tabId, {
          code: fetchRes,
          runAt: 'document_end'
        });
      }
      );
  }
}

// const arrowURLs = ['^https://remit.zgr.sg/*'];
const arrowURLs = ['^https://www.cnblogs.com/*', 'https://remit.zgr.sg/*'];

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'loading' || !tab.url.match(arrowURLs.join('|')))
    return;

  const result = await isInjected(tabId);
  console.log(result, '===');
  if (chrome.runtime.lastError || result[0]) return;

  console.log('start inject');
  const ret = await loadScript('inject', tabId);
  console.log(ret, '===');
});
