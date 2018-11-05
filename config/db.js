const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');


//URI
const MONGO_URI = 'mongodb://localhost:27017/Challenge';

//Create mongo connection 
const connection = mongoose.createConnection(MONGO_URI);

let gfs;

connection.once('open', () => {
    // Init stream
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads');
  });

// Create Storage Engine
const storage = new GridFsStorage({
    url: MONGO_URI,
    
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
  module.exports = storage;
