const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './data',
  filename(req, file, cb) {
    cb(null, `SHEET-${Date.now()}${path.extname(file.originalname)}`)
  },
})

module.exports = multer({
  storage,
  // limits: { fileSize: 1000000 },
}).single('sheet')
