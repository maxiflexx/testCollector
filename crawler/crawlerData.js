const axios = require('axios');

class Crawler {
    // API를 호출해서 결과 반환
    getData (url) {
        return new Promise((resolve, reject) => {
            console.log('good')
            axios.get(url)
                .then((result) => {
                    console.log(url)
                    resolve(result.data);
                }).catch((error) => {
                    reject(error);
                })
        })
    }

}

module.exports = new Crawler();