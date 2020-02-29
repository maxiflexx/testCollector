const cryptoCrawler = require('./crawlerData');
let state = require('./schedulerState');
let schedule = require('node-schedule');
let scheduler = {};
var job = 'job';

// 주기적으로 함수를 cryptoCrawler.getData를 호출한다.
scheduler.start = (req, res) => {
    if (state.active) {
        res.status(200).json({result: 'already start'});
    }
    try {
        state.active = true;
        schedule.scheduleJob(job, '*/10 * * * * *', async () => {
            let result = await cryptoCrawler.getData();

            // 큐에 넣기
        });
        res.status(200).json({ result: 'success start' });
    } catch(error) {
        // 에러 처리
        console.log(error);
        res.status(500).json({ result: 'fail' });
    }
}

scheduler.stop = (req, res) => {
    if (state.active) {
        schedule.cancelJob(job);
        res.status(200).json({result: 'success stop'});
    } else {
        res.status(200).json({result: 'already stop'})
    }
    
}

scheduler.stat = (req, res) => {
    res.status(200).json({result: state.active});
}

module.exports = scheduler;


// class scheduler {
//     constructor() {
//         this.schedule = require('node-schedule');
//     }
    
// 주기적으로 함수를 cryptoCrawler.getData를 호출한다.    
//     start(req, res) {
//         if (state.active) {
//             res.status(200).json({result: 'already'});
//         }
//         try {
//             state.active = true;
//             this.schedule.scheduleJob('*/10 * * * * *', async () => {
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
//         state.active = false;
//         this.schedule.cancelJob();
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