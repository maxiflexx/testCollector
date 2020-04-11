const express = require('express');
const app = new express();
const router = require('./routes/router');
const config = require('./utils/app.config');

app.use('/crawler', router);

process.on('uncaughtException', (err) => {
    console.log(err);
});
process.on('unhandledRejection', (err) => {
    console.log(err);
});

app.listen(config.port, () => {
    console.log('app 실행!');
});

