module.exports = {
    extraction: (data) => {
        return {
            code: data[0].code,
            date: data[0].candleDateTime,
            openingPrice: data[0].openingPrice,
            highPrice: data[0].highPrice,
            rowPrice: data[0].rowPrice,
            tradePrice: data[0].tradePrice
        }
    }
}