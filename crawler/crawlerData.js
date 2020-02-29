const axios = require('axios');
const api = require('../utils/upbitAPI');

class Crawler {
    // API 데이터를 크롤링한다.
    // getData (req, res) {
    //     // 1. req, res를 받는다
    //     // 2. API 데이터를 크롤링한다.
    //     // 3. res 응답한다.
    //     console.log('good')
    //     axios.get(api.upbitAPI)
    //         .then((result) => {
    //             res.status(200).json(result.data)
    //             console.log(result.data)
    //         }).catch((error) => {
    //             res.status(500).json({message: error})
    //         })
    // }

    // API를 호출해서 결과 반환
    getData () {
        return new Promise((resolve, reject) => {
            console.log('good')
            axios.get(api.upbitAPI)
                .then((result) => {
                    console.log(result.data)
                    resolve(result.data);
                }).catch((error) => {
                    reject(error);
                })
        })
    }

}

module.exports = new Crawler();