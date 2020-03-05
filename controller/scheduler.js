const cryptoCrawler = require('../crawler/crawlerData');
const Response = require('../utils/response');
const constants = require('../utils/constants');
let state = require('../utils/schedulerState');
let schedule = require('node-schedule');
let RESPONSE_CODE = constants.STATUS_CODE;
let scheduler = {};
var job = 'job';

// 주기적으로 함수를 cryptoCrawler.getData를 호출한다.
scheduler.start = (req, res) => {
    if (state.active) {
        res.status(200).json(new Response(RESPONSE_CODE.ALREADY_RUNNING, 'already runnig', null));
    }
    try {
        state.active = true;
        schedule.scheduleJob(job, '*/10 * * * * *', async () => {
            let result = await cryptoCrawler.getData();

            // 큐에 넣기
        });
        res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'running successfully', null));
    } catch(error) {
        // 에러 처리
        res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'crawler failed', error));
    }
}

scheduler.stop = (req, res) => {
    if (state.active) {
        state.active = false
        schedule.cancelJob(job);
        res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'stopped successfully', null));
    } else {
        res.status(200).json(new Response(RESPONSE_CODE.FAIL, 'already stop', null));
    }
}

scheduler.stat = (req, res) => {
    res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'stat', {active: state.active}));
}

module.exports = scheduler;


// class scheduler {
//     constructor() {
//         this.schedule = require('node-schedule');
//         this.active = false;
//     }
    
// // 주기적으로 함수를 cryptoCrawler.getData를 호출한다.    
//     start(req, res) {
//         if (this.active) {
//             res.status(200).json({result: 'already'});
//         }
//         try {
//             this.active = true;
//             this.scheduleJob('*/10 * * * * *', async () => {
//                 let result = await cryptoCrawler.getData();

//                 // 큐에 넣기
//             });
//             res.status(200).json({ result: 'success start' });
//         } catch(error) {
//             // 에러 처리
//             console.log(error);
//             res.status(500).json({ result: 'fail' });
//         }
//     }

//     stop(req, res) {
//         this.active = false;
//         this.cancelJob();
//         res.status(200).json({result: 'success stop'});
//     }
    
//     stat(req, res) {
//         if (this.active) {
//             res.status(200).json({result: 'start'});
//         } else {
//             res.status(200).json({result: 'stop'});
//         }
//     }
// }

// module.exports = new scheduler();