const express = require('express');
const app = new express();
const router = require('./route/router');

app.use('/crawler', router);

process.on('uncaughtException', (err) => {
    console.log(err);
});
process.on('unhandledRejection', (err) => {
    console.log(err);
});

app.listen(3000, () => {
    console.log('app 실행!');
});