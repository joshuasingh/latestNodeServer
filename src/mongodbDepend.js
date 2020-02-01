const MongoClient = require("mongodb").MongoClient;

module.exports.withDBout = async (operations, call, res) => {
  try {
    console.log("sdfds");
    const client = await MongoClient.connect(
      "mongodb+srv://joshua1:joshuasingh@1995@cluster0-szqhn.mongodb.net/test?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    );
    const db = await client.db("DisplayData");

    var collection = null;

    if (call === "admin") {
      collection = await db.collection("authentication");
    } else {
      collection = await db.collection("AllofIt");
    }

    operations(collection, res);
    var a = "sdfdsfdsf;";
    // client.close();
  } catch (err) {
    console.log("error is ", err);
    res.status(500).send(err);
  }
};
