const multer = require("multer")

// temp.. storage is RAM
const storage = multer.memoryStorage()

const upload = multer({
    storage : storage,
    limits : { fileSize : 25 * 1024 * 1024 }
})

module.exports = upload