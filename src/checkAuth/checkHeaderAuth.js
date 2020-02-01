const jwt = require("jsonwebtoken");
var config = require("../security/config.json");

module.exports.checkHeaderAuth = (operation, req, res) => {
  const authorizationHeader = req.headers["authorization"];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }
  console.log("token", token);
  if (token) {
    jwt.verify(token, config.privatekey, (err, decoded) => {
      if (err) {
        //res.status(401).json({ error: "failed to authenticate" });
        console.log("error in middle", err);
        res.status(200).json({ error: "tokenPro" });
      } else {
        operation(jwt.decode(token), res);
      }
    });
  } else {
    console.log(" problem here");
    res.status(200).json({ error: "tokenPro" });
    //res.status(401).json({ error: "No token provided" });
  }
};
