const { withDBout } = require("../mongodbDepend");

module.exports.allAdmin = (req, res) => {
  withDBout(
    async db => {
      await db.find({}).toArray(function(err, result) {
        if (err) {
          res.json({ error: "InternalError" }).status(500);
        }
        console.log("here", JSON.stringify(result));
        res.json({ result }).status(200);
      });
    },
    "admin",
    res
  );
};
