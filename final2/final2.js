// credit where it is due, thanks to joliva@github

var pairs = [
  {"from" : "susan.mara@enron.com",     "to" : "jeff.dasovich@enron.com"},
  {"from" : "susan.mara@enron.com",     "to" : "richard.shapiro@enron.com"},
  {"from" : "soblander@carrfut.com",    "to" : "soblander@carrfut.com"},
  {"from" : "susan.mara@enron.com",     "to" : "james.steffes@enron.com"},
  {"from" : "evelyn.metoyer@enron.com", "to" : "kate.symes@enron.com"},
  {"from" : "susan.mara@enron.com",     "to" : "alan.comnes@enron.com"}]

var countEmails = function (from, to, coll) {
  // `from` a string
  // `to` a string
  // `coll` a mongodb collection object
  // returns an object {"from" : `from`, "to" : `to`, "number" : `n`}
  // where `n` is the number of emails from `from` to `to`

  var query = coll.aggregate([
    // project onto only those keys we need
    {"$project" : {"headers.From" : true, "headers.To" : true}},
    // match header.From with `from` and header.To with `to`
    {"$match" : {"headers.From" : from, "headers.To" : to}},
    // each record is one email from `from` to `to`
    // count number of records
    {"$group" : {"_id" : "1", "count" : {"$sum" : 1}}}])
    // returns { "result" : [ { "_id" : "1", "count" : `n`} ], "ok" : 1 }

  // extract the count
  var n = query.result[0].count
  return {"from" : from, "to" : to, "number" : n}
}
