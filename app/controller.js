const { getUniqueId, getTime } = require('./helper')
const { userLoginController, getUserListController, getUserInfoController, getUserChatsController } = require('./models/common.model')
const { getOfflineUserInfo } = require('./models/heartbeat.model')


exports.userLogin = async (req, res) => {
    try {
        console.log('file', req.file)
        console.log("IN LOGIN")
        const { name } = JSON.parse(req.body.payload);
        console.log(name)
        const cureentTime = getTime()
        let user = {
            name,
            profileImg: '',
            sessionId: getUniqueId(),
            createdAt: cureentTime,
            updatedAt: cureentTime
        }
        console.log(req.file, req.file.filename)
        if (req.file && req.file.filename) {
            user['profileImg'] = `${process.env.BASE_PATH}:${process.env.PORT}/${process.env.PROFILE_IMAGE_PATH}/${req.file.filename}`;

            console.log(user['profileImg'])
        }
        let id = await userLoginController(user)
        user["_id"] = id
        res.status(200).send(user)
    } catch (error) {
        console.log("error", error)
        res.status(400).send(error.message)
    }
}


exports.getUserList = async (req, res) => {
    try {
        const userList = await getUserListController(req.params.id)
        let userListObj = {};
        if (userList.length) {
            for (let i = 0; i < userList.length; i++) {
                userListObj[userList[i].sessionId] = userList[i]
            }
        }
        res.status(200).send(userListObj)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.getUserInfo = async (req, res) => {
    try {
        const userInfo = await getUserInfoController(req.params.id)
        res.status(200).send(userInfo)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


exports.getUserChats = async (req, res) => {
    try {
        const { senderId, recieverId } = req.body
        let chats = await this.getUserChatsController(senderId, recieverId)
        res.status(200).send(chats)
    } catch (error) {
        res.status(400).send(error.message)
    }
}




exports.uploadVoice = async (req, res) => {
    try {
        let filePath = '';
        if (req.file && req.file.filename) {
            filePath = `${process.env.BASE_PATH}:${process.env.PORT}/${process.env.AUDIO_PATH}/${req.file.filename}`
        }
        res.status(200).send(filePath)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.uploadImageFile = async (req, res) => {
    try {
        let filePath = '';
        if (req.file && req.file.filename) {
            filePath = `${process.env.BASE_PATH}:${process.env.PORT}/${process.env.IMAGE_MESSAGE_PATH}/${req.file.filename}`
        }
        res.status(200).send(filePath)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


exports.CheckIfUserOffline = async (req, res) => {
    try {
        getOfflineUserInfo("WC:user:OFF", req.params.id, (e, res) => {
            if (e) throw new Error

            res.status(200).send(r ? r : flase)
        })
    }

    catch (error) {
        res.status(400).send(error.message)
    }
}