const multer = require("multer");

// This a function which we have created for storing image in our database

const Storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: Storage,
    filename: function (req, file, cb) {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg"
        ) {
            cb(null, true);
        } else {
            console.log("only png and jpg file");
            cb(null, false);
        };
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

module.exports = upload;