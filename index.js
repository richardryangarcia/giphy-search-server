const http = require('http');
const mongoose = require('mongoose');
const router = require('./router');
const mongoConfig = require('./configs/mongo');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

// set up mongo
mongoose.connect(mongoConfig.db ,{useNewUrlParser: true});

//express set up
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type:'*/*'}));
router(app);

//start server
console.log('Server is starting...');

const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);

console.log('Server is listening on: ', port);
