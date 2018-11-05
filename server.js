const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uploadFile3 = require('./route/api/upload-3');
const uploadFile1 = require('./route/api/upload-1');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Setup routes
app.use('/example3', uploadFile3);
app.use('/example1', uploadFile1);

//Define PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server Started on PORT' ${PORT}`));
  
