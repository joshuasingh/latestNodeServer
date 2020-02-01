const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var { getAll } = require("../AdminMenuItems/getAllUpdatedData");
var { getAllSocket } = require("../AdminMenuItems/getAllUpdatedData");

const withDB = async (operations, res) => {
  try {
    console.log("sdfds");
    const client = await MongoClient.connect(
      "mongodb+srv://joshua1:joshuasingh@1995@cluster0-szqhn.mongodb.net/test?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    );
    const db = await client.db("DisplayData");
    const collection = await db.collection("AllofIt");
    operations(collection, res);
    var a = "sdfdsfdsf;";
    client.close();
  } catch (err) {
    console.log("error is ", err);
    res.status(500).send(err);
  }
};

module.exports.setMongoUrl = async (imageUrl1, id1, res1) => {
  console.log("called updating");

  // var temp = "Mickey";
  try {
    var myquery = { _id: ObjectID(id1) };

    var newvalues = { $addToSet: { pics: { $each: imageUrl1 } } };

    withDB(async db => {
      await db.updateOne(myquery, newvalues, function(err, obj) {
        if (err) {
          console.log("error occured", err);
          res1.json({ status: "mongoNotUploaded" }).status(500);
        } else {
          console.log("document updated", obj);
          //gettingUpdate(id1, res1);
          getAll(null, res1);
        }
      });
    }, res1);
  } catch (e) {
    console.log("error occured");
    res1.json({ error: "InternalError" }).status(500);
  }
};

module.exports.setMongoUrl1 = async (imageUrl1, id1, res1, connection) => {
  console.log("called updating");

  // var temp = "Mickey";
  try {
    var myquery = { _id: ObjectID(id1) };

    var newvalues = { $addToSet: { pics: { $each: imageUrl1 } } };

    withDB(async db => {
      await db.updateOne(myquery, newvalues, function(err, obj) {
        if (err) {
          console.log("error occured", err);
          res1.json({ status: "mongoNotUploaded" }).status(500);
        } else {
          console.log("document updated", obj);
          //gettingUpdate(id1, res1);
          getAllSocket(null, res1, connection);
        }
      });
    }, res1);
  } catch (e) {
    console.log("error occured");
    res1.json({ error: "InternalError" }).status(500);
  }
};

//get the updated value
const gettingUpdate = (id, res) => {
  var myquery = { _id: ObjectID(id) };
  withDB(async db => {
    await db.find(myquery).toArray(function(err, result) {
      if (err) {
        res.json({ status: "doRefresh" }).status(200);
      }
      // console.log("here", JSON.stringify(result));
      res.json({ val: result }).status(200);
    });
  }, res);
};
