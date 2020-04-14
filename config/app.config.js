module.exports = {
    port: 3000,
    job: {
        schedule: '0 */1 * * * *',
        url: 'http://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-{currency}&count=1'
    },
    currencyList: ['BTC', 'ETH', 'XRP', 'EOS'],
    kafkaHost: "192.168.99.100:9092"
}