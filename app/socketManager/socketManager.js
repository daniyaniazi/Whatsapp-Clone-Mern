const io = require('./../../server').io;
const { getTime } = require('../helper')
const { addUsertoListRedis, removeUsersFromRedisList } = require('../models/heartbeat.model')
const { saveChats } = require('../models/common.model')

module.exports = (socket) => {
    try {


        console.log("connecteds")

        //JOIN CHAT
        socket.on("join-user", (data, callback) => {
            const { _id, name, profileImg, sessionId, createdAt, updatedAt } = data

            const newUser = {
                _id, name, profileImg, sessionId, createdAt: getTime(), updatedAt
            }
            //remove from offline list
            removeUsersFromRedisList("WC:user:OFF", sessionId)
            //add in online list
            addUsertoListRedis("WC:user:ON", sessionId, { time: getTime() }, (e, r) => {
                if (e) return callback(e)
                console.log("New User Joined", r)
                socket.sessionId = sessionId
                socket.join(sessionId)
                socket.broadcast.emit("new-online-user", newUser)
                callback();
            })
        })


        //SEND  CHAT
        socket.on("send-msg", async (data, callback) => {
            const { senderID, receiverId, msg } = data;
            const ChatObj = {
                room: [receiverId, senderID],
                senderID,
                receiverId,
                msg,
                time: getTime()
            }
            await saveChats(ChatObj)

            //sending to reciever
            io.to('recieverId').emit("recieve-msg", chatObj)
            callback(chatObj)
        })

        //TYPING INDICATOR
        socket.on("user-typing", async (data, callback) => {
            const { senderID, receiverId, msg } = data;
            const ChatObj = {
                room: [receiverId, senderID],
                senderID,
                receiverId,
                msg,
                time: getTime()
            }

            //indicator to reciever
            io.to('recieverId').emit("user-typing", chatObj)
            callback(data)
        })


        //disconnect
        socket.on("disconnect", () => {
            const { sessionId } = socket;
            if (sessionId) {
                //remove from online list
                removeUsersFromRedisList("WC:user:ON", sessionId)
                //add in offline list
                const offlineUser = {
                    sessionId,
                    time: getTime()
                }
                addUsertoListRedis("WC:user:OFF", sessionId, offlineUser, (e, r) => {
                    if (e) return callback(e)
                    console.log("User Left", r)

                })
                socket.broadcast.emit("new-offline-user", offlineUser)
            }
        })

    } catch (error) {
        console.log(error)
    }
}
