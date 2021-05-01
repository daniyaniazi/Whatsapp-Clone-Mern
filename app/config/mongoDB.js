const MONGO_DB = require('mongodb')
const MongoClient = MONGO_DB.MongoClient;
const uri = process.env.MONGO_URI


try {
    const M_CONNECT = MongoClient.connect(uri, {
        useUnifiedTopology: true
    }

    )
    module.exports = { MONGO_DB, M_CONNECT }
} catch (error) {
    console.log(error)
}