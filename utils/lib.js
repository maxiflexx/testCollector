const config = require('../config/app.config');

module.exports = {
    isAvailCurrency: (currency) => {
        return config.currencyList.includes(currency.toUpperCase());
    },
    jobName: (currency) => {
        return 'job' + currency.toUpperCase();
    },
    topicName: (currency) => {
        return 'crawler-' + currency.toUpperCase();
    },
    extractor: (data, currency) => {
        return {
            code: currency,
            date: data[0].candleDateTime,
            openingPrice: data[0].openingPrice,
            highPrice: data[0].highPrice,
            lowPrice: data[0].lowPrice,
            tradePrice: data[0].tradePrice
        };
    }
};