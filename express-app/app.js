// import a bunch of libraries
var express = require('express'),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    MongoServer = require('mongodb').Server

// configure express (does not start express web server)
var app = express()
app.engine('html', cons.swig)
app.set('view engine', 'html')
app.set('views', __dirname + "/views")

// create a database-connection-handler (does not establish connection)
var mongoClient = new MongoClient(
  new MongoServer('localhost', 27017, { 'native_parser' : true })
)

// create a database-data-handler (does not establish connection)
var db = mongoClient.db('course')

// url resolution (via express)
app.get('/', function (req, res) {
  db.collection('hello_mongo_express').findOne({}, function (err, doc) {
    res.render('hello', doc)
  })
})

// more url resolution
app.get('*', function (req, res) {
  res.render('404', { 'page_name' : req.url })
  // req.url is the requested url
})

// establish database connection and start express web server
mongoClient.open(function (err, mongoClient) {
  if (err) throw err

  app.listen(8080) // start the web server AFTER connecting to MongoDB
  console.log("Express server started on port 8080")
})
