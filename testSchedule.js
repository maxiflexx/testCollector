const scheduler = require('node-schedule');

console.log('start!');
var now = new Date();

var job = scheduler.scheduleJob('15 * * * * *', () => {
    console.log(now.getMinutes());
    console.log(now.getSeconds());
});
 