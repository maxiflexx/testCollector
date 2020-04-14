const schedule = require('node-schedule');
const Response = require('../response/response');
const RESPONSE_CODE = require('../response/responseCode');
const crawler = require('../crawler/crawler');
const lib = require('../utils/lib');
const state = require('../utils/state');
const config = require('../config/app.config');
const Producer = require('../kafka/producer');

const kafkaProducer = new Producer();
kafkaProducer.init();

class ApiController {
    start (req, res) {
        if (!lib.isAvailCurrency(req.params.currency)) {
            return res.status(400).json(new Response(RESPONSE_CODE.FAIL, 'Invailed currency', null));
        } else if(state[req.params.currency.toUpperCase()].active) {
            return res.status(200).json(new Response(RESPONSE_CODE.ALREADY_RUNNING, 'Already running', null));
        };
        try {
            state[req.params.currency.toUpperCase()].active = true;
            let url = config.job.url.replace('{currency}', req.params.currency);
            let jobName = lib.jobName(req.params.currency);
            schedule.scheduleJob(jobName, config.job.schedule, async () => {
                let result = await crawler.getData(url);
                let message = lib.extractor(result, req.params.currency);
                let topicName = lib.topicName(req.params.currency)
                let payloads = [{
                    topic: topicName,
                    messages: JSON.stringify(message)
                }];
                kafkaProducer.sendMessage(payloads, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    };
                });
                state[req.params.currency.toUpperCase()].count += 1;
            });
            res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Running successfully', null));
        } catch (err) {
            return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'Crawler failed', err));
        };
    };

    stop (req, res) {
        if (!lib.isAvailCurrency(req.params.currency)) {
            return res.status(400).json(new Response(RESPONSE_CODE.FAIL, 'Invailed currency', null));
        } else if(!state[req.params.currency.toUpperCase()].active) {
            return res.status(200).json(new Response(RESPONSE_CODE.ALREADY_RUNNING, 'Already stopped', null));
        };
        try {
            state[req.params.currency.toUpperCase()].active = false;
            let jobName = lib.jobName(req.params.currency);
            schedule.cancelJob(jobName);
            return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'stopped successfully', null));
        } catch (err) {
            return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'Crawler failed', err));
        };
    };

    stat(req, res) {
        if (!lib.isAvailCurrency(req.params.currency)) {
            return res.status(400).json(new Response(RESPONSE_CODE.FAIL, 'Invailed currency', null));
        };
        try {
            return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'stat', state[req.params.currency.toUpperCase()]));
        } catch (err) {
            return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'Crawler failed', err));
        };
    };
};

module.exports = new ApiController();