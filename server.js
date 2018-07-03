
var MongoClient = require('mongodb').MongoClient;
var express = require('express');

var app = express();

var url = 'mongodb://localhost:27017/';
var port = process.env.PORT || 7999;
var timeIntervalBetweenRecords = 1;
var timer = 2;
var dbd = null;

function generateRecords() {

  var dbo = dbd.db('streamdb');
 
  var maxSpeed = Math.floor(Math.random() * (52 - 30 + 1)) + 30;
  var minSpeed = Math.floor(Math.random() * (25 - 10 + 1)) + 10;
  var avgSpeed = (maxSpeed + minSpeed) / 2;
  var parlimentSpeeds = { time: timer, minKmh: minSpeed, maxKmh: maxSpeed, avgKmh: avgSpeed };


  dbo.collection('parlimentJuncVehicularSpeeds').insertOne(parlimentSpeeds, function (err, res) {
    if (err) throw err;
    console.log(timer + 'speed document inserted');
    //dbd.close();
  });

  timer++;
  setTimeout(generateRecords, timeIntervalBetweenRecords * 1000);
}



MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  dbd = db;
  generateRecords();

  app.listen(port);
  console.log('Server Started on port ' + port);
});
