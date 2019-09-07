const findRates = (currencyObj, currency) => {
  const ret = Object.values(currencyObj).filter(item => item.code === currency);
  if (!ret) {
    throw new Error(`not found ${currency}`);
  }
  const exchangeRates = ret[0].exchange_rates.map(rate => ({
    limit: parseInt(rate.minimum_range_limit),
    rangeRate: parseFloat(rate.range_rate)
  }));
  return exchangeRates
    .map(rate => {
      return {
        limit: rate.limit,
        rangeRate: rate.rangeRate
      };
    })
    .filter(rate => !!rate);
};

export const sendMessageToContentScript = message => {
  return new Promise(resulve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.cmd === `${message.cmd}-response`) {
        const currencies = Object.values(request.data).map(d => d.code);
        const currency = message.data.currency || currencies[0];
        resulve({
          currencies: currencies,
          currency,
          rates: findRates(request.data, currency),
        });
      }
      sendResponse();
    });
  });
};
