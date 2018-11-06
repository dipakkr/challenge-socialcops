const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = require('./../../config/db'); 
const upload = multer({ storage });

/**
 * Add Your Code here
 */

// Test Route
router.get('/test', (req,res)=>{
  res.send({"message" : "Example 2 endpoint working"});
}); 

module.exports = router;
