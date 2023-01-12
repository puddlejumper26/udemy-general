const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "fruitsDB";

const client = new MongoClient(url);

// Main functions --------------------------------
client.connect(function (err, db) {
  assert.equal(null, err);
  console.log("----- Connected to Server -----");

  const db2 = client.db(dbName);

  //   Call the Insert
  //   insertDocuments(db2, function () {
  //     client.close();
  //   });

  // Call the Find
  findDocuments(db2, function () {
    client.close();
  });
});

//  Insert documents --------------------------------
const insertDocuments = function (db, callback) {
  const collection = db.collection("fruits");
  collection.insertMany(
    [
      { name: "apple", score: 8, review: "great fruit" },
      { name: "Orange", score: 10, review: "orange good" },
      { name: "Banana", score: 12, review: "banana good" },
    ],
    function (err, result) {
      assert.equal(err, null);
      //   assert.equal(3, result.result.n);
      console.log("Inserted " + result);
      callback(result);
    }
  );
};

// read from the MongoDB
const findDocuments = function (db, callback) {
  const collection = db.collection("fruits");
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    console.log("==== Found the following ====");
    console.log(docs);
    callback(docs);
  });
};
