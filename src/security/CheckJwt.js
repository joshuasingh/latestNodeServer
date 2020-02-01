var jwt = require("jsonwebtoken");
var config = require("./config.json");

module.exports.CheckJwt = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }

  if (token) {
    jwt.verify(token, config.privatekey, (err, decoded) => {
      if (err) {
        //res.status(401).json({ error: "failed to authenticate" });
        console.log("error in middle");
        return "false";
      }
      console.log("no problem");
      return true;
    });
  } else {
    console.log(" problem here1");
    return false;
    //res.status(401).json({ error: "No token provided" });
  }
};
