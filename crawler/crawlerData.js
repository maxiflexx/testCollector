const axios = require('axios');
const api = require('../utils/upbitAPI');

class Crawler {
    getData (req, res) {
        console.log('good')
        axios.get(api.upbitAPI)
            .then((result) => {
                res.status(200).json(result.data)
                console.log(result.data)
            }).catch((error) => {
                res.status(500).json({message: "error"})
            })
    }
}

module.exports = new Crawler();