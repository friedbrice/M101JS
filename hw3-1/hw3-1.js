/**
 * hw3-1.js
 * A program that drops each student's lowest homework score.
 * In JavaScript. Daniel Brice.
 */

var mongodb = require("mongodb")
  , url = "mongodb://localhost:27017/school"
  , db
  , coll

mongodb.MongoClient.connect(url, function (err, database) {
  db = database
  coll = db.collection("students")
  main()
})

function main() {
  // magic
}
