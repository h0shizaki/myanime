const path = require('path');

var multer = require('multer');
const destPath = path.join(__basedir, '/src/public/uploads/characters')


const imageFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error('Plese upload only images'), false);
    }

}



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, destPath)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-image-${file.originalname}`)
    }
});

const fileLimit = 0.5 * 1000000 ; // 500kB

module.exports = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: fileLimit }
})