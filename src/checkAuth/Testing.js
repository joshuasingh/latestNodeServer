var express = require("express");
var router = express.Router();

router.get("/here", function(req, res) {
  console.log("here");
  res.json({ ans: "its done" }).status(200);
});

module.exports = router;
