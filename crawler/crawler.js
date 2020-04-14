const axios = require('axios');

class Crawler {
    getData (url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then((result) => {
                    resolve(result.data)
                }).catch((err) => {
                    reject(err);
                });
        });
    };
};

module.exports = new Crawler();