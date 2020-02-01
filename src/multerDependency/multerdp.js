// working with photo uploading to aws
const aws = require("aws-sdk");
module.exports.multer = require("multer");
module.exports.multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: "dsYGxu5lnTNYrXgLTN0PCkxXIuk2DC9Xj9fpaDn9",
  accessKeyId: "AKIAICJB367TKQTZBRNQ",
  region: "us-east-2"
});

module.exports.s3 = new aws.S3();
