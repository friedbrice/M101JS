var mongoC = require("mongodb").MongoClient

mongoC.connect("mongodb://localhost:27017/weather", function (err, db) {
  if (err) throw err

  var oldState = ""
  var cursor = db.collection("data").find()

  cursor.sort([["State", 1], ["Temperature", -1]])
  cursor.each(function (err, doc) {
    if (err) throw err
    if (doc == null) {
      return db.close()
    }

    if (doc.State != oldState) {
      doc["month_high"] = true
      db.collection("data").update({"_id": doc._id}, doc, function (err, num) {
        if (err) throw err
        console.log("Modified " + num + " thing(s).")
      })
    }
    oldState = doc.State
  })
})
