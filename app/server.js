'use strict';
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://mongodb:27017';

// Database Name
const dbName = 'pantip';
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Constants
const PORT = 9000;
const HOST = '0.0.0.0';

// Path
const path = require('path');

// App
const app = express();

// Router
// const indexRouter = require('./routes/index')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {delimiter: '?'});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,  'public')))

// Connect dbs
const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const Stage = new Schema(
//   {
//       stage:Number,
//       question:[String], 
//       guessin:[String], 
//       answer:[String],
//       score:Number,
//       fail:Number,
//       step:Number,
//     }
// );

// module.exports = mongoose.model("stages", Stage);

mongoose
  .connect("mongodb://0.0.0.0:27017/node-api-101", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

// insert data

app.post('/', async function(req,res){ 

  const data = { 
      stage: 1, 
      question:["_","_","_","_"], 
      guessing:["*","*","*","*"], 
      answer:[],
      score:[],
      fail:0,
      step:0
  }
await db.collection('stage1').insertOne(data,function(err, collection){ 
      if (err) throw err;
      console.log("Record inserted Successfully");
      col.updateOne({ step: 0 }, { $set: { step: 1 } });

  });
})

// Use connect method to connect to the Server

app.use(express.json())

// app.use('/', indexRouter)

app.get('/game', (req, res) => {
  res.sendFile(__dirname + '/views/game.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`)
})

console.log(`Running on http://${HOST}:${PORT}`);
