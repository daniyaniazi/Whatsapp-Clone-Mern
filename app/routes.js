const express = require('express')
const router = express.Router()
const { userProfileUpload, audioUpload, imageMessageFileUpload } = require('./helper')

const controller = require('./controller')

router.post('/api/login', userProfileUpload, controller.userLogin)
router.get('/api/users-list/:id', controller.getUserList)
router.get('/api/user/:id', controller.getUserInfo)
router.post('/api/chats', controller.getUserChats)
router.get('/api/user/is-offline/:id', controller.CheckIfUserOffline)
router.post('/api/upload-voice', audioUpload, controller.uploadVoice)
router.post('/api/upload-image-file', imageMessageFileUpload, controller.uploadImageFile)


module.exports = router