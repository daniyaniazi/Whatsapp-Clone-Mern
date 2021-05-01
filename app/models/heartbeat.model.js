const redisClient = require('../config/redis')

exports.addUsertoListRedis = (key, subkey, value, cb) => {
    redisClient.HMSET(key, subkey, JSSON.stringify(value), (err, res) => {
        cb(err, res)
    })
}

exports.removeUsersFromRedisList = (key, subkey, value, cb) => {
    redisClient.HDEL(key, subkey, JSON.stringify(value), (err, res) => {
        cb(err, res)
    })
}



exports.getOfflineUserInfo = (key, subkey, cb) => {
    // WC:user:OFF 123H
    redisClient.HGET(key, subkey, (err, res) => {
        cb(err, res)
    })
}