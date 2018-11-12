const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = require('./../../config/db'); 
const upload = multer({ storage });

// @route POST /upload - Example 3 DEMO
router.post('/upload', upload.single('filename'), (req, res)=>{
  
  //User aborting upload request
  req.on('close', function(){
    res.send({"message" : "Upload Cancelled by User"});
  });
  res.send(req.file);
});

// Test Route
router.get('/test', (req,res)=>{
  res.send({"message" : "Example 3 endpoint working"});
}); 

module.exports = router;
