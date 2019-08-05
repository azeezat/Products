const express = require('express');
const router = express.Router();
let multer = require('multer');
let mongo = require('mongodb');
var Grid = require('gridfs-stream');
let streamBuffers = require('stream-buffers');
const { MediaFile } = require('../models/files');

var upload = multer();

// create or use an existing mongodb-native db instance
var db = new mongo.Db('yourDatabaseName', new mongo.Server("127.0.0.1", 27017));
var gfs = Grid(db, mongo);

router.post('/:id', upload.single('file'), (req, res) => {

  req.file.id = req.params.id;
  console.log(req.file);

  new MediaFile(req.file)
    .save(function (err, mediaFile) {
      if (err) {
        return res.status(500).send('Error occurred: database error');
      }

      var myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
        frequency: 10,   // in milliseconds.
        chunkSize: 2048  // in bytes.
      });

      myReadableStreamBuffer.put(req.file.buffer);
      myReadableStreamBuffer.stop();

      // streaming to gridfs
      //filename to store in mongodb
      var writestream = gfs.createWriteStream({
        filename: 'w/' + req.params.id
      });
      myReadableStreamBuffer.pipe(writestream);
      // fs.write(writestream, req.file.buffer);
      writestream.on('close', function (file) {
        // do something with `file`
        console.log(file.filename + 'Written To DB');
      });

      res.json(mediaFile);
    });

});

router.get('/:id', (req, res) => {

  MediaFile.findOne({ id: req.params.id }, function (err, mediaFile) {
    if (err || mediaFile === null) {
      return res.status(500).send('Error occurred: database error');
    }

    res.set('Content-Type', mediaFile.mimetype);

    //read from mongodb
    var readstream = gfs.createReadStream({
      filename: 'w/' + req.params.id
    });
    readstream.pipe(res);
    res.on('close', function () {
      console.log('file has been written fully!');
    });

  });
});

module.exports = router; 