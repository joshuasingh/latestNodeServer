var { multer } = require("../../src/multerDependency/multerdp");
var { multerS3 } = require("../../src/multerDependency/multerdp");
var { s3 } = require("../../src/multerDependency/multerdp");

const { setMongoUrl } = require("../AdmingetImagesPerCat/setMongoUrl");

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
      cb(null, "MainImage/categoryWise1/" + Date.now().toString());
    }
  })
});

var upload1 = multer({
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

const arrayUpload = upload.array("image");
const arrayUpload1 = upload.array("image");

module.exports.putMultipleImages = (req, res) => {
  //uploading the image for main image slider in aws bucket
  console.log("called here again required one");

  arrayUpload(req, res, function(err) {
    //this gives us where the image is stored
    try {
      if (err) {
        console.log("called inside" + err);
        res.json({ error: "InternalError" }).status(500);
      } else {
        var imageUrl = req.files;
        var captions = req.body.image;
        var allUrl = [];

        imageUrl.map((val, index) => {
          var temp = {};
          temp["caption"] = captions[index + 1];
          temp["url"] = val.location;
          temp["path"] = val.key;
          allUrl.push(temp);
        });
        console.log(allUrl, req.body.image[0]);
        setMongoUrl(allUrl, req.body.image[0], res);
      }
    } catch (err) {
      console.log("in catch");
      res.status(200).json({ error: "InternalError" });
    }
  });
};

module.exports.putMultipleImagesInMain = (req, res) => {
  //uploading the image for main image slider in aws bucket
  console.log("called here in multiple images in main image slider");

  arrayUpload1(req, res, function(err) {
    //this gives us where the image is stored
    try {
      if (err) {
        console.log("called inside" + err);
        res.json({ error: "InternalError" }).status(500);
      } else {
        var imageUrl = req.files;
        var captions = req.body.image;
        var allUrl = [];

        imageUrl.map((val, index) => {
          var temp = {};
          temp["caption"] = captions[index + 1];
          temp["url"] = val.location;
          temp["path"] = val.key;
          allUrl.push(temp);
        });
        console.log(allUrl, req.body.image);
        setMongoUrl(allUrl, req.body.image, res);
      }
    } catch (err) {
      console.log("in catch");
      res.status(200).json({ error: "InternalError" });
    }
  });
};
