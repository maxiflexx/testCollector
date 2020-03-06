const cryptoCrawler = require('../crawler/crawlerData');
const Response = require('../utils/response');
const constants = require('../utils/constants');
const config = require('../utils/app.config');
let crytoState = require('../utils/schedulerState');
let schedule = require('node-schedule');

let RESPONSE_CODE = constants.STATUS_CODE;
let scheduler = {};
var url = '';

// 주기적으로 함수를 cryptoCrawler.getData를 호출한다.
scheduler.start = (req, res) => {
    // 체크
    if (!isAvailCurrency(req.params.currency)) {
        return res.status(400).json(new Response(RESPONSE_CODE.FAIL, 'invailed currency', null))
    }

    if (crytoState[req.params.currency.toUpperCase()].active) {
        return res.status(200).json(new Response(RESPONSE_CODE.ALREADY_RUNNING, 'already runnig', null));

    }
    try {
        crytoState[req.params.currency.toUpperCase()].active = true;
        url = config.job.url.replace('{currency}', req.params.currency);
        schedule.scheduleJob(jobName(req.params.currency), config.job.schedule, async () => {
            let result = await cryptoCrawler.getData(url);
            crytoState[req.params.currency.toUpperCase()].count += 1;
            console.log(crytoState[req.params.currency.toUpperCase()].count)
            // 큐에 넣기
        });
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'running successfully', null));
    } catch(error) {
        // 에러 처리
        console.log(error)
        return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'crawler failed', error));
    }
}

scheduler.stop = (req, res) => {
    if (!isAvailCurrency(req.params.currency)) {
        return res.status(400).json(new Response(RESPONSE_CODE.FAIL, 'invailed currency', null))
    }

    if (crytoState[req.params.currency.toUpperCase()].active) { 
        crytoState[req.params.currency.toUpperCase()].active = false;
        schedule.cancelJob(jobName(req.params.currency));
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'stopped successfully', null));
    } else {
        return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'already stop', null));
    }
}

scheduler.stat = (req, res) => {
    if (!isAvailCurrency(req.params.currency)) {
        return res.status(400).json(new Response(RESPONSE_CODE.FAIL, 'invailed currency', null))
    }
    return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'stat', crytoState[req.params.currency.toUpperCase()]));
}

// 유효성 체크
function isAvailCurrency(currency) {
    return config.currencyList.includes(currency.toUpperCase());
}

function jobName(currency) {
    return 'job' + currency.toUpperCase();
}

module.exports = scheduler;