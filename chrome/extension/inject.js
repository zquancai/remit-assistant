const temp = document.createElement('script');
temp.setAttribute('type', 'text/javascript');
temp.innerText = `
window.addEventListener('message', ({ data }) => {
  if (data.cmd === 'get-currency') {
    window.postMessage({
      cmd: 'get-currency-response',
      data: window.currencyObj,
    }, '*');
  }
});
`;
temp.onload = () => {
  temp.remove();
};
document.head.appendChild(temp);

window.addEventListener('message', ({ data }) => {
  // console.log(data, findRates(data));
  if (data.cmd === 'get-currency-response') {
    const mockData = [
      { limit: 0, rangeRate: 5.201 },
      { limit: 1000, rangeRate: 5.192 },
      { limit: 3000, rangeRate: 5.181 },
      { limit: 5000, rangeRate: 5.16 },
      { limit: 10000, rangeRate: 5.14 }
    ];
    chrome.runtime.sendMessage({
      cmd: 'get-currency-response',
      // data: mockData
      data: data.data,
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd === 'get-currency') {
    window.postMessage(
      {
        cmd: 'get-currency'
      },
      '*'
    );
    sendResponse();
  }
});
