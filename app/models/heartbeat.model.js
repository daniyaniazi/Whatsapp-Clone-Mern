const redisClient = require('../config/redis')

exports.getOfflineUserInfo = (key, subkey, cb) => {
    // WC:user:OFF 123H
    redisClient.HGET(key, subkey, (err, res) => {
        cb(err, res)
    })
}