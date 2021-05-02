const redisClient = require('../config/redis')

exports.addUsertoListRedis = (key, subkey, value, cb) => {
    redisClient.HMSET(key, subkey, JSON.stringify(value), (err, res) => {
        return cb(err, res)
    })
}

exports.removeUsersFromRedisList = (key, subkey) => {
    redisClient.HDEL(key, subkey);
}



exports.getOfflineUserInfo = (key, subkey, cb) => {
    // WC:user:OFF 123H
    redisClient.HGET(key, subkey, (err, res) => {
        cb(err, res)
    })
}