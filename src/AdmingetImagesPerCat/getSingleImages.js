var { multer } = require("../../src/multerDependency/multerdp");
var { multerS3 } = require("../../src/multerDependency/multerdp");
var { s3 } = require("../../src/multerDependency/multerdp");

const { setMongoUrl } = require("../AdmingetImagesPerCat/setMongoUrl");
const { setMongoUrl1 } = require("../AdmingetImagesPerCat/setMongoUrl");

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

const singleupload = upload.single("image");
const arrayUpload = upload.array("image");

module.exports.getSingleImages = (req, res) => {
  //uploading the image for main image slider in aws bucket
  console.log("called here again required one");

  singleupload(req, res, function(err) {
    //this gives us where the image is stored
    try {
      if (err) {
        console.log("called inside" + err);
        res.json({ error: "InternalError" }).status(500);
      } else {
        var imageUrl = [];
        var id = req.body.image[0];
        //   res.json({ url: imageUrl }).status(200);
        console.log(imageUrl);
        imageUrl.push({
          url: req.file.location,
          path: req.file.key,
          caption: req.body.image[1]
        });
        console.log(imageUrl, id);
        setMongoUrl(imageUrl, id, res);
      }
    } catch (err) {
      console.log("in catch");
      res.status(200).json({ error: "InternalError" });
    }
  });
};

//this is for single image upload
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

const singleMainImageSlide = upload1.single("image");

module.exports.putSingleSliderImage = (req, res) => {
  //uploading the image for main image slider in aws bucket
  console.log("called here again required one in put");

  singleMainImageSlide(req, res, function(err) {
    try {
      //this gives us where the image is stored
      if (err) {
        console.log("called inside" + err);
        res.json({ error: "InternalError" }).status(500);
      } else {
        var imageUrl = [];
        var id = req.body.image;
        //   res.json({ url: imageUrl }).status(200);
        console.log(imageUrl);
        imageUrl.push({
          url: req.file.location,
          path: req.file.key
        });
        console.log("checking new onee", imageUrl, id);
        setMongoUrl(imageUrl, id, res);
      }
    } catch (e) {
      console.log("in put single catch block");
      res.status(200).json({ error: "InternalError" });
    }
  });
};

module.exports.putSingleSliderImage1 = (req, res, clients) => {
  //uploading the image for main image slider in aws bucket
  console.log("called here again required one in put");

  singleMainImageSlide(req, res, function(err) {
    try {
      //this gives us where the image is stored
      if (err) {
        console.log("called inside" + err);
        res.json({ error: "InternalError" }).status(500);
      } else {
        var imageUrl = [];
        var id = req.body.image;
        //   res.json({ url: imageUrl }).status(200);
        console.log(imageUrl);
        imageUrl.push({
          url: req.file.location,
          path: req.file.key
        });
        console.log("checking new onee", imageUrl, id);
        setMongoUrl1(imageUrl, id, res, clients);
      }
    } catch (e) {
      console.log("in put single catch block");
      res.status(200).json({ error: "InternalError" });
    }
  });
};
