const schedule = require('node-schedule');
const cryptoCrawler = require('./crawlerData')

class scheduler {
    // 주기적으로 함수를 cryptoCrawler.getData를 호출한다.
    job(req, res) {
        try {
            schedule.scheduleJob('*/10 * * * * *', async () => {
                let result = await cryptoCrawler.getData();

                // 큐에 넣기
            });
            res.status(200).json({ result: 'success' });
        } catch(error) {
            // 에러 처리
            res.status(500).json({ result: 'fail' });
        }
    }
}




module.exports = new scheduler();