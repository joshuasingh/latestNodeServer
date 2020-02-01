var multer = require("multer");
var express = require("express"),
  router = express.Router();

// Car brands page

router.get("/brands", function(req, res) {
  res.send("Audi, BMW, Mercedes");
});

// Car models page

router.get("/models", function(req, res) {
  res.send("Audi Q7, BMW X5, Mercedes GL");
});

var upload1 = multer({ dest: "uploads/" });

router.post("/profile", upload1.single("file"), function(req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log("here it us");
  //console.log("the body here",req.file)
  console.log("the body here", req.body.name);
});

module.exports = router;
