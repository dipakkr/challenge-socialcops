const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = require('./../../config/db'); 
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;
const MONGO_URI = 'mongodb://deepak:abc12345678@ds135624.mlab.com:35624/a2z';
const connection = mongoose.createConnection(MONGO_URI);

connection.once('open', () => {
    // Init stream
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

const upload = multer({ storage });

// @route POST /upload - Example 2 DEMO
router.post('/upload', upload.single('filename'), (req, res)=>{
    res.send(req.file);
}, (err)=>{
    if(err) res.status(404).send(err);
});


router.delete('/:id', (req, res)=>{

    gfs.files.findOne({ filename : req.params.id }, (err, file)=>{
        // checking file 
        
        if(!file || file.length === 0) return res.status(404).json({err : "File not exist" });
        
        gfs.remove({filename : req.params.id, root: 'uploads' }, (err, gridStore) => {
            if (err) return res.status(404).json({ err: err });
            res.send({"message" : "Delete Successful"});
        });
    });
});

// Test Route
router.get('/test', (req,res)=>{
    res.send({"message" : "Example 2 endpoint working"});
}); 

module.exports = router;
