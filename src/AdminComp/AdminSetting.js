var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var { withDBout } = require("../mongodbDepend");
var { checkHeaderAuth } = require("../checkAuth/checkHeaderAuth");
var ObjectID = require("mongodb").ObjectID;
var { allAdmin } = require("./allAdmin");

//to create  a new Admin
router.post("/AddUser", function(req, res) {
  checkHeaderAuth(
    async userrr => {
      const { UserName, Email, Password } = req.body;

      try {
        console.log("herer", Email);
        var result = "";
        // var status = "unique";
        const passwordDigest = bcrypt.hashSync(Password, 10);

        withDBout(
          async db => {
            result = await db.findOne({ email: Email });

            console.log("returned value", result);
            if (result === null) {
              db.insertOne(
                {
                  username: UserName,
                  email: Email,
                  password: passwordDigest,
                  master: "no"
                },
                function(err, obj) {
                  if (err) {
                    console.log("error occured inside the function", err);
                    res.status(500).json({ error: "InternalError" });
                  } else {
                    allAdmin(req,res)
                    // res.status(200).json({ status: "user updated" });
                  }
                }
              );
            } else {
              res.status(200).json({ error: "emailNotUnique" });
              console.log("not unique");
            }
          },
          "admin",
          res
        );

        // console.log("after await statement");
      } catch (err) {
        console.log("error occured inside the catch");
        res.status(500).json({ error: "InternalError" });
      }
    },
    req,
    res
  );
});

//view all the admin list
router.get("/ViewAllAdmin", function(req, res) {
  checkHeaderAuth(
    async userrr => {
      try {
        withDBout(
          async db => {
            await db.find({}).toArray(function(err, result) {
              if (err) {
                res.json({ error: "InternalError" }).status(2000);
              } else {
                res.json(result).status(200);
              }
            });
          },
          "admin",
          res
        );

        // console.log("after await statement");
      } catch (err) {
        console.log("error occured inside the catch");
        res.status(500).json({ error: "InternalError" });
      }
    },
    req,
    res
  );
});

//remove the account ...action taken by main admin
router.post("/removeAccount", function(req, res) {
  // checkHeaderAuth(
  //   async userrr => {
  try {
    const id = req.body.id;
    console.log("id is", id);
    var myquery = { _id: ObjectID(id) };

    withDBout(
      async db => {
        db.deleteOne(myquery, function(err, obj) {
          if (err) {
            console.log("error caused because of ");
            res.status(500).json({ error: "InternalError" });
          } else {
            console.log("1 document deleted");
            //call the updated data
            allAdmin(req, res);
          }
        });
      },
      "admin",
      res
    );
  } catch (err) {
    console.log("in catch", err);
    res.status(500).json({ error: "InternalError" });
  }
  //   },
  //   req,
  //   res
  // );
});

module.exports = router;
