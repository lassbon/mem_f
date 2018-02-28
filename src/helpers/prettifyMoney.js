const prettifyMoney = num =>
  (num + '')
    .split('')
    .reverse()
    .reduce(
      (acc, l, i, arr) =>
        i % 3 === 0 && i !== arr.length - 1 && i !== 0
          ? `${acc},${l}`
          : `${acc}${l}`,
      ''
    )
    .split('')
    .reverse()
    .join('')

export default prettifyMoney
