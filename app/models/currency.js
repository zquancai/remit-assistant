import { sendMessageToContentScript } from '../utils/message';

export default {
  namespace: 'currency',
  state: {
    rates: [],
    spinning: true,
    currencies: [],
    currency: '',
  },
  reducers: {
    load(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    *updateRates({ payload }, { put, call }) {
      yield put({
        type: 'load',
        payload: {
          spinning: true,
          currency: payload && payload.currency,
        }
      });
      const { currencies, rates, currency } = yield call(sendMessageToContentScript, {
        cmd: 'get-currency',
        data: {
          currency: payload && payload.currency,
        }
      });
      const newRates = rates
        .map((rate, index) => {
          const nextRate = rates[index + 1];
          if (!nextRate) {
            return null;
          }
          return {
            limit: nextRate.limit,
            rangeRate: rate.rangeRate
          };
        })
        .filter(rate => !!rate);
      const last = rates[rates.length - 1];
      for (
        let amount = last.limit + 1000;
        amount <= 50000;
        amount = amount + 1000
      ) {
        newRates.push({
          limit: amount,
          rangeRate: last.rangeRate
        });
      }
      yield put({
        type: 'load',
        payload: {
          rates: newRates,
          spinning: false,
          currencies,
          currency,
        }
      });
    }
  }
};
