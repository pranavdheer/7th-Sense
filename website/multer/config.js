var multer = require("multer");
var fs = require("fs");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("A1");
        console.log(req.body);
        var newDestination = 'public/uploads/' + req.body.id;
        var stat = null;
        try {
            stat = fs.statSync(newDestination);
        } catch (err) {
            fs.mkdirSync(newDestination);
        }
        var newDestination = newDestination+"/"+req.body.type;
        var stat = null;
        try {
            stat = fs.statSync(newDestination);
        } catch (err) {
            fs.mkdirSync(newDestination);
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
        }
        cb(null, newDestination);
    },
    filename: function (req, file, callback) {
        console.log("A2");
        callback(null, Date.now() + "-" + file.originalname);
    }
});


var upload = multer(
    {
        dest: 'public/uploads/',
        storage: storage
    }
);


exports.upload = upload;