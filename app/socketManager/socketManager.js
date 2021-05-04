const io = require('./../../server').io;
const { getTime } = require('../helper')
const { addUsertoListRedis, removeUsersFromRedisList } = require('../models/heartbeat.model')
const { saveChats } = require('../models/common.model')

module.exports = (socket) => {
    try {
        console.log("Socket connected")
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
                if (e) return callback(e);
                console.log("new user joined", r);
                socket.sessionId = sessionId;
                socket.join(sessionId);
                socket.broadcast.emit("new-online-user", newUser);
                callback(`${newUser.name} has joined`);
            })
        })


        //SEND  CHAT
        socket.on("send-msg", async (data, callback) => {
            const { senderId, receiverId, msg } = data;
            currentTime = getTime()
            const ChatObj = {
                room: [receiverId, senderId],
                time: currentTime,
                senderId,
                receiverId,
                msg,

            }

            await saveChats(ChatObj)

            //sending to reciever
            console.log(ChatObj)
            io.to('receiverId').emit("receive-msg", ChatObj)
            callback(ChatObj)
        })

        //TYPING INDICATOR
        socket.on("user-typing", async (data, callback) => {
            const { senderId, receiverId, msg } = data;
            currentTime = getTime()
            const ChatObj = {
                room: [receiverId, senderId],
                time: currentTime,
                senderId,
                receiverId,
                msg,

            }

            //indicator to reciever
            io.to('recieverId').emit("user-typing", ChatObj)
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
