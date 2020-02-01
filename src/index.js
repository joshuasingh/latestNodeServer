//import CheckJwt from "../src/security/CheckJwt";
var http = require("http");
var sockjs = require("sockjs");
var Filter = require("bad-words");
var express = require("express");
var cors = require("cors");
var app = express();
var config = require("./security/config.json");
var { CheckJwt } = require("./security/CheckJwt");
var { checkHeaderAuth } = require("./checkAuth/checkHeaderAuth");
const fileUpload = require("express-fileupload");
var { withDBout } = require("./mongodbDepend");
var WSS = require("ws").Server;

app.use(cors());
app.use(require("./Controller/TestRest"));

var bodyParser = require("body-parser");
var Testing = require("./AdminComp/AdminSetting");

//app.use(bodyParser.urlencoded({
//extended: false
//}));
//app.use(bodyParser.json());
const MongoClient = require("mongodb").MongoClient;
app.use(bodyParser.json({ limit: "10mb", extended: false }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
var { getAll } = require("./AdminMenuItems/getAllUpdatedData");

//All router defined here
app.use("/adminSetting", Testing);

var echo = sockjs.createServer({ sockjs_url: "" });
var clients = {};
var filter = new Filter();

// Broadcast to all clients
function broadcast(message) {
  // iterate through each client in clients object
  for (var client in clients) {
    // send the message to that client
    clients[client].write(message);
  }
}

var GloConn = null;

echo.on("connection", function(conn) {
  // add this client to clients object
  GloConn = conn;

  console.log("connect: " + conn.id);
  clients[conn.id] = conn;
  console.log("total no of client: ", Object.keys(clients).length);

  conn.on("data", function(message) {
    broadcast(filter.clean(message));
  });
  // on connection close event
  conn.on("close", function() {
    console.log("disconnected: " + conn.id);
    delete clients[conn.id];
  });
});

var server = http.createServer(app);

echo.installHandlers(server, { prefix: "/chat" });
server.listen(process.env.PORT || 8081);

// var port = 8081;

// app.listen(port, () => {
//   console.log("server started running ", port);
// });

var ObjectID = require("mongodb").ObjectID;
var {
  getSingleImages
} = require("../src/AdmingetImagesPerCat/getSingleImages");

var {
  putSingleSliderImage
} = require("../src/AdmingetImagesPerCat/getSingleImages");

var {
  putSingleSliderImage1
} = require("../src/AdmingetImagesPerCat/getSingleImages");

var {
  putMultipleImages
} = require("../src/AdmingetImagesPerCat/putMultipleImages");

var {
  putMultipleImages1
} = require("../src/AdmingetImagesPerCat/putMultipleImages");

var {
  putMultipleImagesInMain
} = require("../src/AdmingetImagesPerCat/putMultipleImages");

// working with photo uploading to aws
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//const receive = multer();

aws.config.update({
  secretAccessKey: "dsYGxu5lnTNYrXgLTN0PCkxXIuk2DC9Xj9fpaDn9",
  accessKeyId: "AKIAICJB367TKQTZBRNQ",
  region: "us-east-2"
});

const s3 = new aws.S3();

const withDB = async (operations, res) => {
  try {
    console.log("sdfds");
    const client = await MongoClient.connect(
      "mongodb+srv://joshua1:joshuasingh@1995@cluster0-szqhn.mongodb.net/test?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
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

const withDB1 = async (operations, res) => {
  try {
    console.log("sdfds");
    const client = await MongoClient.connect(
      "mongodb+srv://joshua1:joshuasingh@1995@cluster0-szqhn.mongodb.net/test?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const db = await client.db("DisplayData");
    const collection = await db.collection("authentication");
    operations(collection, res);
    var a = "sdfdsfdsf;";

    client.close();
  } catch (err) {
    console.log("error is ", err);
    res.status(500).send(err);
  }
};

var tempData = [
  {
    _id: "5d7254b018d5f2086456579e",
    title: "dgfdfgdfg",
    value: "fdgdfgdfgdfg",
    pics: []
  },
  {
    _id: "5d7254b018d5f2086456579e",
    title: "dgfdfgdfg",
    value: "fdgdfgdfgdfg",
    pics: []
  },
  {
    _id: "5d73c760180a322f94377dd1",
    title: "i changed it",
    value: "fdgdfgdfgdfg",
    pics: []
  },
  {
    _id: "5d73c8998df98722c8c6585a",
    title: "dgdfdfgdfggdsf",
    value: "sssssss121212ssss",
    pics: []
  },
  {
    _id: "5d52c8998df98722c8c6585a",
    title: "dnew in ere",
    value: "sssssss121212ssss",
    pics: []
  },
  {
    _id: "5d73c4588df98722c8c6585a",
    title: "new one two",
    value: "sssssss121212ssss",
    pics: []
  },
  {
    _id: "5dc953b11c9d44000002f5b7",
    title: "NavBarDetials",
    value: "sssssss121212ssss",
    links: [
      { home: "/AdminPage" },
      { "Admin Login": "/" },
      {
        "Contact Us": ""
      },
      { zxzczxc: "zcx" }
    ]
  }
];

app.get("/hello/:name", (req, res) => {
  ``;
  res.send(`hello started`);
});

var articleInfo;

//getting all the data to show
app.get("/allData", (req, res) => {
  console.log("called");

  withDB(async db => {
    await db.find({}).toArray(function(err, result) {
      if (err) throw err;
      // console.log("here", JSON.stringify(result));
      articleInfo = result;
      res.json(result).status(200);
    });
  }, res);

  //res.json(tempData).status(200);

  //res.json(data).status(200);
});

//getting all the data to show
app.post("/deleteData", (req, res) => {
  console.log("called deleting");
  withDB(async db => {
    await db.deleteOne({ title: req.body.title }, function(err, obj) {
      if (err) throw err;
      console.log("document deleted");
      res.send("done").status(200);
    });
  }, res);
});

//update the data
app.post("/updateData", (req, res) => {
  checkHeaderAuth(
    async userrr => {
      try {
        console.log(
          "called updating",
          req.body.id,
          req.body.title,
          req.body.value
        );
        var temp = req.body.id;
        // var temp = "Mickey";
        console.log(temp);
        var myquery = { _id: ObjectID(temp) };
        // var myquery = { title: "this is the second" };
        var newvalues = {
          $set: { title: req.body.title, value: req.body.value }
        };
        withDB(async db => {
          await db.updateOne(myquery, newvalues, function(err, obj) {
            if (err) {
              console.log("error occured", err);
              throw err;
            } else {
              console.log("document updated");
            }
            getAll(req, res);
          });
        }, res);
      } catch (err) {
        res.status(401).json({ status: "error occures:" + err });
      }
    },
    req,
    res
  );
});

//add the data
app.post("/addMenuData", (req, res) => {
  checkHeaderAuth(
    async userrr => {
      try {
        console.log("called updating", req.body.title, req.body.value);

        var myquery = {
          title: req.body.title,
          value: req.body.value,
          pics: []
        };

        withDB(async db => {
          await db.insertOne(myquery, function(err, obj) {
            if (err) {
              console.log("couldn't get the data");
              res.send("unable to do it").status(500);

              throw err;
            } else {
              console.log("item added");
              res.send("done").status(200);
            }
          });
        }, res);
        getAll(req, res);
      } catch (err) {
        res.status(401).json({ status: "error occures:" + err });
      }
    },
    req,
    res
  );

  //res.json(data).status(200);
});

//this is for single image upload
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "seriouslyagain",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function(req, file, cb) {
      cb(null, "MainImage/mainImageSlider/" + Date.now().toString());
    }
  })
});

const singleupload = upload.single("image");
// const arrayUpload = multiupload.array("image");
const arrayUpload = upload.array("image");

const uploadImgurl = async (img_url, id, res1) => {
  console.log("called updating");
  var temp = id;
  // var temp = "Mickey";
  console.log(temp);
  var myquery = { _id: ObjectID(temp) };
  // var myquery = { title: "this is the second" };

  // var newvalues = { $push: { pics: img_url } };

  var newvalues = { $addToSet: { pics: { $each: img_url } } };

  withDB(async db => {
    await db.updateOne(myquery, newvalues, function(err, obj) {
      if (err) {
        console.log("error occured", err);
        res1.send({ status: err }).status(500);
      } else {
        console.log("document updated");
        res1.send({ status: "done" }).status(200);
      }
    });
  }, res1);
};

//remove images from mongo db
const removeImgurl = async (id, url, req1, res1) => {
  var temp = [];

  url.map(item => {
    temp.push(item.Key);
  });

  console.log("array of url", temp);
  var myquery = { _id: ObjectID(id) };
  var newvalues = {
    $pull: {
      pics: {
        path: {
          $in: temp
        }
      }
    }
  };

  withDB(async db => {
    await db.updateMany(myquery, newvalues, function(err, obj) {
      if (err) {
        console.log("error occured", err);
        res1.json({ error: "InternalError" }).status(500);
      } else {
        console.log("document updated");
        //remove from aws
        //url used to get the images out of aws
        removeImage(url, req1, res1);
      }
    });
  }, res1);
};

//remove images from aws bucket
const removeImage = async (url, req1, res1) => {
  console.log("removing from aws bucket", url);
  var params = {
    Bucket: "seriouslyagain",
    Delete: {
      Objects: url,
      Quiet: false
    }
  };
  await s3.deleteObjects(params, function(err, data) {
    if (err) {
      console.log(err);
      res1.json({ error: "InternalError" }).status(500);
    } else {
      console.log("done");
      // res1.json({ status: "done" }).status(200);
      getAll(req1, res1);
    }
  });
};

//remove the url to mongodb
app.post("/mainImages/removeUrlUpload", (req, res) => {
  checkHeaderAuth(
    async userrr => {
      try {
        console.log("called removal");
        //getting the id of mongodb document
        var id = req.body.id;
        //getting the array of url .
        var url = req.body.url;

        //remove the pc to mongod
        removeImgurl(id, url, req, res);
      } catch (err) {
        res.status(200).json({ error: "InternalError" });
      }
    },
    req,
    res
  );
});

//uploading the image for main image slider in aws bucket
app.post("/mainImageslider/single", (req, res) => {
  console.log("called the mainImage ");

  checkHeaderAuth(
    async userrr => {
      // putSingleSliderImage(req, res);
      putSingleSliderImage1(req, res, clients);
    },
    req,
    res
  );
});

var upload1 = multer({ dest: "uploads/" });

// uploading the image for each category in aws bucket
app.post("/mainImageslider/category/single", (req, res) => {
  checkHeaderAuth(
    async userrr => {
      getSingleImages(req, res);
    },
    req,
    res
  );
});

app.post("/mainImageslider/category/multiple", (req, res) => {
  checkHeaderAuth(
    async userrr => {
      putMultipleImages(req, res);
    },
    req,
    res
  );
});

//upload the url to mongodb
app.post("/mainImages/urlUpload", (req, res) => {
  var id = req.body.id;
  var url = req.body.url;

  console.log(id + " this only  " + url);

  //upload the pic to mongodb
  uploadImgurl(url, id, res);
  //res.json({ status: "done" }).status(200);
});

app.post("/mainImageslider/notSingle", (req, res) => {
  checkHeaderAuth(
    async userrr => {
      putMultipleImagesInMain(req, res);
    },
    req,
    res
  );
});

app.get("/getImages", async (req, res) => {
  try {
    console.log("called images");
    var urlParams = { Bucket: "seriouslyagain", Key: "1566299848561" };
    s3.getSignedUrl("getObject", urlParams, function(err, url) {
      console.log("the url of the image is", url);
    });
  } catch (e) {
    console.log("our error", e);
  }
});

//get url for main Image Slider
app.get("/getMainImageSliderUrl", async (req, res) => {
  try {
    console.log("getting main slider images called");
    withDB(async db => {
      await db.find({ title: "mainPageSlider" }).toArray(function(err, result) {
        if (err) throw err;
        console.log("here", JSON.stringify(result));
        articleInfo = result;
        var temp = [];
        temp.push;

        res.json(result).status(200);
      });
    }, res);
  } catch (e) {
    console.log("our error", e);
  }
});

//remove the menuItems
app.post("/menuItemsRemoval", (req, res) => {
  checkHeaderAuth(
    async userrr => {
      try {
        const id = req.body.id;
        console.log("called");
        var myquery = { _id: ObjectID(id) };

        withDB(async db => {
          db.deleteOne(myquery, function(err, obj) {
            if (err) {
              res.status(401).json({ status: "notDeleted" });
            } else {
              console.log("1 document deleted");
              //call the updated data
              getAll(req, res);
            }
          });
        }, res);
      } catch (err) {
        res.status(401).json({ status: "error occures:" + err });
      }
    },
    req,
    res
  );
});

//make an admin account
app.post("/adminLogin", (req, res) => {
  const { username, email, password } = req.body;

  console.log("called injection", config.masterKey);
  const passwordDigest = bcrypt.hashSync(password, 10);
  const masterData = bcrypt.hashSync(config.masterKey, 10);

  withDB1(async db => {
    await db.insertOne(
      {
        username: username,
        email: email,
        password: passwordDigest,
        master: masterData
      },
      function(err, obj) {
        if (err) res.status(400).json({ error: err });
        else {
          res.status(200).json({ status: "user updated" });
        }
      }
    );
  }, res);
});

//login process for the admin
app.post("/adminLoginRequest", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("herer");

    withDB1(async db => {
      await db.findOne({ email: email }, function(err, obj) {
        if (err) {
          console.log("error occured");
          res.status(401).json({ error: err });
        } else {
          //if account is valid
          if (obj !== null) {
            if (bcrypt.compareSync(password, obj.password)) {
              const token = jwt.sign(
                {
                  username: obj.username,
                  master: obj.master
                },
                config.privatekey
              );
              if (obj.master === "no") {
                console.log("token:", token);
                res.status(200).json({ token: token });
              } else if (obj.master === "yes") {
                //ask the all admin details
                getAllAdmin(res, token);
              }
            }
          } //if invalid credential is there
          else {
            console.log("invalid");
            res.status(200).json({ status: "invalid" });
          }
        }
      });
    }, res);
  } catch (err) {
    res.status(401).json({ status: "InternalError" });
  }
});

//getting all the admin details
var getAllAdmin = async (response, token) => {
  try {
    withDBout(
      async db => {
        await db.find({}).toArray(function(err, result) {
          if (err) {
            response.json({ status: "InternalError" }).status(200);
          } else {
            response.status(200).json({ token: token, AllAdminDetail: result });
          }
        });
      },
      "admin",
      response
    );

    // console.log("after await statement");
  } catch (err) {
    console.log("error occured inside the catch", err);
    response.status(500).json({ error: "InternalError" });
  }
};
