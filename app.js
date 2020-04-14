const helmet = require('helmet');
const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes/index');
const config = require('./config/app.config')
const app = new express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/crawler', router);

app.listen(config.port, () => {
    console.log('Example app listening on port 3000!');
});