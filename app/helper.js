const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')


exports.getUniqueId = () => {
    return uuidv4();
}

exports.getTime = () => {
    return Date.now;
}


userProfileStorage = multer.diskStorage({
    destination: `uploads/${process.env.PROFILE_IMAGE_PATH}/`,
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
exports.userProfileUpload = multer({
    storage: userProfileStorage,
    limits: { fileSize: 1000000, }
}).single("profileImg")



audioStorage = multer.diskStorage({
    destination: `uploads/${process.env.AUDIO_PATH}/`,
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".webm")
    }
})
exports.audioUpload = multer({
    storage: audioStorage,
    limits: { fileSize: 1000000, }
}).single('track')


imageMessageFileStorage = multer.diskStorage({
    destination: `uploads/${process.env.IMAGE_MESSAGE_PATH}/`,
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".webm")
    }
})
exports.imageMessageFileUpload = multer({
    storage: imageMessageFileStorage,
    limits: { fileSize: 1000000, }
}).single('track')

