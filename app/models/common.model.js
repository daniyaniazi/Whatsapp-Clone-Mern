const { MONGO_DB, M_CONNECT } = require('../config/mongoDB')

exports.userLoginController = async (payload) => {
    const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);

    let collection = await db.collection(process.env.MONGO_DB_USERS_COLLECTION)

    let res = await collection.insertOne(payload)
    res.insertedId;
}

exports.getUserListController = async function (sessionId) {
    const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);

    let collection = await db.collection(process.env.MONGO_DB_USERS_COLLECTION)
    let res = await collection.find({ sessionId: { $ne: sessionId } }).toArray()
    return res;
}

exports.getUserInfoController = async function (sessionId) {
    const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
    let collection = await db.collection(process.env.MONGO_DB_USERS_COLLECTION)
    let res = await collection.findOne({ sessionId: sessionId })
    return res;
}


exports.getUserChatsController = async function (senderId, recieverId) {
    const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
    let collection = await db.collection(process.env.MONGO_DB_CHATS_COLLECTION)

    let res = await collection.find({ room: { $all: [senderId, recieverId] } }).toArray()
    return res;
}

exports.saveChats = async (payload) => {
    const db = (await M_CONNECT).db(process.env.MONGO_DB_NAME);
    let collection = await db.collection(process.env.MONGO_DB_CHATS_COLLECTION)

    let res = await collection.inserOne(payload)
    return res.insertedId;
}