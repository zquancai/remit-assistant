const calc = (rates, value, temp = [], result = []) => {
  for (let i = 0; i < rates.length; i++) {
    const rate = rates[i];
    const { limit } = rate;
    const nextValue = value - limit;
    if (temp.length === 0 || temp[temp.length - 1].limit <= rate.limit) {
      if (nextValue > 0) {
        calc(rates, nextValue, [...temp, rate], result);
      } else if (nextValue === 0) {
        result.push([...temp, rate]);
      }
    }
  }
};

export const getBestRemittance = (rates, amount) => {
  let result = [];
  calc(rates, amount, [], result);
  // console.log(result);
  const remitResult = result
    .map((item, index) => {
      const fee = 18 * item.length;
      const remitCash = item
        .map(rate => rate.limit)
        .reduce((sum, num) => sum + num);
      const remitTargetCash = item
        .map(rate => rate.limit * rate.rangeRate)
        .reduce((sum, num) => sum + num);
      return {
        resultRate: remitTargetCash / (fee + remitCash),
        item
      };
    })
    .sort((a, b) => b.resultRate - a.resultRate);
  return remitResult[0];
};
