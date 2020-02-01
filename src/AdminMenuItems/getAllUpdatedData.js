const { withDBout } = require("../mongodbDepend");

module.exports.getAll = (req, res) => {
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
    "other",
    res
  );
};

// Broadcast to all clients
function broadcast(clients, result) {
  console.log("the total number of client", clients.length);
  // iterate through each client in clients object
  for (var client in clients) {
    // send the message to that client
    clients[client].write(JSON.stringify(result));
  }
}

//this is to broadcast the message to every connected client

module.exports.getAllSocket = (req, res, clients) => {
  withDBout(
    async db => {
      await db.find({}).toArray(function(err, result) {
        if (err) {
          res.json({ error: "InternalError" }).status(500);
        }
        console.log("here", JSON.stringify(result));

        //broadcasting the update values
        broadcast(clients, result);

        res.json({ result }).status(200);
      });
    },
    "other",
    res
  );
};
