const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const storage = require('./../../config/db'); 
const upload = multer({ storage });
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');


let gfs;
const MONGO_URI = 'mongodb://localhost:27017/Challenge';
const connection = mongoose.createConnection(MONGO_URI);

connection.once('open', () => {
    // Init stream
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads');
});


// @route POST /upload - Example 1 DEMO
router.post('/upload', upload.single('filename'), (req, res)=>{
    res.send(req.file);
});


router.delete('/:id', (req, res)=>{


    gfs.files.findOne({ filename : req.params.id }, (err, file)=>{
        // checking file 
        
        if(!file || file.length === 0){
            return res.status(404).json({
                err : "File not exist"
            });
        }

        gfs.remove({filename : req.params.id, root: 'uploads' }, (err, gridStore) => {
            
            if (err) {
                return res.status(404).json({ err: err });
            }

            res.send({"message" : "Delete Successful"});
        });
    });

});

module.exports = router;
